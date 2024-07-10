import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify';
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

const CreateProjectView = () => {
  const navigate = useNavigate();

  const initialValues : ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData : ProjectFormData) => mutate(formData)

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear trabajo nuevo</h1>
        <nav className="my-5">
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
            value={"Crear Trabajo"}
            className="beautiful-button2 w-full mt-5"
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;
