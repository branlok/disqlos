import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import ArrowLeft from "../../../styles/svg/arrowLeft.svg";
import ArrowRight from "../../../styles/svg/arrowRight.svg";
function QuickOverview() {
  const [index, setIndex] = useState(0);

  const page = [
    ({ style }) => (
      <animated.div className="absolute" style={{ ...style }}>
        <h1 className="text-3xl font-bold">
          We make reading and writing blogs simple.
        </h1>
        <p className="text-xl text-gray-100">
          Each post contains no more than 170 characters
        </p>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div className="absolute" style={{ ...style }}>
        <h1 className="text-3xl font-bold">
          The Sum of The Parts is Greater Than the Whole.
        </h1>
        <p className="text-xl text-gray-100">
          When 170 characters isn't enough, join posts together to form a thread! <br/>
          Gather a community, share comments and make replies.
        </p>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        className="absolute"
        style={{ ...style }}
      >
        <h1 className="text-3xl font-bold">
            Media
        </h1>
        <p className="text-xl text-gray-100">
          More than just words to count in a post, add your pictures and links <br/>
          to bring more to your voice.
        </p>
      </animated.div>
    ),
  ];

  const transitions = useTransition(index, {
    keys: null,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      <div className="relative w-full h-full text-white text-3xl flex justify-center items-center">
        {transitions((style, i) => {
          const Page = page[i];
          return <Page style={style} />;
        })}
      </div>
      <button
        className="absolute left-0 top-0 h-full w-10  text-white"
        onClick={() => setIndex((state) => (state + 5) % 3)}
      >
        <ArrowLeft className="text-white fill-current" />
      </button>
      <button
        className="absolute right-0 top-0 h-full w-10  text-white"
        onClick={() => setIndex((state) => (state + 1) % 3)}
      >
        <ArrowRight className="text-white fill-current" />
      </button>

      <div></div>
    </>
  );
}

export default QuickOverview;
