import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import Logo from "@/components/Logo";
import { useState } from "react";

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

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white rounded-2xl shadow-2xl"
        noValidate
      >
        <div className="">
          <Logo />
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <div className="relative flex items-center">
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className=" input w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isEmailFocused ? "#BDDBE9" : "currentColor"}
              className="absolute left-2 h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>
          </div>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Password de Registro"
              className="input w-full p-3 mb-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isPasswordFocused ? "#BDE9D4" : "currentColor"}
              className="absolute left-3 top-3 h-6 w-6 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
              />
            </svg>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <Link
          to={"/auth/forgot-password"}
          className=" text-gray-400 font-normal"
        >
          Olvidaste tu password?{" "}
          <span className="text-gray-500 font-bold ">Reestablecelo</span>
        </Link>

        <button
          type="submit"
          className="beautiful-button w-full cursor-pointer"
        >
          Iniciar sesion
        </button>

        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/auth/register"}
            className="text-center text-gray-400 font-normal"
          >
            No tienes una cuenta?{" "}
            <span className="text-gray-500 font-bold ">Crea una</span>
          </Link>
        </nav>
      </form>
    </>
  );
}
