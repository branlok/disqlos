import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import ImageCard from "./ImageCard";
import ContentBody from "./ContentBody";
import PortfolioCard from "./PortfolioCard";
import Comments from "./Comments";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
import useOnlyUserData from "../../Queries/USERS/useOnlyUserData";
import Settings from "./Settings";
import QueuePostsContent from "./QueuePostsContent";
import { setLocale } from "yup";
function PicturePost({ item, page, queuedPost, directory, queueId, targetId }) {
  const [viewerOpened, setViewerOpened] = useState(false);
  const [appear, setAppear] = useState(false);
  const [endTransform, setEndTransform] = useState(false);
  const { userData } = useOnlyUserData();

  const liked = item.likedBy.includes(userData.data.uid);
  const { likeMutation } = useLikePost(item.postId, [
    "getPosts",
    directory,
    targetId,
  ]);

  function handleLikeUnlike() {
    if (liked) {
      likeMutation.mutate({ unlike: true, page });
      // mutateLikePost(true, page);
    } else {
      likeMutation.mutate({ unlike: false, page });
      // mutateLikePost(false, page);
    }
  }

  useEffect(() => {
    if (!appear) {
      setAppear(true);
    }
  }, [appear]);

  const styles = useSpring({
    config: config.gentle,
    from: { transform: "scale(0.95)", opacity: 0 },
    to: {
      opacity: appear ? 1 : 0,
      transform: endTransform ? "none" : "scale(1)",
    },
    onRest: {
      transform: () => setEndTransform(true),
      //strange behaviour with tailwindcss and react-spring, causing image to become absolute posiiont instead of fixed- require to remove transform
    },
  });

  const [showChildrenPosts, setShowChildrenPosts] = useState(false);

  const pagination = item.leadPost ? true : false;

  return (
    <animated.div
      style={styles}
      className="relative h-full px-2 mb-4 bg-custom-pink-300 dark:bg-cb-4 dark:border-cb-3 rounded-md shadow-md flex flex-col child last:mb-0  "
    >
      <ImageCard imageUrl={item.imageUrl} />
      <div className="relative h-full flex child">
        <PortfolioCard postOwner={item.userId} post={item} />
        {showChildrenPosts ? (
          <QueuePostsContent
            queueContent={item.childrenPosts}
            setShowChildrenPosts={setShowChildrenPosts}
          />
        ) : (
          <ContentBody
            postContent={item.content}
            date={item.createdOn}
            numberOfChildren={item.numberOfChildren}
            story={item.numberOfChildren && true}
          />
        )}
        <Settings
          postId={item.postId}
          postOwner={item.userId}
          liked={liked}
          handleLikeUnlike={handleLikeUnlike}
          queuedPost={queuedPost}
          queueId={queueId}
          directory={directory}
          targetId={targetId}
          contentValue={item.content}
          type="image"
          myUserProfilePicture={userData.data.primaryProfileImage}
          imageUrl={item.imageUrl}
        />
        {pagination && !showChildrenPosts && (
          <div className="absolute top-3.5 right-2 ">
            <button
              className="font-bold rounded-md bg-gray-500 text-white py-1 p-2 hover:bg-gray-800 hover:text-white text-xs transition "
              onClick={() => setShowChildrenPosts(true)}
            >
              Open
            </button>
          </div>
        )}
      </div>
      {!queuedPost && (
        <Comments
          postId={item.postId}
          viewerOpened={viewerOpened}
          setViewerOpened={setViewerOpened}
          page={page}
          numberOfCommments={item.numberOfCommments}
          directory={directory}
          handleLikeUnlike={handleLikeUnlike}
          liked={liked}
          targetId={targetId}
        />
      )}
      {!queuedPost && (
        <PostStats
          postId={item.postId}
          likedBy={item.likedBy}
          numberOfCommments={item.numberOfComments}
          liked={liked}
          handleLikeUnlike={handleLikeUnlike}
        />
      )}
    </animated.div>
  );
}

export default PicturePost;
