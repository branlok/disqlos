import { storage } from "./firebase";
import { nanoid } from "nanoid";

export default async function uploadToDatabase(file, currentUser) {
  const storageRef = storage.ref();

  const id = nanoid();
  const metadata = {
    cacheControl: "max-age=86400",
  };
  const imageToServer = storageRef
    .child(`${currentUser}/${id}`)
    .put(file, metadata);

  return await imageToServer.then((uploadTaskSnapshot) => {
    return uploadTaskSnapshot.ref.getDownloadURL();
  });
}
