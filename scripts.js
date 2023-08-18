

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
        // first we'll make sure the doc is there!
        if (doc.exists) {
            // next we'll make a reference to the data object:
            const data = doc.data();
            // and next log it to the console for fun:
            console.log(`name is ${data.name} and description is ${data.description}`);
            // NOW WE START UPDATING THE PRODCT PAGE, yee-haw!
            // First, the product name goes into main header:
            document.getElementById("productheader").innerHTML = `${data.name}`;
            // Now let's give it a description so nobody rushes to conclusions:
            document.getElementById("productdescription").innerHTML = `${data.description}`;
            // Thirdly, the most important thing: the price! (a number)
            document.getElementById("productprice").innerHTML =`${data.price}`;
            // And, since each product has at least one image, we can definitely safely populate "image1", our main image
            document.getElementById("image1").src=`${data.img1}`;
            // Next we will check for some more images! Shirts have 6, and they are as such:
            // img1 : an old man who is young at heart
            // img2 : a cool guy indoors with a dragon wall
            // img3 : a millenial hiker with a beard
            // img4 : a kind-looking lady
            // img5 : a really cool hip guy with a jacket
            // img6 : a sideways-oriented cool young dude
            //
            // re: home goods, some products (like pillows and mugs!) only have a main image, img1, 
            // while others (like art and boxes!) have 3.
            // In conclusion, it can vary! So we are careful to check.
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
            location.replace('404.html');
        }
    })
    
}