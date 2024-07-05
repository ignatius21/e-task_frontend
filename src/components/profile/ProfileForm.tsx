import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { User, UserProfileForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upadateProfile } from "@/api/ProfileAPI";
import { toast } from "react-toastify";
import { useState } from "react";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: upadateProfile,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Perfil actualizado");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUserFocused, setIsUserFocused] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Actualizar información del perfil
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="space-y-8 p-10 mt-10 bg-white rounded-2xl"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name">
              Nombre
            </label>
            <div className="relative flex items-center">
              <input
                id="name"
                type="text"
                placeholder="Tu Nombre"
                className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
                {...register("name", {
                  required: "Nombre de usuario es obligatoro",
                })}
                onFocus={() => setIsUserFocused(true)}
                onBlur={() => setIsUserFocused(false)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isUserFocused ? "IndianRed" : "currentColor"}
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

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
            <div className="relative flex items-center">
              <input
                id="text"
                type="email"
                placeholder="Tu Email"
                className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
                {...register("email", {
                  required: "EL e-mail es obligatorio",
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
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <button
            type="submit"
            value="Guardar Cambios"
            className="beautiful-button w-full"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </>
  );
}
