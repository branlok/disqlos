import { Field, Form, Formik } from "formik";
import React, { useState, useRef } from "react";
import useUser from "../Queries/USERS/useUser";
import * as yup from "yup";
import useProfileUpdate from "../UserCenterMain/utils/useProfileUpdate";
import PictureSvg2 from "../../styles/svg/spinner.svg";
function ProfileUpdater({ setShowProfileUpdater }) {
  const { userData } = useUser();
  const userProfile = userData.data;
  const imageInput = useRef();
  const profileMutation = useProfileUpdate();
  const [showReturn, setShowReturn] = useState(false);

  const primaryProfileImage = userProfile.primaryProfileImage;
  // const defaultProfileImage = userProfile.defaultProfileImage;
  // const customProfileImage = userProfile.customProfileImage;

  /*FORMIK logic*/
  const profileSchema = {
    newProfileImage: null,
    displayName: userProfile.displayName,
    profileDescription: userProfile.profileDescription,
  };

  const validationSchema = yup.object({
    newProfileImage: yup
      .object()
      .shape({
        name: yup.string().required(),
        preview: yup.string().required(),
        size: yup.number().required(),
        type: yup.string().required(),
      })
      .nullable(),
    displayName: yup.string().min(3, "min of 3 characters").max(38, "max of 38 characters").required(),
    profileDescription: yup.string().max(135, "max of 135 characters").required(),
  });

  function handleFile(e, setFieldValue) {
    //if file exists, or if undefined, its rejected...5mb limit, imgix to handle later on server
    if (e.target.files[0]?.size < 5 * 1000 * 1000) {
      let file = Object.assign(e.target.files[0], {
        preview: URL.createObjectURL(e.target.files[0]),
      });
      setFieldValue("newProfileImage", file); //from formik props
      console.log(file);
    } else {
      e.target.value = null;
      alert("Import Images less than 5Mb")
      setFieldValue("newProfileImage", null);
    }
  }

  const ErrorStyle = "text-red-500 outline-none ring ring-red-300"

  return (
    <div className="top-0 left-0 w-screen h-screen absolute bg-gray-500 dark:bg-black bg-opacity-30 z-20 flex justify-center items-center ">
      <div className="opacity-100 shadow-lg border-black w-96 p-4 rounded-md bg-gray-100 dark:bg-cb-4 dark:text-gray-200">
        <h1 className="text-center my-2 font-bold text-xl">Update Profile</h1>
        <Formik
          initialValues={profileSchema}
          validationSchema={validationSchema}
          onSubmit={(values, formik) => {
            profileMutation.mutate(values, {
              onSuccess: () => {
                console.log("success");
                // formik.resetForm();
                setShowReturn(true);
              },
            });
          }}
        >
          {(props) => (
            <Form className="flex flex-col items-center p-4 text-sm font-bold text-gray-700">
              <label>Profile Picture</label>
              <img
                onClick={() => imageInput.current.click()}
                className="h-20 w-20 rounded-full my-2 hover:shadow-md transition-all cursor-pointer object-cover"
                src={
                  //formik value takes precedence, then exitingUserProfile, and finally default server genreated profileImage
                  props.values.newProfileImage
                    ? props.values.newProfileImage?.preview
                    : primaryProfileImage
                }
              ></img>
              <input
                type="file"
                max="1"
                accept="image/*"
                onChange={(e) => handleFile(e, props.setFieldValue)}
                className="hidden"
                ref={imageInput}
              />
              <div className="w-full border-t-2 my-2"></div>
              <label htmlFor="displayName">Display Name</label>
              <Field
                name="displayName"
                className={`h-8 w-full my-2 pl-2 rounded-md border ${props.errors.displayName && ErrorStyle}`}
              ></Field>
              <label>Profile Description</label>
              <Field
                name="profileDescription"
                as="textarea"
                className={`w-full  my-2 p-2 rounded-md border ${props.errors.profileDescription && ErrorStyle}`}
              ></Field>
              <div>
                {showReturn ? (
                  <button onClick={() => setShowProfileUpdater(false)} type="button" className="border dark:border-transparent rounded-md px-2 py-1 bg-gray-300 text-black hover:bg-red-500 hover:text-white m-2">Return</button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="border dark:bg-transparent dark:border-transparent dark:text-gray-200 rounded-md px-2 py-1 bg-gray-300 text-black hover:bg-red-500 hover:text-white m-2"
                      onClick={() => setShowProfileUpdater(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="border dark:border-transparent rounded-md px-2 py-1 bg-gray-800 text-white hover:bg-green-500 hover:text-white m-2"
                    >
                      Update
                    </button>
                  </>
                )}
                <div className="h-full rounded-md  justify-center flex items-center mx-1 mt-2">
                  {profileMutation.isLoading && (
                    <PictureSvg2 className="animate-spin fill-current text-gray-400 my " />
                  )}
                  {profileMutation.isSuccess && (
                    <p className="text-green-500">Success!</p>
                  )}
                  {profileMutation.isError && (
                    <p classNAme="text-red-500">Error</p>
                  )}
                </div>
                {/* {profileMutation.status === "loading" && (

                )} */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileUpdater;
