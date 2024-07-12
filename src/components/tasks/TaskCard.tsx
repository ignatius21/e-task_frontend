import { TaskProject } from "@/types/index";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTask } from "@/api/TaskAPI";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: TaskProject;
  canEdit: boolean;
};

export default function TaskCard({ task, canEdit }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        padding: "1.15rem",
        backgroundColor: "#fff",
        width: "200px",
        borderWidth: "0.5px",
        borderColor: "rgb(203 213 225 / var(--tw-border-opacity))",
      }
    : undefined;

  return (
    <li className="p-5 bg-white border-slate-700 flex justify-between gap-3 rounded-3xl shadow-2xl">
      <div
        className="flex gap-2 items-start flex-col"
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
      >
        <p className="text-xl font-bold text-slate-700 text-left capitalize">
          {task.name}
        </p>
        <p className="text-slate-500 capitalize">{task.description}</p>
      </div>
      <div className="flex shrink-0  gap-x-6">
        {canEdit && (
          <Menu as="div" className="relative flex-none">
            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-sky-600">
              <span className="sr-only">opciones</span>
              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem>
                  <button
                    type="button"
                    className="block px-3 py-1 font-medium text-gray-500 hover:text-sky-600"
                    onClick={() =>
                      navigate(location.pathname + `?viewTask=${task._id}`)
                    }
                  >
                    Ver Tarea
                  </button>
                </MenuItem>

                <MenuItem>
                  <button
                    type="button"
                    className="block px-3 py-1 font-medium text-gray-500 hover:text-fuchsia-600"
                    onClick={() =>
                      navigate(location.pathname + `?editTask=${task._id}`)
                    }
                  >
                    Editar Tarea
                  </button>
                </MenuItem>

                <MenuItem>
                  <button
                    type="button"
                    className="block px-3 py-1 font-medium text-gray-500 hover:text-red"
                    onClick={() => mutate({ projectId, taskId: task._id })}
                  >
                    Eliminar Tarea
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        )}
      </div>
    </li>
  );
}
