import React, { useState, useRef, useEffect } from "react";
import ContentBody from "./ContentBody";
import { useSpring, animated, config } from "react-spring";
function QueuePost({ item }) {
  const [expand, setExpand] = useState(true);
  const [appear, setAppear] = useState(false);
  const randomDelay = Math.floor((Math.random() * 200) + 100);
  const styles = useSpring({
    config: config.gentle,
    delay: randomDelay,
    from: { transform: "scale(0.95)", opacity: 0, },
    to: {
      opacity: appear ? 1 : 0,
      transform: "scale(1)",
    },
  });

  useEffect(() => {
    if (!appear) {
      setAppear(true);
    }
  }, [appear]);

  return (
    <div
      className="my-3 xl:w-1/2 xl:odd:pr-6 xl:px-0 xl:h-80 "
    >
      <animated.div style={styles} className="h-full max-h-96 px-2 bg-custom-pink-300 dark:bg-cb-4 rounded-md shadow-md flex child last:mb-0 relative">
        {expand && (
          <ContentBody
            image={item.imageUrl}
            createdOn={item.createdOn}
            numberOfChildren={item.numberOfChildren}
            postContent={item.content}
            queueId={item.queueId}
          />
        )}
      </animated.div>
    </div>
  );
}

export default QueuePost;
