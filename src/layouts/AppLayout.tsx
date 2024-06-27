import { Outlet,Navigate } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import {Slide, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";

const AppLayout = () => {
  const {data,isLoading,isError} = useAuth();

  if(isLoading) return <p>Cargando...</p>
  if(isError) {
    return <Navigate to="/auth/login" />
  }
  if(data) return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
          <NavMenu 
            name={data.name}
          />
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">Todos los derechos reservados &copy; 2024</p>
      </footer>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeButton={false}
        transition={Slide}
        autoClose={2500}
        theme="dark"
      />
    </>
  );
};

export default AppLayout;
