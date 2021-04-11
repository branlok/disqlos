import React, { useState, useEffect } from "react";
import CollapseSvg from "../../styles/svg/collapse.svg";
import UserCard from "./UserCard";
import useWindowDimensions from "../../utils/useWindowDimensions";
import MinimizedSocial from "./MinimizedSocial";
import TriangleSvg from "../../styles/svg/trianglearrow.svg";
import AddFollowerSvg from "../../styles/svg/personAdd.svg";
import useRetrieveFollowerData from "./utils/useRetrieveFollowerData";

import SocialSidebarRegular from "./SocialSidebarRegular";
import FollowerSearch from "./FollowerSearch";
export default function SocialSidebar() {
  let [collapse, setCollapse] = useState(false);
  let [showToggle, setShowToggle] = useState(true);
  let [showSearch, setShowSearch] = useState();
  let { width } = useWindowDimensions();
  let followerDataQuery = useRetrieveFollowerData();

  useEffect(() => {
    if (width < 900) {
      setCollapse(true);
      setShowToggle(false);
    } else if (width > 900) {
      setShowToggle(true);
    }
  }, [width]);

  return (
    <div className="relative">
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

const Collapser = ({ collapse, setCollapse, showToggle }) => {
  const orientationLeft = collapse;

  if (showToggle) {
    return (
      <div
        className={`w-14 h-12 absolute top-2 -left-14 z-10 flex justify-center items-center ${
          collapse && "bg-gray-300"
        } rounded-l`}
        onClick={() => setCollapse(!collapse)}
      >
        {orientationLeft ? (
          <CollapseSvg className="grayFill cursor-pointer" />
        ) : (
          <CollapseSvg className="grayFill cursor-pointer transform rotate-180" />
        )}
      </div>
    );
  } else {
    return null;
  }
};

const ScrollToTop = () => {
  return (
    <div className="absolute bottom-4 -left-10 w-6 h-6 flex justify-center items-center border rounded-md cursor-pointer bg-gray-300 hover:bg-gray-400 transition-all shadow-sm">
      <a href="#top">
        <TriangleSvg style={{ fill: "white" }} />
      </a>
    </div>
  );
};
