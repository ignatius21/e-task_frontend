import { ProjectFormData } from "types";
import ErrorMessage from "../ErrorMessage";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ProjectFormProps {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors}: ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Nombre
                </label>
                <input
                    id="projectName"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Ingrese el nombre de la tarea que desea crear"
                    {...register("projectName", {
                        required: "El Titulo de la tarea es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            {/* <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div> */}

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Agregue una breve descripción de la tarea a realizar"
                    {...register("description", {
                        required: "Una descripción de la tarea es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}