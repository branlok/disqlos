import React, { useState } from "react";
import StarSVG from "../../../styles/svg/star.svg";

function PublishedStatus({ leadPost, item }) {
  const [show, setShow] = useState(true);
  return (
    <div>
      {leadPost.data.publishedRecord?.find((i) => i.postId == item.postId)
        ?.postId ? (
        <div className="absolute top-4 right-4 p-0.5 rounded-md bg-custom-pink-1100 text-white text-xs px-2 m-w-20">
          Last Posted{" "}
          {leadPost.data?.lastPublishedTime?.toDate().toDateString()}
        </div>
      ) : null}
    </div>
  );

  //                <b>Posted</b> <br />
  {
    leadPost.data?.lastPublishedTime?.toDate().toDateString();
  }
  //   return <div></div>;
}

{
  /* <div>
<div className="absolute -right-6 top-2 w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer">
  <StarSVG className="fill-current" onClick={() => setShow(!show)} />
</div>
{show && (
  <div className="absolute top-4 right-4 p-0.5 rounded-md bg-custom-pink-1100 text-white text-xs px-2 m-w-20">Last Posted {leadPost.data?.lastPublishedTime?.toDate().toDateString()}</div>
)}
</div> */
}

export default PublishedStatus;
