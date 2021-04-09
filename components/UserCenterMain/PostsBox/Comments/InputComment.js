import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import usePushPost from "./mutations";
import {useAuth} from "../../../../utils/auth";
import ArrowDownSvg from "../../../../styles/svg/arrowDown.svg";
import ArrowUpSvg from "../../../../styles/svg/arrowUp.svg";
import {useQueryClient} from "react-query";
import useCommentsReq from "./useCommentsReq"
function InputComment({postId, viewerOpened, setViewerOpened, page, directory}) {
  const initialValues = {
    content: "",
  };

  const validationSchema = yup.object({
    content: yup.string().min(1).max(250).required(),
  });
  const {userId} = useAuth();
  const {addComment} = usePushPost(directory);
  const {commentsResponse} = useCommentsReq(postId); //becayse you put in a prop, it knows its different. im guess.
  //you could also use queryClient.invalidateQueries(postId) as long as thiscomments always exists, so will the direct useHook.
  const queryClient = useQueryClient()

  function handleExpand() {
    setViewerOpened(!viewerOpened);

    //only fetch when it is opened.
    if (!viewerOpened ) {
      //queryClient.prefetchQuery(["fetchComments", postId])
      // commentsResponse.refetch();
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ content }, helper) => {addComment(postId, userId, content, page); queryClient.prefetchQuery(["fetchComments", postId]); setViewerOpened(true); helper.resetForm()}}
    >
      <Form className=" h-full w-full items-center flex justify-center">
        <Field
          name="content"
          as="input"
          className="w-full mr-2 rounded-md pl-2 border-gray border"
          type="text"
          placeholder="Reply"
        ></Field>
        <button
          className="w-28 bg-gray-800 text-white rounded-md"
          as="submit"
          value="Comment"
        >
          Submit
        </button>
        <div className="border rounded-md ml-2 bg-gray-200 flex justify-center items-center" onClick={handleExpand}>
          {viewerOpened ? <ArrowUpSvg/> : <ArrowDownSvg/>}
        </div>
      </Form>
    </Formik>
  );
}

export default InputComment;
