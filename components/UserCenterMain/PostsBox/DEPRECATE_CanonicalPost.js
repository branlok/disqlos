import React,{useState} from 'react'
import BasicPost from './BasicPost';
import PicturePost from './PicturePost'
function CanonicalPost() {
    let [toggle, setToggle] = useState(false);
    //conditionally render each post fade in and fade out
    return (
        <div className="h-40 w-full overflow-scroll no-scrollbar scroll-snap-y mb-2">
            {toggle ? <BasicPost func={() => setToggle(!toggle)}/>
:
            <PicturePost func={() => setToggle(!toggle)}/>}
        </div>
    )
}

export default CanonicalPost
