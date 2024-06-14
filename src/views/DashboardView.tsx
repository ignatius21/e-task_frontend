import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/ProjectAPI";

const DashboardView = () => {

  const {data} = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  console.log(data)
  if (data) return (
    <>
      <h1 className="text-5xl font-black">Mis Tareas</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneje y administre sus tareas
      </p>
      <nav className="my-5">
        <Link
          to="/projects/create"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Nueva Tarea
        </Link>
      </nav>
      {data.length ? (
        <p>Proyectos</p>
      ):(
        <p className="text-center py-20">No hay tareas aún {''}
          <Link to="/projects/create" className="text-fuchsia-500 font-bold">Crear tarea</Link>
        </p>
      )}
    </>
  );
};

export default DashboardView;
