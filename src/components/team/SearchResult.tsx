import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember;
    reset: () => void;
    
}


export default function SearchResult({user, reset}:SearchResultProps) {

    const params = useParams();
    const projectId = params.projectId!;
    const navigate = useNavigate();
    
    //invalidar los querys para evitar recargar la pagina
    const queryClient = useQueryClient();
    
    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate(location.pathname,{replace: true})
            queryClient.invalidateQueries({queryKey:["project", projectId]});
        }
    });

    const handleAddUser = async () => {
        const data = {projectId, id: user._id};
        mutate(data);
    }
  return (
    <>
      <p className="text-center mt-10 font-bold">
        <div className="flex justify-between items-center">
          <p className="text-3xl text-slate-500 capitalize">{user.name}</p>
          <button className="beautiful-button2 cursor-pointer" onClick={handleAddUser}>
            Agregar al Proyecto
          </button>
        </div>
      </p>
    </>
  );
}
