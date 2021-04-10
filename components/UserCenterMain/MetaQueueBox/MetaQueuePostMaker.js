import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../../utils/auth";
import { useMutation } from "react-query";

import * as yup from "yup";
import { useQueryClient } from "react-query";
import PictureSvg from "../../../styles/svg/picture.svg";
import SpinnerSvg from "../../../styles/svg/spinner.svg";
import postNewMetaPost from "../utils/postNewMetaPost";
import useUser from "../../Queries/USERS/useUser";

function MetaQueuePostMaker({queueId}) {
  const { userId } = useAuth();
  const {userData} = useUser();
  const myFormRef = useRef();
  const imageInputRef = useRef();
  const queryClient = useQueryClient();
  const [type, setType] = useState("text");

  const mutation = useMutation((value) => postNewMetaPost(value, userId, queueId, userData), {
    onSuccess: async () => {
      await queryClient.refetchQueries(['fetchMetaPosts', queueId]);
  },
  });

  const validationSchema = yup.object({
    content: yup.string().min(1).required(),
    files: yup
      .object()
      .shape({
        name: yup.string().required(),
        preview: yup.string().required(),
        size: yup.number().required(),
        type: yup.string().required(),
      })
      .nullable(),
    type: yup.string().required("type is missing"),
  });

  const postSchema = {
    content: "",
    files: null,
    type: type,
  };

  const onEnterPress = (e) => {
    //add shift to textarea for new line, and enter to submit
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      myFormRef.current.click();
    }
  };

  function handleFile(e, setFieldValue) {
    if (e.target.files[0]?.size < 5 * 1000 * 1000) {
      let file = Object.assign(e.target.files[0], {
        preview: URL.createObjectURL(e.target.files[0]),
      });
      setFieldValue("files", file); //from formik props
      setFieldValue("type", "image");
      //set for preview purposes.
      //validate size is less than 5MB
      console.log(e.target.files[0].size < 5 * 1000 * 1000);
    } else {
      e.target.value = null;
      setFieldValue("type", "text");
    }
  }

  function handleImageToggle(setFieldValue) {
    //this could be operated in useEffect instead
    if (type == "image") {
      setType("text");
      setFieldValue("files", null);
      setFieldValue("type", "text");
      imageInputRef.current.value = null;
    } else {
      setType("image");
      imageInputRef.current.click();
    }
  }

  return (
    <div className="w-100 h-34 bg-white rounded-md border-1 border-gray flex flex-col overflow-hidden mb-2 shadow-lg flex">
      <Formik
        initialValues={postSchema}
        validationSchema={validationSchema}
        onSubmit={(value, action) => mutation.mutate(
            { value },
            {
              onSettled: (data, error, variables) => {
                imageInputRef.current.value = null;
                action.resetForm();
                setType("text");
              }
            }
          )
        }
      >
        {(formik) => (
          <Form className="flex flex-col p-2">
            <Field
              name="content"
              className="w-full h-28 p-4 border rounded-md wrapText "
              as="textarea"
              onKeyDown={onEnterPress}
              placeholder="write a post"
            />
            <input
              type="file"
              max="1"
              accept="image/*"
              onChange={(e) => handleFile(e, formik.setFieldValue)}
              className={`${
                type !== "image" && "hidden"
              } mt-2 border p-2 rounded-md`}
              ref={imageInputRef}
            />
            {console.log(formik.errors, formik.values)}
            <div className="w-full h-8 flex-none flex justify-between items-center mt-2">
              <div
                className={`h-full rounded-md px-2 flex justify-center items-center cursor-pointer ${
                  type === "image"
                    ? "border-4 border-red-200 bg-red-100"
                    : "bg-gray-50 border-4"
                }`}
                onClick={() => {
                  handleImageToggle(formik.setFieldValue);
                }}
              >
                {type === "text" ? (
                  <PictureSvg className="cursor-pointer" />
                ) : null}
                {type === "text" ? (
                  <p className="px-2">Picture</p>
                ) : (
                  <p className="px-2">Cancel</p>
                )}
              </div>
              <div className="h-full flex justify-between items-end">
                {mutation.status === "loading" && (
                  <div className="h-full rounded-md  justify-center flex items-center mx-1  rounded-sm rounded-md ">
                    <SpinnerSvg className="animate-spin fill-current text-gray-400 " />
                  </div>
                )}
                <button
                  type="submit"
                  className="h-full mx-1 -mr-0 rounded-sm bg-custom-pink-1000 text-sm text-white px-10 rounded-md"
                  ref={myFormRef}
                >
                  Post
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MetaQueuePostMaker;
