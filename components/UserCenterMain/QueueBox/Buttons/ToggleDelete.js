import React from 'react'

function ToggleDelete({setShowConfirmDelete}) {
    return (
        <button
          onClick={() => setShowConfirmDelete(true)}
          className="text-xs text-red-1000 opacity-50 hover:opacity-100 transition font-bold dark:text-white z-40"
        >
          Delete
        </button>
    )
}

export default ToggleDelete
