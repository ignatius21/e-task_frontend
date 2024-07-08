import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";
import { useState } from "react";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = {projectId,formData}
    mutation.mutate(data);
  };

  const resetData = () => {
    reset();
    mutation.reset();
  }
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl text-gray-500" htmlFor="name">
            E-mail de Usuario
          </label>
          <div className="relative flex items-center">
            <input
              id="name"
              type="text"
              placeholder="E-mail del usuario a Agregar"
              className="input w-full p-3 mb-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
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
                className="absolute left-2 h-6 w-6 text-gray-400 mb-3"
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

        <input
          type="submit"
          className="beautiful-button2 w-full cursor-pointer"
          value="Buscar Usuario"
        />
      </form>
      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Buscando Usuario...</p>}
        {mutation.error && <p className="text-center">{mutation.error.message}</p>}
        {mutation.data && <SearchResult user={mutation.data} reset={resetData}/>}
      </div>
    </>
  );
}
