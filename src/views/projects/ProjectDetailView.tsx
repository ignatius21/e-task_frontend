import { Navigate, useNavigate, useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query';
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";

const ProjectDetailView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading,isError } = useQuery({
      queryKey: ["editProject", projectId],

      queryFn: () => getProjectById(projectId),
      retry: false
    });
    if(isLoading) return <div>Cargando...</div>
    if(isError) return <Navigate to='/404'/>
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500">{data.description}</p>

            <nav className="my-5 gap-3 flex">
                <button type="button" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl cursor-pointer transitions-colors" onClick={()=>navigate(location.pathname + '?newTask=true')}>Agregar Tarea</button>
            </nav>
            <AddTaskModal/>
        </>
    )
};

export default ProjectDetailView;
