import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useAuth } from "../../utils/auth";
import * as yup from "yup";
import Link from "next/link";
function SignUpModal({ handleSignUp }) {
  const { userId, signupResponse } = useAuth();

  useEffect(() => {
    if (userId) {
      console.log("Get outta heraaa");
    }
  });

  const signupSchema = {
    displayName: "",
    email: "",
    password: "",
    passwordVerify: "",
  };

  const validationSchema = yup.object({
    displayName: yup.string().required("name is required").max(36),
    email: yup
      .string()
      .required("A email is required")
      .email("must enter a valid email")
      .max(255),

    password: yup.string().min(6).max(255).required("Password is required"),
    passwordVerify: yup
      .string()
      .min(6)
      .max(255)
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password comfirmation is required"),
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center svgBackground">
      <div className="h-full w-full sm:h-auto w-96 flex flex-col border rounded-md ounded-md p-8 items-center justify-center bg-custom-pink-300 shadow-md">
        <header className="">
          <Link href="/">
            <h1 className="text-3xl font-bold text-center cursor-pointer">
              <a>Disqlos</a>
            </h1>
          </Link>
          <h3 className="font-bold text-center">Sign Up</h3>
        </header>
        {signupResponse?.error?.code && <div> {signupResponse.error.code}</div>}
        <Formik
          initialValues={signupSchema}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={({ email, password, displayName }) =>
            handleSignUp(email, password, displayName)
          }
        >
          {(props) => (
            <Form className="flex flex-col my-8 w-full font-bold">
              <label className=" pl-2 mb-1">Name</label>
              <Field
                className="w-full border mb-4 pl-2 h-8 rounded"
                type="text"
                name="displayName"
              />
              <label className="pl-2 mb-1">Email</label>
              <Field
                className="w-full border mb-4 pl-2 h-8 rounded"
                type="email"
                name="email"
              />
              {props.errors.email && (
                <div className="border rounded-md flex justify-center">
                  {props.errors.email}
                </div>
              )}

              <label className="pl-2 mb-1">Password</label>
              <Field
                className="w-full border mb-4 pl-2 h-8 rounded "
                type="password"
                name="password"
              />
              {props.errors.password && (
                <div className="border rounded-md flex justify-center">
                  {props.errors.password}
                </div>
              )}

              <label className="pl-2 mb-1">Verify Password</label>
              <Field
                className="w-full border mb-4 pl-2 h-8 rounded "
                type="password"
                name="passwordVerify"
              />
              {props.errors.passwordVerify && (
                <div className="border rounded-md flex justify-center">
                  {props.errors.passwordVerify}
                </div>
              )}
              <button
                className="p-2 border my-2 text-white bg-custom-pink-1000 rounded hover:bg-custom-pink-900 transition-all"
                type="submit"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUpModal;
