import React from "react";
import UserListSVG from "../../styles/svg/userList.svg";
import ProfileSVG from "../../styles/svg/profile.svg";

function Footer({ footerProps }) {
  const {
    toggleLeftCol,
    setToggleLeftCol,
    toggleRightCol,
    setToggleRightCol,
  } = footerProps;

  return (
    <div className="sm:hidden h-14 bg-indigo-900 flex-none flex items-center justify-around w-full shadow-lg z-50 text-white">
      <ProfileSVG
        className="fill-current text-white"
        onClick={() => {
          setToggleLeftCol(!toggleLeftCol);
          toggleRightCol ? setToggleRightCol(!toggleRightCol) : null;
        }}
      />
      <UserListSVG
        className="fill-current text-white"
        onClick={() => {
          setToggleRightCol(!toggleRightCol);
          toggleLeftCol ? setToggleLeftCol(!toggleLeftCol) : null;
        }}
      />
    </div>
  );
}

export default Footer;
