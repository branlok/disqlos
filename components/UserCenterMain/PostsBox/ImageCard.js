import React from "react";

function ImageCard({imageUrl}) {
  return (
    <div className="pt-2 h-full w-full flex-none">
      <img
        className="rounded-md h-full w-full border overflow-hidden object-cover cursor-pointer"
        src={imageUrl}
      />
    </div>
  );
}

export default ImageCard;
