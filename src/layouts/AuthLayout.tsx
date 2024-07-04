import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-primary w-full h-full">
        <div className="py-10 lg:py-20 mx-auto max-w-[450px]">
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
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
}
