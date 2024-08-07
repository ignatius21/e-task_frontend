import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import { getTaskById} from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { formateDate } from "@/utils/utils";
import { statusTranslations } from "@/locales/es";



export default function TaskModalDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const show = taskId ? true : false;
  const params = useParams();
  const projectId = params.projectId!;

  //obtener detalles de la tarea en base a taskId
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });



  if (isError) {
    toast.error("Error al obtener detalles de la tarea", { toastId: "error" });
    return <Navigate to={`/projects/${projectId}`} />;
  }



  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
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
                  <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-normal text-sky-600">Agregada el:{" "} {formateDate(data.createdAt)} </p>
                    <p className="text-normal text-sky-600">
                      Última actualización:{" "} {formateDate(data.updatedAt)}
                    </p>
                    <DialogTitle
                      as="h3"
                      className="font-black text-4xl text-slate-600 mt-3 capitalize my-3"
                    >
                      {data.name}
                    </DialogTitle>
                    <p className="text-2xl text-slate-500 mb-2 capitalize">{data.description}</p>
                    <p className="text-lg text-slate-500 mt-10 underline my-3">Historial de cambios</p>
                    <ul className="list-disc list-inside">
                      {data.completedBy.slice(-5).map((completed: { user: { name: string }, status: string }, index: number) => (
                        <li key={index} className="text-sm text-slate-400">
                          {completed.user.name} - {statusTranslations[completed.status]}
                        </li>
                      ))}
                    </ul>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
