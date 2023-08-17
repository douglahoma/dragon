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
  
  // Initialize Firestore
  const db = firebase.firestore();
  
  document.addEventListener('DOMContentLoaded', () => {
  
      const cartItemsElement = document.getElementById('cartItems');
  
      // Fetch products from Firestore and display them
      db.collection('products').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              const product = doc.data();
              const listItem = document.createElement('li');
              listItem.className = 'flex flex-col justify-between py-2 border-b mb-4';
              listItem.innerHTML = `
                  <div class="flex justify-between items-center">
                      <span class="font-bold">${product.name}</span>
                      <span>$${(typeof product.price === "number" ? product.price.toFixed(2) : "N/A")}</span>
                  </div>
                  <img src="${product.images && product.images.length > 0 ? product.images[0] : "path/to/default/image.png"}" alt="${product.name}" class="w-32 h-32 object-cover rounded mt-2"> <!-- Displaying the first image -->
                  <div>${product.description || "Description not available."}</div>
                  <div class="mt-2 text-sm text-gray-500">Category: ${product.category || "N/A"}</div>
              `;
              cartItemsElement.appendChild(listItem);
          });
      });
  
      document.getElementById('checkoutButton').addEventListener('click', () => {
          alert('Proceeding to checkout!');
      });
  
  });
  