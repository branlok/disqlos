import React from 'react'

function DeleteQueue({setShowConfirmDelete, deleteQueueMutation}) {
    return (
        <div className="absolute left-0 top-0 h-full w-full bg-gray-100 flex flex-col justify-center items-center text-black z-50">
          <h1 className="text-lg font-bold">Confirm Delete?</h1>
          <div className="flex justify-center items-center">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className=" dark:border-transparent rounded-md px-2 py-1 hover:bg-green-500 hover:text-white m-2"
            >
              Return
            </button>
            <button
              onClick={() => deleteQueueMutation.mutate()}
              className="border dark:border-transparent rounded-md px-2 py-1 bg-gray-800 text-white hover:bg-red-500 hover:text-white m-2"
            >
              Confirm
            </button>
          </div>
        </div>
    )
}

export default DeleteQueue
