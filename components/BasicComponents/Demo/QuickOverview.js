import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import ArrowLeft from "../../../styles/svg/arrowLeft.svg";
import ArrowRight from "../../../styles/svg/arrowRight.svg";
function QuickOverview() {
  const [index, setIndex] = useState(0);

  const page = [
    ({ style }) => (
      <animated.div className="absolute p-10" style={{ ...style }}>
        <h1 className="text-xs sm:text-xl lg:text-5xl font-bold">
          Reading and writing blogs made simple.
        </h1>
        <p className="text-sm lg:text-2xl text-gray-100">
          Less is More. Every post contains no more than 170 characters.
        </p>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div className="absolute p-10" style={{ ...style }}>
        <h1 className="text-xs sm:text-xl lg:text-5xl font-bold">
          The Sum of The Parts is Greater Than the Whole.
        </h1>
        <p className="text-sm lg:text-2xl text-gray-100">
          When 170 characters isn't enough, join posts together to form a
          thread! <br />
          Comment and share, bring a community together with our follower
          system.
        </p>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div className="absolute p-10" style={{ ...style }}>
        <h1 className="text-xs sm:text-xl lg:text-5xl font-bold">Media</h1>
        <p className="text-sm lg:text-2xl text-gray-100">
          Theres more than just characters in a post. Feel free to add JPG, and popular Gif as you like.{" "}
          <br />
        </p>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div className="absolute p-10" style={{ ...style }}>
        <h1 className="text-xs sm:text-xl lg:text-5xl font-bold">Privately</h1>
        <p className="text-sm lg:text-2xl text-gray-100">
          Little shy? Or just need more time? Write more without commitment,{" "}
          <br /> use <b>spaces</b> feature to do so. You choose when to disclose
          your work.
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
      <div className="relative w-full h-full text-white text-3xl flex justify-center items-center p-10">
        {transitions((style, i) => {
          const Page = page[i];
          return <Page style={style} />;
        })}
      </div>
      <button
        className="absolute left-0 top-0 h-full w-10 flex justify-center items-center text-white  hover:bg-opacity-40 transition-all"
        onClick={() => setIndex((state) => (state + 7) % 4)}
      >
        <ArrowLeft className="text-white fill-current" />
      </button>
      <button
        className="absolute right-0 top-0 h-full w-10 flex justify-center items-center text-white  hover:bg-opacity-40 transition-all"
        onClick={() => setIndex((state) => (state + 1) % 4)}
      >
        <ArrowRight className="text-white fill-current" />
      </button>

      <div></div>
    </>
  );
}

export default QuickOverview;
