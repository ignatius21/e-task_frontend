import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { User, UserProfileForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upadateProfile } from "@/api/ProfileAPI";
import { toast } from "react-toastify";


type ProfileFormProps = {
    data: User;
}

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: upadateProfile,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Perfil actualizado');
      queryClient.invalidateQueries({queryKey: ['user']});
    }
  
  })

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Aquí puedes actualizar tu información
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
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-3 border-slate-200 border rounded-2xl pl-10 focus:ring-0"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
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
            />
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
