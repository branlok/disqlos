import { Field, Form, Formik } from "formik";
import React, { useRef } from "react";

function PostMaker({setNewPost, oldPosts}) {
  const myFormRef = useRef();
  
  const onEnterPress = (e) => {
    //add shift to textarea for new line, and enter to submit
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      myFormRef.current.click();
    }
  };

  const postSchema = {
    content: "",
  };

  const handleNewPost = (content) => {
    let newPosts = {
        postContent: content,
        displayName: "Jason",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
    };

    let placeholder = [...oldPosts];
    placeholder.unshift(newPosts);
    return placeholder
  };

  return (
    <div className="w-full ">
      <div className="relative mx-5 px-2 my-2 bg-white dark:bg-cb-4 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
        <Formik
          initialValues={postSchema}
          onSubmit={({content}, action) => {setNewPost(handleNewPost(content)); action.resetForm()}}
        >
          {(formik) => (
            <Form className="flex flex-col p-2">
              <Field
                name="content"
                className="w-full h-28 my-2 p-4 border rounded-md wrapText  dark:bg-cb-4 dark:border-cb-4 dark:text-gray-200 dark:focus:ring-gray-800 "
                as="textarea"
                onKeyDown={onEnterPress}
                placeholder="write a post"
              />
              <div className=" py-2 flex justify-end ">
                <button
                  type="submit"
                  className="h-8 mx-1 -mr-0 rounded-sm   text-sm text-white px-10 rounded-md bg-cb-10 font-bold dark:border-cb-3 dark:hover:border-gray-400 dark:border border hover:shadow-md transition-all"
                  ref={myFormRef}
                >
                  Post
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PostMaker;
