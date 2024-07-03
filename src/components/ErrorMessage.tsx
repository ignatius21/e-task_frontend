import React, { useState, useEffect } from "react";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`rounded-2xl text-center my-2 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm ${
        showError ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
