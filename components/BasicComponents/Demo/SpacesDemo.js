import React, { useState } from "react";
import PostMaker from "./PostMaker";
import SpaceContentDemo from "./SpaceContentDemo";
import Spaces from "./Spaces";

function SpacesDemo() {
  const [showList, setShowList] = useState(false);
  const [topic, setTopic] = useState(false);
  return (
    <div className="flex h-full w-full p-10 shadow-md overflow-hidden ">
      <div className="w-1/2 h-full  flex-col border-r-2 flex justify-center items-center ">
        <h1 className="text-3xl font-bold">Here are some example spaces 👉</h1>
        <p>Choose a space and open it!</p>
      </div>
      <div className="w-1/2 h-full flex flex-col items-center overflow-scroll no-scrollbar overscroll-contain smoothScroll">
        {showList ? (
          <SpaceContentDemo setShowList={setShowList}/>
        ) : (
          <>
            <Spaces
              numberOfChildren={4}
              postContent={"New diet and excercise regimen"}
              setShowList={setShowList}
            />
            <Spaces
              numberOfChildren={4}
              postContent={"Summer 2020 camping trip with my girlfriend"}
              setShowList={setShowList}
            />
            <Spaces
              numberOfChildren={4}
              postContent={"Photos from Prom night"}
              setShowList={setShowList}
            />
            <Spaces
              numberOfChildren={4}
              postContent={"2019 Graduation"}
              setShowList={setShowList}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SpacesDemo;
