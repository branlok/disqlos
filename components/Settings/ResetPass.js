import React, { useState } from "react";
import { useAuth } from "../../utils/auth";

function ResetPass() {
  const { sendPasswordResetEmail } = useAuth();
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {sent ? (
        <h1>Email to reset as been sent</h1>
      ) : (
        <button
          className="rounded-md border border-gray-300 p-4 rounded-full hover:bg-gray-400 hover:text-white dark:border-gray-800"
          onClick={(e) => {
            e.preventDefault();
            setSent(sendPasswordResetEmail("branlok95@gmail.com"));
          }}
        >
          Reset Password
        </button>
      )}
    </div>
  );
}

export default ResetPass;
