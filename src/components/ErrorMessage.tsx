import React, { useState, useEffect } from "react";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`rounded-2xl text-center my-2 bg-sky-300 bg-gradient text-white font-bold p-3 uppercase text-sm ${
        showError ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
