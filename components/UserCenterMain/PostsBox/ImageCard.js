import React, {useState} from "react";
import OpenImage from "../../BasicComponents/OpenImage";

function ImageCard({imageUrl}) {
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <div className="pt-2 h-full w-full flex-none">
      <img
      onClick={() => setFullscreen(true)}
        className="rounded-md h-full w-full dark:border-cb-3 overflow-hidden object-cover cursor-pointer"
        src={imageUrl}
      />
     {fullscreen && <OpenImage imageUrl={imageUrl} setFullscreen={setFullscreen}/>}
    </div>
  );
}

export default ImageCard;
