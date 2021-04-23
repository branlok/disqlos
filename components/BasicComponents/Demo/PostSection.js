import React, { useState } from "react";
import PostDemo from "./PostDemo";

function PostSection({ offsetY }) {

  return (
    <>
      <div
        className="h-1/3 w-full flex items-center ml-96 mb-10 z-20"
        style={{ transform: `translateX(${offsetY * -0.3}px)` }}
      >
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
      </div>

      <div className="absolute flex justify-center items-center top-0 left-0 h-full w-full h-1/3 w-full flex  z-30">
        <div>
          {/* <div>
            <form>
              <input
                className="rounded-full h-8 shadow-md px-4 font-bold"
                type="text"
              >
              </input>
              <button className="rounded-full h-8 shadow-lg px-4 font-bold mx-2 bg-custom-pink-1000 text-white ">Tell em</button>
            </form>
          </div> */}
          <h1 className="text-3xl font-bold">Broadcast your voice 🗣️</h1>
        </div>
      </div>
      <div
        className="h-1/3 w-full flex items-center mr-96  mt-10  z-20"
        style={{ transform: `translateX(${(offsetY * 0.3) - 500}px)` }}
      >

        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
        <PostDemo
          postContent="Demo"
          displayName="Jason"
          primaryProfileImage="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        />
      </div>
    </>
  );
}

export default PostSection;
