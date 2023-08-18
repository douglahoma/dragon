
// Simplified Firestore call for debugging
      // Debugging log

    // Directly use product ID "1" for debugging
    let productId = "1";
      // Debugging log

    try {
        db.collection('products').doc(productId).get().then((doc) => {
            if (doc.exists) {
                console.log("Successfully fetched product data:", doc.data());
            } else {
                console.error("Document not found for product ID:", productId);  // Debugging log
            }
        }).catch(error => {
            console.error("Firestore error:", error.message);  // Debugging log
        });
    } catch (err) {
        console.error("Error during Firestore call:", err);  // Debugging log
    }

// Execute the function immediately to fetch product details
