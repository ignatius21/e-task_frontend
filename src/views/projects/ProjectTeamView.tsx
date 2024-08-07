import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectTeam, removeUserToProject } from "@/api/TeamAPI";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {Fragment} from "react";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  const {mutate} = useMutation({
    mutationFn: removeUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({queryKey:["project", projectId]});
    },
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <>
        <h1 className="text-5xl text-slate-700">Administrar Equipo</h1>
        <p className="text-2xl font-light text-gray-500 mt-2">
          Administra los colaboradores del proyecto
        </p>

        <nav className="my-5 gap-3 flex">
          <button
            type="button"
            className="beautiful-button2"
            onClick={() => navigate(location.pathname + "?addMember=true")}
          >
            Agregar Colaborador
          </button>
          <Link
            to={`/projects/${projectId}`}
            className="beautiful-button2"
          >
            Volver a Proyecto
          </Link>
        </nav>
        <h2 className="text-5xl text-slate-600 my-10">Miembros actuales</h2>
        {data.length ? (
          <div
            role="list"
            className="flex bg-white rounded-3xl p-5 shadow-2xl flex-col gap-5"
          >
            {data?.map((member) => (
              <div key={member._id} className="flex">
                <div className="w-full flex-col m-6 ">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
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
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-slate-500 font-bold hover:text-red"
                            onClick={() => mutate({projectId, userId: member._id})}
                          >
                            Eliminar del Proyecto
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-gray-500">No hay miembros en este equipo</p>
        )}
        <AddMemberModal />
      </>
    );
}
