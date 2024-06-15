import { Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";

export default function EditProjectForm({data}: {data: ProjectFormData}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }});

  const handleForm = (formData: ProjectFormData) => {
    console.log(formData);
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
