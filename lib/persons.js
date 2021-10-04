//library for the "persons" collection
//import firebase library
import firebase from './firebase';


//return valid IDs for getStaticPaths()
export async function getPersonIds(){
  let output = [];
  //wrap in a try/catch in case of errors
  try{
    //get all documents from firestore collection named "persons"
    const snapshot = await firebase.collection("persons").get();

    //go through and make an array of the data from the firestore collection documents
    snapshot.forEach(
      (doc) => {
        output.push(
          {
          params: {
            id: doc.id
            }
          }
        );
      }
    );

  } catch (error) {
    console.error(error);
  }
  return output;
}


//return one document for the matching ID for getStaticProps()
export async function getPersonData(idRequested){
  // grabbing a single doc from firestore collection matched by id
  const doc = await firebase.collection("persons").doc(idRequested).get();

  //return data from firestore document as JSON
  let output;
  if (!doc.empty){
    output = { id: doc.id, data: doc.data() };
  }
  else {
    output = null;
  }
  return output;
}


//return all data as JSON objects
export async function getList(){
  let output = [];
  //wrap in a try/catch in case of errors
  try{
    //get all documents from firestore collection named "persons"
    const snapshot = await firebase.collection("persons").get();

    //go through and make an array of the data from the firestore collection documents
    snapshot.forEach(
      (doc) => {
        output.push(
          {
//          params: {
            id: doc.id,
            name: doc.data().name
            //}
          }
        );
      }
    );

  } catch (error) {
    console.error(error);
  }
  return output;
}

