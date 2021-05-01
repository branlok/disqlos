import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import CloseSVG from "../../../styles/svg/close.svg";
function PlaceholderPost({ postExists }) {
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(true);
  const styles = useSpring({ opacity: toggle ? 1 : 0 });
  
  useEffect(() => {
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
      className=" relative overflow-hidden bg-gradient-to-r from-indigo-700 to-indigo-600 h-full px-2 mb-4 bg-custom-pink-300 dark:bg-cb-4 rounded-md shadow-md flex flex-col child last:mb-0 "
    >
      <Image
        className="absolute left-0 top-0  w-full h-full opacity-30 object-cover object-center"
        width={800}
        height={800}
        src="/comfort.png"
      />

      <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
        <h1 className="md:text-xl lg:text-3xl text-center font-bold text-white p-10 ">
        Take your space. <br/> Post whatever you want!
        </h1>
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
