import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/ProjectAPI";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
// import { Project } from "../types";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

const DashboardView = () => {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (authLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <h1 className="text-5xl text-slate-600 font-bold">Mis Tareas</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Maneje y administre sus trabajos
        </p>
        <nav className="my-5">
          <Link to="/projects/create" className="beautiful-button2">
            Nueva orden de trabajo
          </Link>
        </nav>
        {data.length ? (
          <div className="flex">
            <div className="w-full my-3 gap-5 flex-col">
              {data.map((project) => (
                <div className="bg-white rounded-3xl p-5 shadow-2xl flex mb-5">
                  {/* Columna de información del proyecto */}
                  <div className="flex-1">
                    <Link to={`/projects/${project._id}`}>
                      <h2 className="text-2xl font-bold">
                        {project.projectName}
                      </h2>
                    </Link>
                    <p className="text-gray-500">{project.clientName}</p>
                    <p className="text-gray-500">{project.description}</p>
                    <div className="flex min-w-0">
                      <div
                        className={`font-bold ${
                          project.manager === user?._id
                            ? "bg-red rounded-3xl px-3 text-white py-2"
                            : "bg-sky-500 rounded-3xl px-3 text-white py-2"
                        }`}
                      >
                        {project.manager === user?._id ? (
                          <div className="relative flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>
                            <p className="ml-1">Manager</p>
                          </div>
                        ) : (
                          <div className="relative flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                              />
                            </svg>
                            <p className="ml-2">Colaborador</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Columna de opciones del proyecto */}
                  {isManager(project.manager, user?._id ?? "") && (
                    <div className="flex shrink-0 items-center gap-x-6">
                      <Menu as="div" className="relative">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-sky-500">
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
                              <Link
                                to={`/project/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-400 font-bold hover:text-sky-500"
                              >
                                Editar Proyecto
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-gray-400 hover:text-red font-bold"
                                onClick={() =>
                                  navigate(
                                    location.pathname +
                                      `?deleteProject=${project._id}`
                                  )
                                }
                              >
                                Eliminar Proyecto
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center py-20">
            No hay tareas aún {""}
            <Link to="/projects/create" className="text-blue-500 font-bold">
              Crear tarea
            </Link>
          </p>
        )}
        <DeleteProjectModal />
      </>
    );
};

export default DashboardView;
