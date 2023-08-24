// Firebase Configuration
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

// Reference to the 'products' collection
var productsRef = firebase.firestore().collection('products');



// CART STUFF BEGINS NOW
//

// Function to add a product to the local storage cart
function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        // Product already exists in cart, increment quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Product doesn't exist in cart, add it with quantity = 1
        product.quantity = 1;
        cart.push(product);
    }
    saveCartProducts(cart);  // Save the updated cart to localStorage
}

    let cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    


// Function to get products from the local storage cart
function getCartProducts() {
    return JSON.parse(localStorage.getItem('cartProducts')) || [];
}

// When the cart page loads, fetch products from local storage and then retrieve their details from Firestore
if (document.getElementById('cartItems')) {
    
const cartItemsElement = document.getElementById('cartItems');
const cartProducts = getCartProducts();
    const uniqueCartProductIds = [...new Set(cartProducts.map(p => p.id))];
    

for(let i = 0; i < uniqueCartProductIds.length; i++) {
    let productId = cartProducts[i];
    
    db.collection('products').doc(typeof productId === "object" ? productId.id : productId).get().then(doc => {
        if (doc.exists) {
            const product = doc.data();
            product.id = doc.id;  // Ensuring the product has its ID
            renderCartProduct(product);  // Using the previously defined function to render the product with quantity controls
        }
    });
}

            }

document.getElementById('checkoutButton')?.addEventListener('click', () => {
    alert('Proceeding to checkout!');
});

function addProductToCart(productId) {
    db.collection('products').doc(productId).get().then(doc => {
        if (doc.exists) {
            // Add the product to the cart
            const productData = doc.data();
            addToCart({id: doc.id, ...productData});
            alert(productData.name + " has been added to the cart!");
        } else {
            alert("Product not found!");
        }
    }).catch(error => {
        console.error("Error fetching product:", error);
    });
}

function saveCartProducts(cartProducts) {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}
// Function to render cart products
function renderCartProduct(product) {
    const cartItemsElement = document.getElementById('cartItems');
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center my-2';
    
    const productNameSpan = document.createElement('span');
    productNameSpan.className = 'product-name';
    productNameSpan.textContent = product.name;
    
    const quantityControlDiv = document.createElement('div');
    quantityControlDiv.className = 'quantity-control flex items-center';
    
    const minusButton = document.createElement('button');
    minusButton.className = 'minus-btn bg-gray-200 p-2 rounded-l';
    minusButton.textContent = '-';
    minusButton.addEventListener('click', () => adjustQuantity(product, -1));
    
    const input = document.createElement('input');
    input.type = 'number';
    input.value = product.quantity.toString();
    input.min = '1';
    input.className = 'quantity-input w-16 text-center';
    input.setAttribute('data-product-id', product.id);
    input.addEventListener('change', adjustQuantityFromInput);
    
    const plusButton = document.createElement('button');
    plusButton.className = 'plus-btn bg-gray-200 p-2 rounded-r';
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => adjustQuantity(product, 1));
    
    quantityControlDiv.appendChild(minusButton);
    quantityControlDiv.appendChild(input);
    quantityControlDiv.appendChild(plusButton);
    
    li.appendChild(productNameSpan);
    li.appendChild(quantityControlDiv);
    
    cartItemsElement.appendChild(li);
}

// Function to adjust quantity using Plus and Minus buttons
function adjustQuantity(product, adjustment) {
    const inputElement = document.querySelector(`.quantity-input[data-product-id="${product.id}"]`);
    let newQuantity = parseInt(inputElement.value) + adjustment;
    newQuantity = Math.max(newQuantity, 1);  // Ensure quantity is at least 1
    inputElement.value = newQuantity;
    inputElement.dispatchEvent(new Event('change'));
}

// Function to handle manual input in the quantity text box
function adjustQuantityFromInput(e) {
    const productId = e.target.getAttribute('data-product-id');
    const newQuantity = parseInt(e.target.value);

    // Find product in the cart and update its quantity
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity = newQuantity;
        saveCartProducts(cart);  // Save the updated cart to localStorage
    }
}

// When the cart page loads, fetch products from local storage and then render them using renderCartProduct function
if (document.getElementById('cartItems')) {
    const cartProducts = getCartProducts();
    cartProducts.forEach(product => renderCartProduct(product));
}
//
// end cart stuff
//
//
//






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
            // Fourthly, we'll configure the add to cart button:
            document.getElementById("productaddbutton").addEventListener("click", function() {
                addProductToCart(`${id}`);
            });
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



// COLLECTION CODE: querying and displaying products from the DB


// cardMaker function 
function cardMaker(product) {
    const linky = document.createElement('a');
    linky.href = `product.html?id=${product.item}`;
    // add a style (i.e., category -- normal, patterned, subtle (shirt), decor, pillow (home)) for later filtering
    linky.classList.add(`style-${product.style}`);
    // Create the main product card container
    const card = document.createElement('div');
    card.className = 'product-card p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer w-full max-w-sm mx-auto';
    // Create the aspect ratio container and image
    const aspectRatioContainer = document.createElement('div');
    aspectRatioContainer.className = 'aspect-ratio-container relative pb-[80%]';
  
    const img = document.createElement('img');
    img.className = 'absolute top-0 left-0 w-full h-full object-cover rounded-t-lg';
    img.src = product.img1; // the old man shirt
    img.alt = 'Product Image';
  
    aspectRatioContainer.appendChild(img);
    card.appendChild(aspectRatioContainer);
  
    // Create the details container
    const details = document.createElement('div');
    details.className = 'p-4';
  
    const name = document.createElement('h3');
    name.className = 'text-lg font-semibold mb-2';
    name.textContent = product.name;
  
    const category = document.createElement('p');
    category.className = 'text-sm text-gray-500';
    category.textContent = product.category;
  
    const price = document.createElement('p');
    price.className = 'text-md font-bold';
    price.textContent = `$${product.price}`;
  
    details.appendChild(name);
    details.appendChild(category);
    details.appendChild(price);
    card.appendChild(details);
  
    // Create the overlay with description
    const overlay = document.createElement('div');
    console.log("overlay created");
    overlay.className = 'overlay bg-black bg-opacity-50 text-white p-4 absolute top-0 left-0 w-full h-full hidden group-hover:block';
  
    const description = document.createElement('p');
    description.className = 'text-center';
    description.textContent = product.description;
  
    overlay.appendChild(description);
    card.appendChild(overlay);
    // put the card in the link
    linky.appendChild(card);
  
    // Append the card to the container
    document.getElementById('collectionResults').appendChild(linky);
  }




// NOW WE CHECK TO SEE IF WE ARE ON THE COLLECTION PAGE

if ( document.URL.includes("collection.html") ) {
    console.log("collections are cool");
    const urlParams = new URLSearchParams(window.location.search);
    if ( urlParams.has("category") ) {
    const categoryToGet = urlParams.get('category');
    console.log("Category to get:", categoryToGet);
    document.getElementById("collectionName").innerHTML = `${categoryToGet}`;
    // db.collection("products").where("category", "==", categoryToGet).get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log("hey");
    //         const stuff = doc.data();
    //         console.log(`${stuff.img2}`);
    //     })
    // });
    db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let productInfo = doc.data();
            if (productInfo.category == categoryToGet) {
                cardMaker(productInfo);
        };
      });
})} else {
    db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let productInfo = doc.data();
            cardMaker(productInfo);
        }
      );
})
}}

// // make an object to keep track of hidden-ness
// const styleState = {
//     patterned: true,
//     normal: true,
//     subtle: true,
// }

// function filterCards(style) {
//     // first we toggle the state object that keeps track of what is shown:
//     styleState[style] = !styleState[style];
//     // then we grab the cards on the page
//     const thisStyleCardsOnPage = document.querySelectorAll(`.style-${style}`);
//     thisStyleCardsOnPage.forEach(cardOfThisStyle => {
//         if (!styleState[style]) {
//             cardOfThisStyle.classList.remove('hidden');
//           } else {
//             cardOfThisStyle.classList.add('hidden');
//           }
//     });
// }

// function toggleButton(button) {
//     if (button.classList.contains('bg-green-400')) {
//       button.classList.remove('bg-green-400', 'text-white');
//       button.classList.add('bg-gray-300', 'text-gray-700');
//     } else {
//       button.classList.remove('bg-gray-300', 'text-gray-700');
//       button.classList.add('bg-green-400', 'text-white');
//     }
//   }
  

// document.getElementById("togglePatterned").addEventListener("click", function() {
//     filterCards("patterned");
// });
// document.getElementById("toggleSubtle").addEventListener("click", function() {
//     filterCards("subtle");
// });
// document.getElementById("toggleNormal").addEventListener("click", function() {
//     filterCards("normal");
// });

// function toggleButtonAndFilter(button, style) {
//     toggleButton(button);
//     filterCards(style);
//   }





  const styleState = {
    patterned: true,
    normal: true,
    subtle: true,
};

function toggleButtonAndFilter(button, style) {
    // Toggle the visual appearance of the button first
    toggleButton(button);
    // Then filter the cards based on the new state of the button
    filterCards(style);
}

function toggleButton(button) {
    // Check if the button is in the active state (green background)
    if (button.classList.contains('bg-green-400')) {
        // If active, change to the inactive state (gray background and dark text)
        button.classList.remove('bg-green-400', 'text-white');
        button.classList.add('bg-gray-300', 'text-gray-700');
    } else {
        // If inactive, change to the active state (green background and white text)
        button.classList.remove('bg-gray-300', 'text-gray-700');
        button.classList.add('bg-green-400', 'text-white');
    }
}

function filterCards(style) {
    // Toggle the state object that keeps track of what is shown:
    styleState[style] = !styleState[style];
    // Then grab the cards on the page
    const thisStyleCardsOnPage = document.querySelectorAll(`.style-${style}`);
    thisStyleCardsOnPage.forEach(cardOfThisStyle => {
        if (styleState[style]) {
            cardOfThisStyle.classList.remove('hidden');
        } else {
            cardOfThisStyle.classList.add('hidden');
        }
    });
}
