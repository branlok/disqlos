import React from "react";
import { Formik, Field, Form } from "formik";
import { useAuth } from "../../utils/auth";

function authModal({ handleSignIn }) {
  let { userId, signinResponse } = useAuth();

  let signupSchema = {
    email: "",
    password: "",
  };

  if (userId) return <div></div>; //fallback on an empty page if user already signed in.

  return (
    <div className="w-96 flex flex-col border rounded-md ounded-md p-8 items-center justify-center bg-custom-pink-300 shadow-md">
      <header className="">
        <h1 className="text-3xl font-bold text-center ">Disqlos</h1>
        <h3 className="font-bold text-center">Sign In</h3>
      </header>
      {signinResponse?.error?.code && <div> {signinResponse.error.code}</div>}
      <Formik
        initialValues={signupSchema}
        onSubmit={({ email, password }) => handleSignIn(email, password)}
      >
        <Form className="flex flex-col my-8 w-full">
          <label className="pl-2 mb-1">Email</label>
          <Field
            className="w-full border mb-4 pl-2 h-8 rounded"
            type="email"
            name="email"
          />
          <label className="pl-2 mb-1">Password</label>
          <Field
            className="w-full border mb-4 pl-2 h-8 rounded "
            type="password"
            name="password"
          />
          <button
            className="p-2 border my-2 text-white bg-custom-pink-1000 rounded hover:bg-custom-pink-900 transition-all"
            type="submit"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default authModal;
