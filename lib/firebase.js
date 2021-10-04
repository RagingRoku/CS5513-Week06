// load firebase-admin to interact with firebase project
import admin from "firebase-admin";

//authentication request 
//loading the JSON string and parsing it into an object
//doing this is more secure since env.local will not be committed
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
);

//wrap all code in a try() to catch errors

try{
  admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL,
    }
  );
}

catch(error) {
  //if an error happens, this will run
  console.log("firebase error", error.stack);
}

export default admin.firestore();