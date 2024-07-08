import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}


export default function TaskForm({errors, register} : TaskFormProps) {

  const [isAreaFocused, setIsAreaFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  
    return (
      <>
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="name">
            Area
          </label>
          <div className="relative flex items-center">
            <input
              id="name"
              type="text"
              placeholder="Nombre del area"
              className="input w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("name", {
                required: "El nombre de la tarea es obligatorio",
              })}
              onFocus={() => setIsAreaFocused(true)}
              onBlur={() => setIsAreaFocused(false)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isAreaFocused ? "MediumAquamarine" : "currentColor"}
                className="absolute left-2 h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
          </div>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="description">
            Descripción de la tarea
          </label>
          <div className="relative flex items-center">
            <textarea
              id="description"
              placeholder="Descripción de la tarea"
              className="input w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("description", {
                required: "La descripción de la tarea es obligatoria",
              })}
              onFocus={() => setIsDescriptionFocused(true)}
              onBlur={() => setIsDescriptionFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isDescriptionFocused ? "IndianRed" : "currentColor"}
              className="absolute left-2 h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>
          </div>

          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
      </>
    );
}