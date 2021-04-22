import React, { useState } from "react";
import PostDemo from "./PostDemo";
import PostMaker from "./PostMaker";
import ArrowSVG from "../../../styles/svg/arrowLeft.svg";

const initialState = [
  {
    postContent: "Demo",
    displayName: "Jason",
    primaryProfileImage:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
  },
  {
    postContent: "Demo",
    displayName: "Jason",
    primaryProfileImage:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
  },
  {
    postContent: "Demo",
    displayName: "Jason",
    primaryProfileImage:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
  },
];

function SpaceContentDemo({setShowList}) {
  const [state, setstate] = useState(initialState);

  return (
    <div className="w-full h-full mt-2 flex flex-col items-center">
      <div className="w-full h-8 flex px-5">
        <button onClick={() => setShowList(false)} className="h-full flex ">
          <ArrowSVG />
          Back
        </button>
      </div>
      <PostMaker setNewPost={setstate} oldPosts={state} />
      {state.map((item, idx) => {
        return (
          <PostDemo
            key={"demon" + idx}
            postContent={item.postContent}
            displayName={item.displayName}
            primaryProfileImage={item.primaryProfileImage}
          />
        );
      })}
    </div>
  );
}

export default SpaceContentDemo;
