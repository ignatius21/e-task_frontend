import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
        toast.error(error.message);
        },
        onSuccess: (data) => {
        toast.success(data);
        reset();
        },
    });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData);
  };

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Completa el email para {""}
        <span className=" text-blue-500 font-bold"> solicitar un nuevo password</span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <div className="relative flex items-center">
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
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
              stroke={isEmailFocused ? "CornflowerBlue" : "currentColor"}
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
          className="beautiful-button w-full cursor-pointer"
        >
          Enviar instrucciones
        </button>
          <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/auth/login"}
            className="text-center text-gray-400 font-normal"
          >
            Ya tienes una cuenta?{" "}
            <span className="text-blue-500 font-bold">Inicia sesion</span>
          </Link>
        </nav>
      </form>

    </>
  );
}
