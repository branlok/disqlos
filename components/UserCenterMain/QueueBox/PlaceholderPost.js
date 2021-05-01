import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import CloseSVG from "../../../styles/svg/close.svg";
function PlaceholderPost({ postExists }) {
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(true);
  const styles = useSpring({ opacity: toggle ? 1 : 0 });

  useEffect(() => {
    console.log(postExists);
    if (!toggle && postExists < 1) {
      setVisible(true);
      setToggle(true);
    } else if (postExists > 0) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <animated.div
      style={styles}
      className=" relative overflow-hidden bg-gradient-to-r from-indigo-700 to-indigo-600 h-full mb-4 bg-custom-pink-300 dark:bg-cb-4 rounded-md shadow-md flex flex-col child last:mb-0  "
    >
      <Image
        className="absolute left-10 top-10  w-full h-full opacity-30 object-cover object-center transform translate-x-1/4 translate-y-1/2"
        width={1000}
        height={1000}
        src="/thoughts.png"
      />

      <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
        <div className="md:text-xl lg:text-2xl text-center font-bold text-white w-full h-full flex justify-center items-center flex-col p-5">
          <h1 className="md:text-3xl lg:text-4xl">
            Spaces
          </h1>
          <div className="">
            Yours to own, yours to share. <br /> No criticism, no worries, what
            you may end up with are spaces filled with moments of your hearts
            content. Keep what you like, post what you like.
          </div>
        </div>
      </div>
      <div
        onClick={() => setVisible(false)}
        className="w-8 h-8  text-white absolute right-2 top-2 cursor-pointer hover:text-gray-300 transition-colors"
      >
        <CloseSVG className="fill-current" />
      </div>
    </animated.div>
  );
}

export default PlaceholderPost;
