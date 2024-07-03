import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import Logo from "@/components/Logo";

export default function LoginView() {

  const navigate = useNavigate();

  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/");
    },
  })

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white rounded-2xl"
        noValidate
        >
          <div className="">
            <Logo/>
          </div>
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border-slate-200 border rounded-2xl"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 mb-3 border-slate-200 border rounded-2xl"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
          <Link
            to={"/auth/forgot-password"}
            className=" text-gray-400 font-normal"
          >
            Olvidaste tu password?{" "}
            <span className="text-blue-500 font-bold ">Reestablecelo</span>
          </Link>
        

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-blue-700 hover:bg-blue-500 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-2xl"
        />
        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/auth/register"}
            className="text-center text-gray-400 font-normal"
          >
            No tienes una cuenta?{" "}
            <span className="text-blue-500 font-bold ">Crea una</span>
          </Link>
        </nav>
      </form>
    </>
  );
}
