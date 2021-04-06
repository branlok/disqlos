import React, { useState } from "react";
import { useAuth } from "../../../utils/auth";
import useDeletePost from "../utils/useDeletePost";
// import DotsSvg from "../../../styles/svg/dots.svg";

function Settings({ postId, postOwner }) {
  let { userId } = useAuth();

  const ownership = userId == postOwner ? true : false;

  let [toggle, setToggle] = useState(false);
  let { deletePost, deletePostMutation } = useDeletePost();

  //deletePostMutation use for error if fails to delete
  return (
    <div>
      <div
        className="absolute top-4 right-4 cursor-pointer border rounded-md bg-gray-200 h-6 flex justify-center items-center hover:bg-gray-300 transition-all"
        onClick={() => setToggle(!toggle)}
      >
        {/* <DotsSvg className="fill-current text-white"/> */}
        ...
      </div>
      {toggle && (
        <div className="absolute h-6 flex justify-center top-4 right-12">
          {/* <button className="bg-custom-pink-900 text-white text-sm rounded-md py-1 px-2 mx-1 transition-all">
            {" "}
            Expand{" "}
          </button> */}
          {ownership &&
            <button
              onClick={() => deletePost(postId, "fetchOwnPosts")}
              className="bg-red-500 text-white text-sm rounded-md h-full flex justify-center items-center px-2 mx-1"
            >
              {" "}
              Delete{" "}
            </button>
          }
        </div>
      )}
    </div>
  );
}

export default Settings;
