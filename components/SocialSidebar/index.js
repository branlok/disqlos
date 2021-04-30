import React, { useState, useEffect } from "react";
import CollapseSvg from "../../styles/svg/arrowRight.svg";
import useWindowDimensions from "../../utils/useWindowDimensions";
import MinimizedSocial from "./MinimizedSocial";
import TriangleSvg from "../../styles/svg/trianglearrow.svg";
import useRetrieveFollowerData from "./utils/useRetrieveFollowerData";

import SocialSidebarRegular from "./SocialSidebarRegular";
export default function SocialSidebar({ toggleRightCol, setToggleRightCol }) {
  let [collapse, setCollapse] = useState(false);
  let [showToggle, setShowToggle] = useState(true);
  let [showSearch, setShowSearch] = useState();
  let { width } = useWindowDimensions();
  let [mobile, setMobile] = useState(width < 640 ? true : false);
  let { followerDataQuery } = useRetrieveFollowerData();

  useEffect(() => {
    if (width < 640) {
      setMobile(true);
    }
    if (width >= 640) {
      //return to desktop behaviour
      setMobile(false);
      //make sure to collapse if it wasn't collapsed
      setToggleRightCol(false);
    }
    if (width < 900) {
      setCollapse(true);
      setShowToggle(false);
    } else if (width > 900) {
      setShowToggle(true);
    }
  }, [width]);

  const slideIn = toggleRightCol ? "" : "-right-full";

  if (followerDataQuery.isSuccess) {
    if (mobile) {
      return (
        <div
          className={`${slideIn} absolute top-0 right-0 w-full h-full z-50 transition-all flex `}
        >
          <div
            className="w-full"
            onClick={() => setToggleRightCol(false)}
          ></div>
          <div
            className={` w-4/5 flex-none flex shadow-lg justify-center items-center transition-all h-full sm:block bg-gray-100 dark:bg-cb-2`}
          >
            <SocialSidebarRegular
              collapse={collapse}
              setCollapse={setCollapse}
              followerDataQuery={followerDataQuery}
              showToggle={showToggle}
              setShowSearch={setShowSearch}
            />
          </div>
        </div>
      );
    } else {
      return (
        //bg-custom-pink-500
        <div className="transform hidden sm:block relative dark:bg-cb-2 bg-gray-100 ">
          {collapse ? (
            <MinimizedSocial
              collapse={collapse}
              setCollapse={setCollapse}
              followerDataQuery={followerDataQuery}
              showToggle={showToggle}
            />
          ) : (
            <SocialSidebarRegular
              collapse={collapse}
              setCollapse={setCollapse}
              followerDataQuery={followerDataQuery}
              showToggle={showToggle}
              setShowSearch={setShowSearch}
            />
          )}
          <Collapser
            collapse={collapse}
            setCollapse={setCollapse}
            showToggle={showToggle}
          />
          <ScrollToTop />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}

//action accessories

function Collapser({ collapse, setCollapse, showToggle }) {
  const orientationLeft = collapse;

  if (showToggle) {
    return (
      <div
        className={`w-14 h-12 absolute top-2 -left-14 z-10 flex justify-center items-center dark:text-gray-200 dark:hover:text-gray-200 cursor-pointer cursor-pointer ${
          collapse && "bg-gray-300  text-white dark:bg-cb-3"
        } rounded-l`}
        onClick={() => setCollapse(!collapse)}
      >
        {orientationLeft ? (
          <CollapseSvg className="fill-current   transform rotate-180" />
        ) : (
          <CollapseSvg className="fill-current cursor-pointer" />
        )}
      </div>
    );
  } else {
    return null;
  }
}

const ScrollToTop = () => {
  return (
    <div className="absolute bottom-4 -left-10 w-6 h-6 flex justify-center items-center border rounded-md cursor-pointer bg-gray-300 dark:bg-cb-1 dark:border-cb-4 dark:hover:bg-cb-4 dark:text-white hover:bg-gray-400 transition-all shadow-sm">
      <a href="#top">
        <TriangleSvg className="fill-current" />
      </a>
    </div>
  );
};
