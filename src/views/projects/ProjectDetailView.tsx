import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query';
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

const ProjectDetailView = () => {
  const {data: user, isLoading: authLoading} = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading,isError } = useQuery({
      queryKey: ["editProject", projectId],

      queryFn: () => getProjectById(projectId),
      retry: false
    });

    const canEdit = useMemo(()=> data?.manager === user?._id  , [data, user])

    if(isLoading && authLoading) return <div>Cargando...</div>
    if(isError) return <Navigate to='/404'/>
    if(data && user) return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500">{data.description}</p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 gap-3 flex">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl cursor-pointer transitions-colors"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tarea
            </button>
            <Link
              to={"team"}
              className="bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl cursor-pointer transitions-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}


        <TaskList tasks={data.tasks} canEdit={canEdit}/>
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};

export default ProjectDetailView;
