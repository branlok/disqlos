import React from 'react'
import { useMutation } from 'react-query'
import { db } from '../../../utils/firebase'
import firebase from 'firebase';
function usePublishQueue(userId, queueId) {
    const publishQueueMutation = useMutation(() => updateQueueStatus(userId, queueId))
    return {publishQueueMutation}
}


//  lastPublish: firebase.firestore.Timestamp.now(), metaPosts
function updateQueueStatus(userId, queueId) {
    return db.collection("USERS").doc(userId).collection("PRIVATE_POSTS").doc(queueId).set({queue: false, lastPublishedTime: firebase.firestore.Timestamp.now()}, {merge: true})
}

export default usePublishQueue
