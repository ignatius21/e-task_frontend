import { Link, useNavigate, useParams } from "react-router-dom";


export default function ProjectTeamView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
  return (
    <>
      <h1 className="text-5xl font-black">Administrar Equipo</h1>
      <p className="text-2xl font-light text-gray-500">Administra los colaboradores del proyecto</p>

      <nav className="my-5 gap-3 flex">
        <button
          type="button"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl cursor-pointer transitions-colors"
          onClick={() => navigate(location.pathname + "?addMember=true")}
        >
          Agregar Colaborador
        </button>
        <Link
          to={`/projects/${projectId}`}
          className="bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl cursor-pointer transitions-colors"
        >
          Volver a Proyecto
        </Link>
      </nav>
    </>
  );
}
