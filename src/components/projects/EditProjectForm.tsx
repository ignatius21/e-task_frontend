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
        <h1 className="text-5xl font-black">Editar Tarea</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
            Edita la tarea que desees
        </p>
        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver a Tareas
          </Link>
        </nav>
        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Guardar cambios"}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
          />
        </form>
      </div>
    </>
  );
}
