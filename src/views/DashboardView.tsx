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
        <h1 className="text-5xl font-black">Mis Tareas</h1>
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
                      <p
                        className={`font-bold ${
                          project.manager === user?._id
                            ? "bg-red rounded-3xl px-3 text-white py-2"
                            : "bg-green-400 rounded-lg px-2 text-gray-700 py-1"
                        }`}
                      >
                        {project.manager === user?._id
                          ? "Manager"
                          : "Colaborador"}
                      </p>
                    </div>
                  </div>
                  {/* Columna de opciones del proyecto */}
                  {isManager(project.manager, user?._id ?? "") && (
                    <div className="flex-none">
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
                                className="block px-3 py-1 text-sm leading-6 text-gray-400 font-bold hover:text-green"
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
