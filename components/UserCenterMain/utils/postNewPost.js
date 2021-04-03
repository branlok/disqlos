import uploadToDatabase from "../../../utils/firebaseDatabase";
import { nanoid } from "nanoid";
import firebase from "firebase";
import {db} from "../../../utils/firebase";

export default async function handleNewPost(value, userId ) {
    let type = value.value.type;
    if (type === "image") {
      try {
          console.log(value);
        let imageUrl = await uploadToDatabase(value.value.files, userId);
        let content = value.value.content;
        const postId = nanoid();
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
      let content = value.value.content;
      const postId = nanoid();
      //Add new post to firestore
      return db.collection("PUBLIC_POSTS").doc(postId).set({
        postId,
        userId,
        content,
        createdOn: firebase.firestore.Timestamp.now(),
        type,
        imageUrl: false,
      });
    }
  }