import React, { useState } from "react";
import PostDemo from "./PostDemo";
import PostMaker from "./PostMaker";
import ArrowSVG from "../../../styles/svg/arrowLeft.svg";
import { animated, useTransition, config } from "react-spring";

const getDemoContent = (target) => {
  if (target == "demo1") {
    return [
      {
        postContent: "Got some good advice on breathing techniques with joe. Plan to work on the stride soon",
        displayName: "Craig",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
      {
        postContent:
          "finished a run with joe today, really pushed my limits, 5km DOWN!",
        displayName: "Craig",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
      {
        postContent: "snowed today, but this aint stopping me 💪 ",
        displayName: "Craig",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
      {
        postContent: "Finished my first run 1.3km, that was exhausting!",
        displayName: "Craig",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
    ];
  } else if (target == "demo2") {
    return [
      {
        postContent: "Finished my first run 1.3km, that was exhausting!",
        displayName: "Priscilla",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
      {
        postContent: "I'm HEREEE. Landing soon",
        displayName: "Priscilla",
        image: "https://photos.smugmug.com/Kyoto/-1/i-GrBZCqg/0/99f07447/L/shutterstock_1311190253-L.jpg",
        primaryProfileImage:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
    ];
  }
};

function SpaceContentDemo({ setShowList, target }) {
  const [state, setstate] = useState(getDemoContent(target));

  const transitions = useTransition(state, {
    from: { height: "0px", opacity: 0, transform: "translateX(-100%)" },
    enter: { height: "200%", opacity: 1, transform: "translateX(0%)" },
    leave: { height: "0px", opacity: 0, transform: "translateX(100%)" },
    initial: null,
    config: config.default,
  });

  return (
    <div className="w-full h-full mt-2 flex flex-col items-center">
      <div className="w-full h-8 flex px-5">
        <button onClick={() => setShowList(false)} className="h-full flex ">
          <ArrowSVG />
          Back
        </button>
      </div>
      <PostMaker setNewPost={setstate} oldPosts={state} />
      {transitions((styles, item) => {
        return (
          <animated.div className="w-full" style={styles}>
            <PostDemo
              //   key={"demon" + idx}
              imageUrl={item.image}
              postContent={item.postContent}
              displayName={item.displayName}
              primaryProfileImage={item.primaryProfileImage}
            />
          </animated.div>
        );
      })}
      {/* {state.map((item, idx) => {
        return (
          <PostDemo
            key={"demon" + idx}
            postContent={item.postContent}
            displayName={item.displayName}
            primaryProfileImage={item.primaryProfileImage}
          />
        );
      })} */}
    </div>
  );
}

export default SpaceContentDemo;
