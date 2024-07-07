import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

function AuthLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient">
      <div className="m-10">
        <Outlet />
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeButton={false}
        transition={Slide}
        autoClose={2500}
        theme="dark"
      />
    </div>
  );
}

export default AuthLayout;
