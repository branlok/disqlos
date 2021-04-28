import React, { useState, useEffect } from "react";
import CloseSVG from "../../styles/svg/close.svg";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
function PlaceholderFriends() {
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(true);
  const styles = useSpring({ opacity: toggle ? 1 : 0 });
  useEffect(() => {
    if (!toggle) {
      setToggle(true);
    }
  }, [toggle]);
  if (!visible) return null;
  return (
    <animated.div style={styles} className="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-indigo-600 h-full px-2 mb-4 bg-custom-pink-300 dark:bg-cb-4 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
      {/* <img
        className="absolute top-0 left-0 object-cover posiion-center h-full w-full opacity-10"

      /> */}
      <Image
        className="absolute top-0 left-0 object-cover posiion-center h-full w-full opacity-30"
        layout="fill"
        src="/friends.png"
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <h1 className="xl:text-xl lg:text-md text-center font-bold text-white p-10 ">
          As you venture on disqlos, you can follow and track users of your
          liking. They will be visible in this column.
        </h1>
      </div>
      <div
        onClick={() => setVisible(false)}
        className="w-6 h-6  text-white absolute right-1 top-1 cursor-pointer hover:text-gray-300 transition-colors"
      >
        <CloseSVG className="fill-current" />
      </div>
    </animated.div>
  );
}

export default PlaceholderFriends;
