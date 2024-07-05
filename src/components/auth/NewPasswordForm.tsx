import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  const password = watch("password");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmationFocused, setIsPasswordConfirmationFocused] =
    useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10 rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>
          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Ingresar password"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El Password debe ser mínimo de 8 caracteres",
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
              stroke={isPasswordFocused ? "MediumAquamarine" : "currentColor"}
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
          <div className="flex relative items-center">
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir password"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
              onFocus={() => setIsPasswordConfirmationFocused(true)}
              onBlur={() => setIsPasswordConfirmationFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isPasswordConfirmationFocused ? "MediumAquamarine" : "currentColor"}
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

        <button
          type="submit"
          className="beautiful-button w-full cursor-pointer"
        >
          Establecer password
        </button>
      </form>
    </>
  );
}
