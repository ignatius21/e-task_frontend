import { ProjectFormData } from "types";
import ErrorMessage from "../ErrorMessage";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";

interface ProjectFormProps {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}


export default function ProjectForm({register, errors}: ProjectFormProps) {

    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isAreaFocused, setIsAreaFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

    return (
      <>
        <div className="mb-5 space-y-3">
          <label htmlFor="projectName" className="text-sm uppercase font-bold">
            tarea
          </label>
          <div className="relative flex items-center">
            <input
              id="projectName"
              className="input w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              type="text"
              placeholder="Ingrese el nombre de la tarea que desea crear"
              {...register("projectName", {
                required: "El Titulo de la tarea es obligatorio",
              })}
              onFocus={() => setIsTaskFocused(true)}
              onBlur={() => setIsTaskFocused(false)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isTaskFocused ? "CornflowerBlue" : "currentColor"}
              className="absolute left-2 h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>

          {errors.projectName && (
            <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="clientName" className="text-sm uppercase font-bold">
            area
          </label>
          {/* // TODO: cambiar a un objeto seleccionable con las opciones correspondientes */}
          <div className="relative flex items-center">
            <input
              id="clientName"
              className="input w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              type="text"
              placeholder="Nombre del area a la que pertenece la tarea"
              {...register("clientName", {
                required: "El Nombre del area es obligatorio",
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

          {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="description" className="text-sm uppercase font-bold">
            Descripción
          </label>
          <div className="relative flex items-center">
            <textarea
              id="description"
              className="input w-full p-3 border-slate-200 border rounded-2xl pl-10 resize-none focus:ring-0"
              placeholder="Agregue una breve descripción de la tarea a realizar"
              {...register("description", {
                required: "Una descripción de la tarea es obligatoria",
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