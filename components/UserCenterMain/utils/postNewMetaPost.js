import uploadToDatabase from "../../../utils/firebaseDatabase";
import { nanoid } from "nanoid";
import firebase from "firebase";
import { db } from "../../../utils/firebase";

export default async function postNewMetaPost(value, userId, queueId) {
  let type = value.value.type;
  let queue = true;
  console.log("i ran")
  if (type === "image") {
    try {
      console.log("posting to Metapost, type:", type);
      let imageUrl = await uploadToDatabase(value.value.files, userId);
      let content = value.value.content;
      const postId = await nanoid();
      //Add new post to firestore
      return db
        .collection("USERS")
        .doc(userId)
        .collection("PRIVATE_POSTS")
        .doc(postId)
        .set({
          postId,
          queueId,
          userId,
          content,
          createdOn: firebase.firestore.Timestamp.now(),
          type,
          queue,
          leadPost: false, //metaposts have leadPost false
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
      
      return db
        .collection("USERS")
        .doc(userId)
        .collection("PRIVATE_POSTS")
        .doc(postId)
        .set({
          postId,
          queueId,
          userId,
          content,
          createdOn: firebase.firestore.Timestamp.now(),
          type,
          queue,
          leadPost: false,
          imageUrl: false,
        });
    } catch (error) {
      return error;
    }
  }
  
  
}
