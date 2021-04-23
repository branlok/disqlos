import React from 'react'
import BrushSvg from "../../../../styles/svg/brush.svg"
function BrushButton({setHideInterface, hideInterface}) {
    return (
        <button
          onClick={() => {
            setHideInterface(!hideInterface);
          }}
          className="absolute bottom-1 right-1 z-40 h-5 w-5 text-gray-600 hover:text-white transition-all focus:outline-none rounded-md p-1"
        >
          <BrushSvg className="w-full h-full fill-current" />
        </button>
    )
}

export default BrushButton
