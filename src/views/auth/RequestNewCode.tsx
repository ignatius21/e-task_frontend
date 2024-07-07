import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
    mutate(formData);

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-slate-700">
        Solicitar Código de Confirmación
      </h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Coloca tu e-mail para recibir {""}
        <span className=" text-gray-500 font-bold"> un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-3xl bg-white mt-10 shadow-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <div className="relative flex items-center">
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="input w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("email", {
                required: "El Email de registro es obligatorio",
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

        <button
          type="submit"
          className="beautiful-button2 w-full cursor-pointer"
        >
          Enviar codigo
        </button>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-slate-500 font-normal"
        >
          ¿Ya tienes cuenta?
          <span className="font-bold text-gray-500 ml-2">Inicia Sesión</span>
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-slate-500 font-normal"
        >
          ¿Olvidaste tu contraseña?
          <span className="font-bold text-gray-500 ml-2">Reestablecer</span>
        </Link>
      </nav>
    </>
  );
}
