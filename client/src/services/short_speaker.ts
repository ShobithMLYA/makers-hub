import firebase from "firebase";

const shortSpeaker: any[] = [];
const speakers: string[] = [];

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await firebase
      .firestore()
      .collection("speakers")
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
          snapshot.forEach((document) => {
            console.log(document.data())
            const speakerData = document.data();
            const speakerDetails = {
              uid: document.id,
              name: speakerData?.name,
              photo: speakerData?.photo,
              email: speakerData?.email,
              mobile: speakerData?.mobile,
              designation: speakerData?.designation,
              organization: speakerData.organization
            };
            shortSpeaker.push(speakerDetails);
            if(document.data()['name'] !== null){
                speakers.push(document.data()['name'])
            }
          })
      });
  }
});

export { shortSpeaker, speakers };
