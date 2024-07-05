import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { UpdateCurrentPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentPasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => toast.success(data),
  });

  const password = watch("password");

  const handleChangePassword = (formData: UpdateCurrentPasswordForm) =>
    mutate(formData);

  const [isActualPasswordFocused, setIsActualPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isRepitNewPasswordFocused, setIsRepitNewPasswordFocused] =
    useState(false);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="mt-10 space-y-5 bg-white shadow-lg p-10 rounded-2xl"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >
              Password Actual
            </label>
            <div className="relative flex items-center">
              <input
                id="current_password"
                type="password"
                placeholder="Password Actual"
                className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
                {...register("current_password", {
                  required: "El password actual es obligatorio",
                })}
                onFocus={() => setIsActualPasswordFocused(true)}
                onBlur={() => setIsActualPasswordFocused(false)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isActualPasswordFocused ? "RoyalBlue" : "currentColor"}
                className="absolute left-3 top-3 h-6 w-6 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                />
              </svg>
            </div>
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              Nuevo Password
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type="password"
                placeholder="Nuevo Password"
                className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
                {...register("password", {
                  required: "El Nuevo Password es obligatorio",
                  minLength: {
                    value: 8,
                    message: "El Password debe ser mínimo de 8 caracteres",
                  },
                })}
                onFocus={() => setIsNewPasswordFocused(true)}
                onBlur={() => setIsNewPasswordFocused(false)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isNewPasswordFocused ? "DodgerBlue" : "currentColor"}
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
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >
              Repetir Password
            </label>
            <div className="relative flex items-center">
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repetir Password"
                className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
                {...register("password_confirmation", {
                  required: "Este campo es obligatorio",
                  validate: (value) =>
                    value === password || "Los Passwords no son iguales",
                })}
                onFocus={() => setIsRepitNewPasswordFocused(true)}
                onBlur={() => setIsRepitNewPasswordFocused(false)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isRepitNewPasswordFocused ? "Indigo" : "currentColor"}
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
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="beautiful-button w-full flex"
          />
        </form>
      </div>
    </>
  );
}
