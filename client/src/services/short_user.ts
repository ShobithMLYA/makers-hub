import firebase from "firebase";

const shortUser: any[] = [];
let userId: string;

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const userData = snapshot.data();
        const userDetails = {
          uid: user.uid,
          displayName: userData?.displayName,
          photoURL: userData?.photoURL,
          email: userData?.email,
        };
        shortUser.push(userDetails);
      });
      userId = user.uid
  }
});

export { shortUser, userId };
