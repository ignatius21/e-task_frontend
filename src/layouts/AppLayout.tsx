import { Outlet, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import NavbarMenu from "@/components/NavbarMenu";

const AppLayout = () => {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return <p>Cargando...</p>;
  if (isError) {
    return <Navigate to="/auth/login" />;
  }
  if (data)
    return (
      <>
        <div className="bg-gradient w-full min-h-screen bg-cover bg-center">
          <header className="">
            <NavbarMenu />
          </header>
          <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet />
          </section>
          <footer className="py-5">
            <p className="text-center">
              Todos los derechos reservados &copy; 2024
            </p>
          </footer>
          <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            closeButton={false}
            transition={Slide}
            autoClose={2500}
            theme="dark"
          />
        </div>
      </>
    );
};

export default AppLayout;
