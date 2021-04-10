import React, { useState, useEffect } from "react";
import CollapseSvg from "../../styles/svg/collapse.svg";
import UserCard from "./UserCard";
import useWindowDimensions from "../../utils/useWindowDimensions";
import MinimizedSocial from "./MinimizedSocial";
import TriangleSvg from "../../styles/svg/trianglearrow.svg";

function SocialSidebar() {
  let [collapse, setCollapse] = useState(false);
  let [showToggle, setShowToggle] = useState(true);
  let { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 900) {
      setCollapse(true);
      setShowToggle(false);
    } else if (width > 900) {
      setShowToggle(true);
    }
  }, [width]);

  if (collapse) {
    return (
      <div className="relative">
        <MinimizedSocial />
        {showToggle && (
          <div
            className="w-14 h-12 absolute top-2 -left-14 z-10 flex justify-center items-center bg-gray-300 rounded-l"
            onClick={() => setCollapse(!collapse)}
          >
            <CollapseSvg className="grayFill cursor-pointer" />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative">
        <div className=" h-full  w-64  p-6 flex-none bg-custom-pink-500 z-10 items-center flex flex-col overflow-y-scroll no-scrollbar">
          <h3 className="mb-4 font-bold text-custom-pink-950 ">Friends</h3>
          {temporaryData.map((item) => {
            return (
              <UserCard
                active={item.active}
                key={item.id}
                name={item.name}
                caption={item.lastPosted}
                imageURL={item.imageURL}
              />
            );
          })}
        </div>
        {showToggle && (
          <div
            className="w-14 h-12 absolute top-2 -left-14 z-10 flex justify-center items-center  transform rotate-180 "
            onClick={() => setCollapse(!collapse)}
          >
            <CollapseSvg className="grayFill cursor-pointer " />
          </div>
        )}
        <div className="absolute bottom-4 -left-10 w-6 h-6 flex justify-center items-center border rounded-md cursor-pointer bg-gray-300 hover:bg-gray-400 transition-all shadow-sm">
          <a href="#top">
            <TriangleSvg style={{ fill: "white" }} />
          </a>
        </div>
      </div>
    );
  }
}

const temporaryData = [
  {
    id: 1,
    name: "brandon",
    lastPosted: "3 minutes",
    active: true,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2F2ac2e2d2-f954-45fa-b2ae-c68b1bec279b.jpg?alt=media&token=86813f95-d718-4eed-b075-91ab58767528",
  },
  {
    id: 2,
    name: "brandon",
    lastPosted: "13 minutes",
    active: true,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2FGUWEIZ.full.2319875.jpg?alt=media&token=651aa418-ed0a-4175-b97b-73f54dfed247",
  },
  {
    id: 3,
    name: "brandon",
    lastPosted: "1 hour",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2FLauv-press-by-Lauren-Dunn-2020-billboard-1548-compressed.jpg?alt=media&token=ac524eac-c293-48b1-8497-a7bfdfe0a100",
  },
  {
    id: 4,
    name: "brandon",
    lastPosted: "5 hours",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2FSakis3.webp?alt=media&token=e8d417b1-3f7b-4078-9adf-2b38a1ae43fb",
  },
  {
    id: 5,
    name: "brandon",
    lastPosted: "3 weeks",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2FSara-Bareilles-Armor.jpg?alt=media&token=0b9842bf-bec7-40a7-8305-9463433d958e",
  },
  {
    id: 6,
    name: "brandon",
    lastPosted: "6 weeks",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Faramajapan.com-kiko-mizuhara-to-hold-online-festival-featuring-towa-tei-haruomi-hosono-and-more-kiko-mizuhara-to-hold-online-festival-featuring-towa-tei-haruomi-hosono-and-more.jpg?alt=media&token=3d2fdb26-ac8c-4af1-a766-c653c95ae16c",
  },
  {
    id: 7,
    name: "brandon",
    lastPosted: "6 weeks",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Ftumblr_pc07af4UfQ1xscxl2o1_500.jpg?alt=media&token=0bab3a97-6cb2-482d-83bf-594f91ed5dbd",
  },
  {
    id: 8,
    name: "brandon",
    lastPosted: "3 months",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Ftumblr_dcd52407b045254bd57867b80ff5d9b8_8d32fced_540.png?alt=media&token=0623aebd-d476-4cff-a38c-007939def1d9",
  },
  {
    id: 9,
    name: "brandon",
    lastPosted: "6 weeks",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Faramajapan.com-kiko-mizuhara-to-hold-online-festival-featuring-towa-tei-haruomi-hosono-and-more-kiko-mizuhara-to-hold-online-festival-featuring-towa-tei-haruomi-hosono-and-more.jpg?alt=media&token=3d2fdb26-ac8c-4af1-a766-c653c95ae16c",
  },
  {
    id: 10,
    name: "brandon",
    lastPosted: "6 weeks",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Ftumblr_pc07af4UfQ1xscxl2o1_500.jpg?alt=media&token=0bab3a97-6cb2-482d-83bf-594f91ed5dbd",
  },
  {
    id: 11,
    name: "brandon",
    lastPosted: "3 months",
    active: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Ftumblr_dcd52407b045254bd57867b80ff5d9b8_8d32fced_540.png?alt=media&token=0623aebd-d476-4cff-a38c-007939def1d9",
  },
];

export default SocialSidebar;
