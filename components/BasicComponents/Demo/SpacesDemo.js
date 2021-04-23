import React, { useState } from "react";
import PostMaker from "./PostMaker";
import SpaceContentDemo from "./SpaceContentDemo";
import Spaces from "./Spaces";
import { animated, useTransition, config } from "react-spring";

const initialState = [
  {
    key: "demo1",
    numberOfChildren: 2,
    postContent: "Begun my Journey to finish a 40km marathon 🏃‍♂️",
  },
  {
    key: "demo2",
    numberOfChildren: 2,
    postContent: "Trip to Osaka, Japan 🇯🇵",
  },
  {
    key: "demo3",
    numberOfChildren: 2,
    postContent: "Family Things", 
  },
  {
    key: "demo4",
    numberOfChildren: 2,
    postContent: "Study Club", 
  },
];

function SpacesDemo() {
  const [showList, setShowList] = useState(false);
  const [spaces, setSpaces] = useState(initialState);

  const transitions = useTransition(showList, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    // reverse: !showList,
    config: config.default,
  });

  return (
    <div className="flex h-full w-full p-10 shadow-md overflow-hidden ">
      <div className="w-1/2 h-full  flex-col border-r-2 flex justify-center items-center ">
        <h1 className="text-3xl font-bold">Check out spaces 👉</h1>
        <p>Choose a space and open it!</p>
      </div>
      <div className="relative w-1/2 h-full ">
        {transitions((styles, item) => {
          return item ? (
            <animated.div
              style={styles}
              className="absolute w-full h-full flex flex-col items-center overflow-scroll no-scrollbar smoothScroll "
            >
              <SpaceContentDemo setShowList={setShowList} target={showList} />
            </animated.div>
          ) : (
            <animated.div
              style={styles}
              className="absolute w-full h-full flex flex-col items-center justify-start overflow-scroll no-scrollbar smoothScroll"
            >
              {spaces.map((item) => {
                return (
                  <Spaces
                    key={item.key}
                    numberOfChildren={item.numberOfChildren}
                    postContent={item.postContent}
                    target={item.key}
                    setShowList={setShowList}
                  />
                );
              })}

              {/* <Spaces
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
            /> */}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

export default SpacesDemo;
