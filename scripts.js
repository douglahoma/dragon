console.log('scripts.js loaded!');
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

// Add random product to the cart when the button is clicked
document.getElementById('addRandomProduct')?.addEventListener('click', () => {
    const productIds = ["09lilpgzmQujV3WtOAYv", "IRndB8aRCHq5pyuZNwfz", "LXVdlFQnEtA7xL4QcijW", "SmJsdOB1j0OCL31HKbO8", "brG8Pwy8qV1tZ0O72gHE", "eL6mkHMxLDbC4mq1VdSz", "nph2cGaWZzrfp9bm7Kf5", "wx1xrS0cMs6CyUccuSqM"];
    const randomProductId = productIds[Math.floor(Math.random() * productIds.length)];
    addToCart(randomProductId);
    console.log('Random product added to the cart!');
    alert('Random product added to the cart!');
});

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


let mockProduct = {
    id: "12345",
    name: "Dragon Shirt",
    price: "$19.99"
};

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
    console.log("displayCartProducts function called.");  // Debugging log

    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    console.log("Cart from localStorage:", cart);  // Debugging log

    // Find the container in the HTML to display the cart items
    const cartContainer = document.getElementById('cartItems');
    
    if (cartContainer) {
        console.log("cartItems container found.");  // Debugging log
        // Clear the container
        cartContainer.innerHTML = '';

        // Display each product in the cart
        cart.forEach(product => {
            console.log("Fetching product with ID:", productId.id);  // Debugging log
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
        console.log("cartItems container not found.");  // Debugging log
    }
}

// Function to display cart products in the DragonDresserCart.html page
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

// Call the function to display cart products when the DragonDresserCart.html page loads
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
