import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { validateToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  token: ConfirmToken['token'],
  setToken:  React.Dispatch<React.SetStateAction<string>>
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}




export default function NewPasswordToken({token,setToken,setIsValidToken}: NewPasswordTokenProps) {

  const {mutate} = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };
  const handleComplete = (token: ConfirmToken['token']) => {
    mutate({token})
    setIsValidToken(true);
  };

  return (
    <>
      <form className="space-y-8 p-10 rounded-3xl bg-white mt-10 shadow-2xl">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-500 font-normal"
        >
          Solicitar un nuevo <span className="font-bold text-slate-700">Código</span>
        </Link>
      </nav>
    </>
  );
}
