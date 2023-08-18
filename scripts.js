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
    
    
for(let i = 0; i < cartProducts.length; i++) {
    let productId = cartProducts[i];
    
        db.collection('products').doc(typeof productId === "object" ? productId.id : productId).get().then(doc => {
            if (doc.exists) {
                const product = doc.data();
                const listItem = document.createElement('li');
                listItem.className = 'flex flex-col justify-between py-2 border-b mb-4';
                listItem.innerHTML = `
                    <div class="flex justify-between items-center">
                        <span class="font-bold">${product.name}</span>
                        <span>$${(typeof product.price === "number" ? product.price.toFixed(2) : "N/A")}</span>
                    </div>
                    <img src="${product.images && product.images.length > 0 ? product.images[0] : "path/to/default/image.png"}" alt="${product.name}" class="w-32 h-32 object-cover rounded mt-2">
                    <div>${product.description || "Description not available."}</div>
                    <div class="mt-2 text-sm text-gray-500">Category: ${product.category || "N/A"}</div>
                `;
                cartItemsElement.appendChild(listItem);
            }
        });
    };
}

document.getElementById('checkoutButton')?.addEventListener('click', () => {
    alert('Proceeding to checkout!');
});

// Add event listener to the "Add to Cart" button
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('addRandomProduct');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            console.log('Product added to cart:', mockProduct.name);
            
            // Add product to localStorage
            let cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
            cart.push(mockProduct);
            localStorage.setItem('cartProducts', JSON.stringify(cart));
        });
    }
});



function displayCartProducts() {

    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cartProducts')) || [];

    // Find the container in the HTML to display the cart items
    const cartContainer = document.getElementById('cartItems');
    
    if (cartContainer) {
        // Clear the container
        cartContainer.innerHTML = '';

        // Display each product in the cart
        cart.forEach(product => {
            db.collection('products').doc(productId.id).get().then((doc) => {
                if (doc.exists) {
                    let productDetails = doc.data();
                    let productElem = document.createElement('li');
                    productElem.className = 'cart-item';
                    productElem.innerHTML = `
                        <h3>${productDetails.name}</h3>
                        <p>Price: ${productDetails.price}</p>
                    `;
                    cartContainer.appendChild(productElem);
                }
            });
        });
    } else {
    }
}

// Function to display cart products in the cart.html page
function displayCartProductsInUI() {
    const cartItemsContainer = document.getElementById('cartItems');
if (!cartItemsContainer) return;
    const cartProducts = getCartProducts();  // Fetch cart products from localStorage
    
    // Clear previous items
    cartItemsContainer.innerHTML = '';
    
    for (let product of cartProducts) {
        const productElem = document.createElement('li');
        productElem.className = 'cart-item p-4 border rounded';
        
        // Populate the product details. You can customize this template as per your design needs.
        productElem.innerHTML = `
            
<h3>${product.name} (Quantity: ${product.quantity})</h3>

            <p>Price: ${product.price}</p>
        `;
        
        // Append the product element to the cartItems container
        cartItemsContainer.appendChild(productElem);
    }
}

// Call the function to display cart products when the cart.html page loads
document.addEventListener('DOMContentLoaded', displayCartProductsInUI);

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