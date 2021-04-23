import React from 'react'

function PublishedDemo() {
    const [page, setPage] = useState(0);

    const handlePageChange = (direction) => {
      const firstPage = 0;
      const lastPage = queueContent.length - 1;
      if (direction == "next") {
        if (page == lastPage) {
          return null;
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      }
      if (direction == "prev") {
        if (page == firstPage) {
          setShowChildrenPosts(false);
        } else {
          setPage((prevPage) => prevPage - 1);
        }
      }
    };
  
    return (
      <>
        <ContentBody
          key={queueContent[page].postId}
          postContent={queueContent[page].content}
          date={queueContent[page].createdOn}
          story={true}
          hasImage={queueContent[page].imageUrl}
        />
        <div className="absolute top-4 right-2 flex justify-end items-center">
          <div className="text-black mr-1 text-gray-400 text-xs h-full w-12 flex justify-center items-center">
            {page + 1} of {queueContent.length}
          </div>
          <button
            className="focus:outline-none rounded-full bg-gray-300 dark:bg-cb-4 dark:text-white dark:hover:bg-cb-1 mr-1 hover:bg-custom-pink-600 hover:text-white"
            onClick={() => handlePageChange("prev")}
          >
            <ArrowLeft className=" fill-current" />
          </button>
          <button
            className="focus:outline-none rounded-full bg-gray-300 dark:bg-cb-4 dark:text-white dark:hover:bg-cb-1 hover:bg-custom-pink-600 hover:text-white"
            onClick={() => handlePageChange("next")}
          >
            <ArrowRight className=" fill-current" />
          </button>
        </div>
      </>
    );
}

export default PublishedDemo
