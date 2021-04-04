import uploadToDatabase from "../../../utils/firebaseDatabase";
import { nanoid } from "nanoid";
import firebase from "firebase";
import { db } from "../../../utils/firebase";

export default async function handleNewPost(value, userId, queue) {
  let type = value.value.type;
  /* CHECK IF USER IS POSTING TO QUEUE */
  if (queue) {
    /* CHECK IF USER IS POSTING as IMAGE or TEXT */
    if (type === "image") {
      try {
        console.log("posting to Queue, type:", type);
        let imageUrl = await uploadToDatabase(value.value.files, userId);
        let content = value.value.content;
        const postId = await nanoid();
        const queueId = await nanoid();
        //Add new post to firestore
        return db
          .collection("USERS")
          .doc(userId)
          .collection("PRIVATE_POSTS")
          .doc(queueId)
          .set({
            postId,
            queueId,
            userId,
            content,
            createdOn: firebase.firestore.Timestamp.now(),
            type,
            queue,
            leadpost: true,
            imageUrl,
          })
      } catch (error) {
        return error;
      }
    }

    if (type === "text") {
      try {
        console.log("posting to Queue, type:", type);
        let content = value.value.content;
        const postId = await nanoid();
        const queueId = await nanoid();
        
        return db
          .collection("USERS")
          .doc(userId)
          .collection("PRIVATE_POSTS")
          .doc(queueId)
          .set({
            postId,
            queueId,
            userId,
            content,
            createdOn: firebase.firestore.Timestamp.now(),
            type,
            queue,
            leadpost: true,
            imageUrl: false,
          });
      } catch (error) {
        return error;
      }
    }
  } else {
    if (type === "image") {
      try {
        console.log("posting to Public, type:", type);
        let imageUrl = await uploadToDatabase(value.value.files, userId);
        let content = value.value.content;
        const postId = await nanoid();
        //Add new post to firestore
        return db.collection("PUBLIC_POSTS").doc(postId).set({
          postId,
          userId,
          content,
          createdOn: firebase.firestore.Timestamp.now(),
          type,
          imageUrl,
        });
      } catch (error) {
        return "error";
      }
    }

    if (type === "text") {
      try {
        console.log("posting to Public, type:", type);
        let content = value.value.content;
        const postId = await nanoid();
        //Add new post to firestore
        return db.collection("PUBLIC_POSTS").doc(postId).set({
          postId,
          userId,
          content,
          createdOn: firebase.firestore.Timestamp.now(),
          type,
          imageUrl: false,
        });
      } catch (error) {
        return error;
      }
    }
  }
}
