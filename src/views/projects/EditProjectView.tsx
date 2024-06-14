import { useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query';
import { getProjectById } from "@/api/ProjectAPI";

const EditProjectView = () => {
    const params = useParams();
    const projectId = params.projectId!;

    const { data } = useQuery({
      queryKey: ["editProject", projectId],
      queryFn: () => getProjectById(projectId),
    });
    console.log(data)

  return (
    <div>
        
    </div>
  )
};

export default EditProjectView;