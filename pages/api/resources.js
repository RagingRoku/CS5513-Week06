// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import firebase library
import firebase from '../../lib/firebase';

//export asynch default api function (so we can use await)
export default async function handler(req, res) {
 // use another try/catch in case an error happens
 try{
   //asking firestore DB to get all documents
   const snapshot = await firebase.collection("resources").get();

   //go through each document in array passed to snapshot
   let output = [];

   snapshot.forEach(
     //doc represents a document
     (doc) => {
       output.push(
         {
           id: doc.id,
           data: doc.data()

         }
       );
     }
   );
  console.log(output);

  //return the new object value with all the firestore data
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json( {output} );

 } catch(error){
   //if there's an error, show in Node console
   console.error(error);
   //send 500 status as well as text from error
   res.status(500).end(error.message);
 }
}
