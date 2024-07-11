import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Task, TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

type EditTaskModalProps = {
  data: Task;
  taskId: Task["_id"];
};

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();

  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleEditTask = (formData: TaskFormData) => {
    const data = {
      projectId,
      taskId,
      formData,
    };
    mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <DialogTitle as="h3" className="text-gray-500 font-bold text-4xl  my-5">
                  Editar Tarea
                </DialogTitle>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handleEditTask)}
                >
                  <TaskForm register={register} errors={errors} />
                  <input
                    type="submit"
                    className="beautiful-button2 w-full cursor-pointer"
                    value="Guardar Cambios"
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
