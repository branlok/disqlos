import React from "react";
import SpaceSVG from "../../../styles/illustrations/Virtual_reality_VR.svg";
import WelcomeSVG from "../../../styles/illustrations/Welcome_1.svg";
import DesignSVG from "../../../styles/illustrations/Design.svg";

function SpaceDescriptions() {
  return (
    <>
      <header className="my-4 text-center h-full sm:flex sm:justify-center sm:items-center sm:flex-col px-8  ">
        <h1 className=" font-bold text-3xl xl:text-5xl ">
          There is a Space for Everybody
        </h1>
        <p>
          A primary feature at disqlos is that each post can be made into a
          private space
        </p>
      </header>
      <div className="h-full flex-initial py-10 flex flex-col sm:flex-row items-center justify-around w-4/5 h-1/2  ">
        <div className="flex flex-row sm:flex-col items-center h-full mx-4 ">
          <div className="h-28 w-28 sm:h-32 sm:w-32 xl:h-52 xl:w-52 rounded-full bg-gray-100 ">
            <SpaceSVG />
          </div>
          <div className="h-40  w-44 xl:w-72 text-xs xl:text-sm ml-5 sm:ml-0 text-left sm:text-center my-6">
            <h1 className="text-lg sm:text-2xl font-bold mb-1">Create</h1>
            Within a space you are able to continue to post under its original
            post. We will organize its hierarchy. And unlike comments and
            replies, this space is private.
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center h-full mx-4">
          <div className="h-28 w-28 sm:h-32 sm:w-32 xl:h-52 xl:w-52 rounded-full bg-gray-100 ">
            <DesignSVG />
          </div>
          <div className="h-40 w-44 xl:w-72 text-xs xl:text-sm ml-5 sm:ml-0 text-left sm:text-center my-6">
            <h1 className="text-lg sm:text-2xl font-bold mb-1">Fill</h1>
            Once you think you've written enough. We will bundle and published
            the thread of posts that you curated. and your space won't be
            deleted unless specified. So expand and republish as you like.
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center h-full mx-4">
          <div className="h-28 w-28 sm:h-32 sm:w-32 xl:h-52 xl:w-52 rounded-full bg-gray-100 ">
            <WelcomeSVG />
          </div>
          <div className="h-40  w-44 xl:w-72 text-xs xl:text-sm ml-5 sm:ml-0 text-left sm:text-center my-6">
            <h1 className="text-lg sm:text-2xl font-bold mb-1">Publish</h1>
            Collaboration/Sharing might be important whether use the space to
            build a diary, a story, or documenting a challenge. With our
            follower and friends system, you have the control to include or
            exclude memberships.
          </div>
        </div>
      </div>
    </>
  );
}

export default SpaceDescriptions;
