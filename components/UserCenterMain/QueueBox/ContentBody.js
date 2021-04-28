import React, { useState } from "react";
import { useAuth } from "../../../utils/auth";
import useDeleteQueues from "../utils/useDeleteQueues";
import UseSpaceButton from "./Buttons/UseSpaceButton";
import ToggleDelete from "./Buttons/ToggleDelete";
import DeleteQueue from "./DeleteQueue";
import SpaceInfo from "./SpaceInfo";
import ImageContent from "./ImageContent";

function ContentBody({
  postContent,
  queueId,
  numberOfChildren,
  createdOn,
  image,
}) {
  const { userId } = useAuth();
  const { deleteQueueMutation } = useDeleteQueues(userId, queueId);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      onMouseLeave={() => setOnHover(false)}
      onMouseOver={() => setOnHover(true)}
      className="flex-none relative text-s font-gray-700 bg-custom-pink-550 dark:bg-cb-3  w-full flex flex-col justify-between items-center text-center rounded-md px-2  my-2 overflow-hidden"
    >
      <h1 className="my-2 h-full lg:min-h-40 items-center flex justify-center text-lg w-full font-bold py-3 bg-gray-100  dark:bg-cb-2 dark:text-gray-200 rounded-md px-4 text-gray-700 bg-opacity-100 hover:bg-opacity-20 filter blur-md transition-all z-10">
        {postContent}
      </h1>
      <SpaceInfo createdOn={createdOn} numberOfChildren={numberOfChildren} />
      <div className="relative w-full flex-initial flex flex-col justify-center items-center pb-4 bg-white-100 border-gray-400 mt-4  z-10 ">
        <UseSpaceButton queueId={queueId} />
        <ToggleDelete setShowConfirmDelete={setShowConfirmDelete} />
      </div>
      {showConfirmDelete && (
        <DeleteQueue
          setShowConfirmDelete={setShowConfirmDelete}
          deleteQueueMutation={deleteQueueMutation}
        />
      )}
      {image && <ImageContent image={image} onHover={onHover} />}
    </div>
  );
}

export default ContentBody;
