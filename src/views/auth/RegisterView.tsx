import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmationFocused, setIsPasswordConfirmationFocused] =
    useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crea tu cuenta</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-white mt-10 rounded-2xl w-96"
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
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10"
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
              stroke={isEmailFocused ? "blue" : "currentColor"}
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
          <label className="font-normal text-2xl">Nombre</label>
          <div className="relative flex items-center">
            <input
              type="name"
              placeholder="Nombre de Registro"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10"
              {...register("name", {
                required: "El Nombre de usuario es obligatorio",
              })}
              onFocus={() => setIsUserFocused(true)}
              onBlur={() => setIsUserFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isUserFocused ? "red" : "currentColor"}
              className="absolute left-2 h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>
          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 6,
                  message: "El Password debe ser mínimo de 6 caracteres",
                },
              })}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isPasswordFocused ? "green" : "currentColor"}
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

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repetir Password</label>
          <div className="relative flex items-center">
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite Password de Registro"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10"
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: (value) =>
                  value === password || "El password no coincide",
              })}
              onFocus={() => setIsPasswordConfirmationFocused(true)}
              onBlur={() => setIsPasswordConfirmationFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isPasswordConfirmationFocused ? "violet" : "currentColor"}
              className="absolute left-3 top-3 h-6 w-6 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
              />
            </svg>
          </div>

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-blue-700 hover:bg-blue-500 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-2xl"
        />
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
