import { Project, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  inProgress: [],
  completed: [],
  onHold: [],
  underReview: [],
};

const statusColors: { [key: string]: string } = {
  pending: "border-t-red",
  inProgress: "border-t-blue-300",
  completed: "border-t-green",
  onHold: "border-t-yellow-300",
  underReview: "border-t-purple-300",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {


  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]});
      toast.success(data);
    }
  });




  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (e:DragEndEvent) => {
    const {active, over} = e;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutate({projectId,taskId,status})
      
      queryClient.setQueryData(["editProject", projectId], (oldData:Project) =>{
        const updatedTasks = oldData.tasks.map((task) => {
          if (task._id === taskId) {
            return {...task, status};
          }
          return task;
        })
        return {...oldData, tasks: updatedTasks};
      })
    } 
  }

  return (
    <>
      <h2 className="text-5xl text-gray-500 my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="w-full flex flex-col">
              <h3
                className={`uppercase text-slate-500 text-xl border-t-8 font-bold bg-white justify-center flex rounded-md shadow-xl p-3 ${statusColors[status]}`}
              >
                {statusTranslations[status]}
              </h3>
              <DropTask status={status}/>
              <hr className="my-5" />
              <div className="h-[1px] bg-slate-300" />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
