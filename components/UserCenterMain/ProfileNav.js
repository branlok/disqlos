import Link from "next/link";
import React, { useEffect } from "react";

function ProfileNav({ directive }) {
  return (
    <div className="w-full h-12 border-b-2 flex flex-between items-center">
      <div
        className={`h-full w-24 flex-none flex items-center mx-2 px-4  color-gray-600 ${
          directive == "feed" && "font-bold"
        } `}
      >
        <Link className="cursor-pointer" href="/dashboard/feed">
          Feed
        </Link>
      </div>
      <ul className="h-full w-full flex justify-end items-center">
        <li
          className={`px-4 mx-2 color-gray-600  ${
            directive == "posts" && "font-bold"
          } `}
        >
          <Link className="cursor-pointer" href="/dashboard/posts">
            <a>Posts</a>
          </Link>
        </li>
        <li
          className={`px-4 mx-2 color-gray-600  ${
            directive == "queue" && "font-bold"
          } `}
        >
          <Link className="cursor-pointer" href="/dashboard/queue">
            <a>Space</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
