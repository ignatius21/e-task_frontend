import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import {useMutation,useQueryClient} from '@tanstack/react-query';
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormData = {
  data: ProjectFormData;
  projectId: Project['_id'];
};


export default function EditProjectForm({data,projectId}: EditProjectFormData) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }});

  const navigate = useNavigate();
  
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({queryKey: ["project"]});
      queryClient.invalidateQueries({queryKey: ["editProject", projectId]});
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Trabajo</h1>
        <nav className="mt-10">
          <Link
            to="/"
            className="beautiful-button2"
          >
            Volver a Trabajos
          </Link>
        </nav>
        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
          className="mt-10 bg-white shadow-2xl p-10 rounded-3xl"
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Guardar cambios"}
            className="beautiful-button2 w-full"
          />
        </form>
      </div>
    </>
  );
}
