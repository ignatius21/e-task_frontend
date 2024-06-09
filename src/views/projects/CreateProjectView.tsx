import { Link } from 'react-router-dom';

const CreateProjectView = () => {
  return (
    <>
      <h1 className="text-5xl font-black">Crear Tarea</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Completa el siguiente formulario para crear una nueva tarea
      </p>
      <nav className="my-5">
        <Link
          to="/"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Volver a Tareas
        </Link>
      </nav>
    </>
  );
}

export default CreateProjectView