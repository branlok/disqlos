import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import usePushPost from "./mutations";
import { useAuth } from "../../../../utils/auth";
import ArrowDownSvg from "../../../../styles/svg/arrowDown.svg";
import ArrowUpSvg from "../../../../styles/svg/arrowUp.svg";
import HeartItSvg from "../../../../styles/svg/heart.svg";
import { useQueryClient } from "react-query";
import useCommentsReq from "./useCommentsReq";
import useAddComments from "./useAddComments";
import useOnlyUserData from "../../../Queries/USERS/useOnlyUserData";

function InputComment({
  targetId,
  postId,
  viewerOpened,
  setViewerOpened,
  page,
  directory,
  loginProtected,
  liked,
  handleLikeUnlike,
}) {
  const initialValues = {
    content: "",
  };

  const validationSchema = yup.object({
    content: yup.string().min(1).max(250).required(),
  });
  const { userId } = useAuth();
  const { userData } = useOnlyUserData();
  // const { addComment } = usePushPost(directory);
  const cacheReference =
    directory == "posts"
      ? "fetchOwnPosts"
      : directory == "feed"
      ? "fetchFollowingPosts"
      : "getTargetPosts";

  const { addCommentMutation } = useAddComments(
    ["getPosts", directory, targetId]
  );
  //const { commentsResponse } = useCommentsReq(postId); //becayse you put in a prop, it knows its different. im guess.
  //you could also use queryClient.invalidateQueries(postId) as long as thiscomments always exists, so will the direct useHook.
  const queryClient = useQueryClient();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ content }, helper) => {
        if (loginProtected) {
          alert("login please");
          return;
        }
        addCommentMutation.mutate({
          content,
          userId,
          postId,
          page,
          userData: userData.data,
        });
        // addComment(postId, userId, content, page);
        //refetch
        //console.log([cacheReference, postId], ["fetchComments","jURed72Eh_SnC8vDwBA_S"])
        setViewerOpened(true);
        queryClient.invalidateQueries(["fetchComments", postId]);

        helper.resetForm();
      }}
    >
      <Form className=" h-full w-full items-center flex justify-center">
        <Field
          name="content"
          as="input"
          className="w-full mr-2 rounded-md pl-2 border-gray border"
          type="text"
          placeholder="Reply"
          autoComplete="off"
        ></Field>
        <button
          className="w-28 bg-gray-800 text-white rounded-md"
          as="submit"
          value="Comment"
        >
          Submit
        </button>

        <div
          className="border rounded-md ml-2 bg-gray-200 flex justify-center items-center"
          onClick={() => setViewerOpened(!viewerOpened)}
        >
          {viewerOpened ? <ArrowUpSvg /> : <ArrowDownSvg />}
        </div>
        <div
          className="border rounded-md ml-2 bg-gray-200 flex justify-center items-center cursor-pointer"
          onClick={() => handleLikeUnlike()}
        >
          <HeartItSvg
            className={`fill-current  ${
              liked ? "text-red-400" : "text-gray-400"
            } p-1 h-6 w-6`}
          />
        </div>
      </Form>
    </Formik>
  );
}

export default InputComment;
