import React from "react";

function OpenImage({ imageUrl, setFullscreen }) {
  return (
    <div onClick={() => setFullscreen(false)} className="fixed top-0 left-0 w-screen h-screen bg-opacity-40 bg-black z-40 flex justify-center items-center ">
      <div className="w-full h-full flex flex-col justify-center items-center  rounded-md p-5 ">
        <img src={imageUrl} className="h-full object-scale-down" />
      </div>
    </div>
  );

//   <button
//   className="text-gray-700 font-bold mt-4 rounded-md bg-gray-100 px-2 bg-opacity-80"
//   onClick={() =>  setFullscreen(false)}
// >
//   Return
// </button>
}

export default OpenImage;
