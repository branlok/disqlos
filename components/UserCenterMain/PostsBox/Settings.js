import React, {useState} from 'react'

function Settings() {

    let [toggle, setToggle] = useState(false);

    return (
        <>
        <div className="absolute top-1 right-4" onClick={() => setToggle(!toggle)}>
            ...
            
        </div>
        {toggle && <div className="absolute top-2 right-8"><button className="bg-gray-500 text-white border-black text-xs rounded-sm px-1 mx-1"> Expand </button><button className="bg-gray-500 text-white text-xs rounded-sm px-1 mx-1">  Delete </button></div>}
        </>
    )
}

export default Settings
