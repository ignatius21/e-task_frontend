import { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  inProgress: [],
  completed: [],
  onHold: [],
  underReview: [],
};


const statusColors: { [key: string]: string } = {
    pending: "border-t-red-500",
    inProgress: "border-t-blue-500",
    completed: "border-t-green-500",
    onHold: "border-t-yellow-500",
    underReview: "border-t-purple-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3 className={`capitalize text-xl border-t-8 font-bold bg-white justify-center flex ${statusColors[status]}`}>
              {statusTranslations[status]}
            </h3>
            <hr className="my-5" />
            <div className="h-[1px] bg-slate-300" />
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
