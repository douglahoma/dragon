

const firebaseConfig = {
  apiKey: "AIzaSyBopnQ3CXsyJKbpWmOfXnTMERtb9icIEzs",
  authDomain: "holbertont3webapp.firebaseapp.com",
  projectId: "holbertont3webapp",
  storageBucket: "holbertont3webapp.appspot.com",
  messagingSenderId: "418817488381",
  appId: "1:418817488381:web:55575f6d63231118e79594",
  measurementId: "G-LKN9DB8F2N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the 'products' collection
var productsRef = firebase.firestore().collection('products');

// Fetch all documents from the 'products' collection
productsRef.get().then((querySnapshot) => {
    // Loop through each document in the snapshot
    querySnapshot.forEach((doc) => {
        // Get the 'description' property of the document
        var description = doc.data().description;
        
        // Console log the 'description'
        console.log(description);
    });
}).catch((error) => {
    console.error("Error fetching documents: ", error);
});






