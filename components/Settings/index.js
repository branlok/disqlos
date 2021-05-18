import { setNestedObjectValues } from "formik";
import React, { useState } from "react";
import {useAuth} from '../../utils/auth';
import DeleteAcc from "./DeleteAcc";
import ResetPass from "./ResetPass";

function Settings() {
  const [select, setSelect] = useState();
  const {sendPasswordResetEmail} = useAuth();

    const SelectedSettings = () => {
        if (select == "pwChange") {
            return <ResetPass/>
        } else if (select == "deleteAcc") {
            return <DeleteAcc/>
        } else {
            return null;
        }
    }

  return (
    <div className="w-full h-full flex border-8 border-gray-200 rounded-md bg-custom-pink-300 shadow-md dark:bg-gray-900 dark:text-white dark:border-gray-500 ">
      <div className="w-1/3 h-full border-r border-gray-300 flex flex-col dark:border-gray-500">
        <h1 className="h-14 w-full text-xl text-center font-bold flex justify-center items-center border-b border-gray-300 dark:border-gray-500">
          Settings
        </h1>
        <div>
          <a onClick={() => setSelect("pwChange")} className="h-14 w-full text-md text-center font-bold flex justify-center items-center border-b border-gray-300  hover:bg-custom-pink-500 cursor-pointer dark:border-gray-500 dark:hover:bg-black">
            Reset Password
          </a>
        </div>
        <div>
          <a onClick={() => setSelect("deleteAcc")}  className=" text-red-600 h-14 w-full text-md text-center font-bold flex justify-center items-center border-b border-gray-300  hover:bg-custom-pink-500 cursor-pointer dark:border-gray-500 dark:hover:bg-black">
            Delete Account
          </a>
        </div>
      </div>
      <div className="w-2/3 h-full">
          <SelectedSettings/>
      </div>
    </div>
  );
}

export default Settings;
