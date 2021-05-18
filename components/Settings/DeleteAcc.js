import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import firebase from "firebase/app";
import { useRouter } from "next/router";

function DeleteAcc() {
  const [confirm, setConfirm] = useState(false);
  const { sendPasswordResetEmail } = useAuth();
  const [sent, setSent] = useState(false);
  const router = useRouter();
  var user = firebase.auth().currentUser;

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {sent ? (
        <h1>Email to reset as been sent</h1>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-lg m-4">Thanks for trying Disqlos !</h1>

          {confirm ? (
            <button
              className="focus:outline-none rounded-md border border-gray-300 p-4 rounded-full hover:bg-red-600 hover:text-white dark:border-gray-800"
              onClick={(e) => {
                e.preventDefault();
                user
                  .delete()
                  .then(function () {
                    router.push("/");
                  })
                  .catch(function (error) {});
              }}
            >
              Confirm
            </button>
          ) : (
            <button onClick={() => setConfirm(true)}className="focus:outline-none rounded-md border border-gray-300 p-4 rounded-full hover:bg-gray-400 hover:text-white dark:border-gray-800">
              Delete Account
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DeleteAcc;
