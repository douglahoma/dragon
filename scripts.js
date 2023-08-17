

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


if ( document.URL.includes("product.html") ){
    console.log("Hey product page, nice");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const docRef = db.collection('products').doc(`${id}`);

    docRef.get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            console.log(`name is ${data.name} and description is ${data.description}`);
            document.getElementById("productheader").innerHTML = `${data.name}`;
            document.getElementById("productdescription").innerHTML = `${data.description}`;
            document.getElementById("productprice").innerHTML =`${data.price}`;
            document.getElementById("image1").src=`${data.img1}`;
            if (data.img2) {
                document.getElementById("image2").src = `${data.img2}`;
            }
            if (data.img3) {
                document.getElementById("image3").src = `${data.img3}`;
            }
            if (data.img4) {
                document.getElementById("image4").src = `${data.img4}`;
            }
            if (data.img5) {
                document.getElementById("image5").src = `${data.img5}`;
            }
            if (data.img6) {
                document.getElementById("image6").src = `${data.img6}`;
            }

        } else {
            console.log("no document found in the database :(");
        }
    })
    
}