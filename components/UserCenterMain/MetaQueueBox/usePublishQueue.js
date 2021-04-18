import React from 'react'
import { useMutation } from 'react-query'
import { db } from '../../../utils/firebase'

function usePublishQueue(userId, queueId) {
    const publishQueueMutation = useMutation(() => updateQueueStatus(userId, queueId))
    return {publishQueueMutation}
}

function updateQueueStatus(userId, queueId) {
    return db.collection("USERS").doc(userId).collection("PRIVATE_POSTS").doc(queueId).update({queue: false})
}

export default usePublishQueue
