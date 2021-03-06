import React, { useState } from "react";
import BrushButton from "./Buttons/BrushButton";

function ImageContent({image, onHover}) {
    const [hideInterface, setHideInterface] = useState(false);
    
  return (
    <>
      <img
        className={`absolute top-0 object-cover left-0  w-full h-full  ${
          onHover ? "opacity-100 " : "opacity-5 "
        }
        ${hideInterface ? "z-40 opacity-100" : "z-0 opacity-5 "}
        transition-all`}
        src={image}
      ></img>
      <BrushButton
        setHideInterface={setHideInterface}
        hideInterface={hideInterface}
      />
    </>
  );
}

export default ImageContent;
