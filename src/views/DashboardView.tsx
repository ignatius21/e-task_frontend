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
        <h1 className="text-5xl text-gray-500">Mis Trabajos</h1>
        <p className="text-2xl font-light text-gray-400 mt-4">
          Maneje y administre sus trabajos
        </p>
        <nav className="my-9">
          <Link to="/projects/create" className="beautiful-button2">
            Nuevo Trabajo
          </Link>
        </nav>
        {data.length ? (
          <div className="flex">
            <div className="w-full my-3 gap-5 flex-col">
              {data.map((project) => (
                <div className="bg-white rounded-3xl p-5 shadow-2xl flex mb-5 relative">
                  <div className="">
                    <div className="custom-shape-divider-top-1720689138 relative rounded-3xl">
                      <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                          opacity=".15"
                          className="shape-fill"
                        ></path>
                        <path
                          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                          opacity=".5"
                          className="shape-fill"
                        ></path>
                        <path
                          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                          className="shape-fill"
                        ></path>
                      </svg>
                    </div>

                  </div>
                  {/* Columna de información del proyecto */}
                  <div className="flex-1 z-3">
                    <div className="flex p-2 items-center gap-3">
                      <p className="text-2xl text-slate-600 font-bold">
                        Nombre del trabajo:
                      </p>
                      <Link
                        to={`/projects/${project._id}`}
                        className="hover:text-sky-400"
                      >
                        <h2 className="text-2xl font-bold text-sky-600">
                          {project.projectName}
                        </h2>
                      </Link>
                    </div>
                    <div className=" flex items-center p-2 gap-3">
                      <p className="text-2xl font-bold text-slate-600">Area:</p>
                      <h2 className="text-2xl font-bold text-sky-600">
                        {project.clientName}
                      </h2>
                    </div>
                    <div className="flex items-center p-2 gap-3">
                      <p className="text-2xl font-bold text-slate-600">
                        Descripción:
                      </p>
                      <h2 className="text-2xl font-bold text-sky-600">
                        {project.description}
                      </h2>
                    </div>
                    <div className="flex min-w-0">
                      <div
                        className={`font-bold mt-10 ${
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
                                Editar Trabajo
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
                                Eliminar Trabajo
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
