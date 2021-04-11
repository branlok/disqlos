// import React from 'react'
// import { useMutation } from 'react-query'
// import { db,} from '../../../utils/firebase'

// function useAddUser((userId, targetUserId))) {

//     useMutation(() => {
//         (follow) => {
//             if (follow) {
//               return db
//                 .collection("USERS")
//                 .doc(userId)
//                 .set( 
//                   {
//                     following: firebase.firestore.FieldValue.arrayUnion(targetUserId),
//                   },
//                   { merge: true }
//                 )
//                 .then((res) => {
//                   db.collection("USERS")
//                     .doc(userId)
//                     .set(
//                       {
//                         followers: firebase.firestore.FieldValue.arrayUnion(userId),
//                       },
//                       { merge: true }
//                     );
//                 });
//             }
//             //unfollow
//             if (!follow) {
//               return db
//                 .collection("USERS")
//                 .doc(userId)
//                 .set(
//                   {
//                     following: firebase.firestore.FieldValue.arrayRemove(
//                       targetUserId
//                     ),
//                   },
//                   { merge: true }
//                 )
//                 .then((res) => {
//                   db.collection("USERS")
//                     .doc(userId)
//                     .set({
//                       followers: firebase.firestore.FieldValue.arrayRemove(userId),
//                     }, {merge: true});
//                 });
//             }
//           },
//     })

//     return (
//         <div>
            
//         </div>
//     )
// }

// export default useAddUser
