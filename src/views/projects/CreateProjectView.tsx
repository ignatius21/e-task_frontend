import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "types";

const CreateProjectView = () => {
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
  const handleForm = (data : ProjectFormData) => {
    console.log(data);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Tarea</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Complete el siguiente formulario para crear una nueva tarea
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
            value={"Crear Tarea"}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;
