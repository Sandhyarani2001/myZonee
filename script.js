// Initialize the cart and product data
const products = [
    { id: 1, name: "Dark Red Linen Full Sleeves Shirt", image: "./imgs/img1.webp", price: 500 },
    { id: 2, name: "Moomaya Printed Tops For Women, Long Sleeve, Semi-Formal Top", image: "./imgs/image2.jpeg", price: 300 },
    { id: 3, name: "Black Top With Drawstring On Side Slits", image: "./imgs/image3.jpeg", price: 400 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage or use an empty array


const addToCart = (productId) => {
    const product = products.find((item) => item.id === productId);

    if (!product) return; 

    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++; // Increase quantity
    } else {
        product.quantity = 1; // Initialize quantity for the new product
        cart.push(product);
    }

    updateCartCount();
    saveCartToLocalStorage(); // Save the cart to localStorage
    displayCart(); // Update the cart display
};

// Update Cart Count
const updateCartCount = () => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
};

// Save cart to localStorage
const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Create Product List on Page
const createProductList = () => {
    const productContainer = document.getElementById("products");
    productContainer.style.display = "flex";
    productContainer.style.flexWrap = "wrap";
    productContainer.style.gap = "20px";
    productContainer.style.justifyContent = "center";
    productContainer.style.padding = "20px";

    products.forEach((product) => {
        // Create a card for each product
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.style.width = "300px";
        productCard.style.border = "1px solid #ddd";
        productCard.style.borderRadius = "10px";
        productCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        productCard.style.overflow = "hidden";
        productCard.style.backgroundColor = "#fff";
        productCard.style.textAlign = "center";
        productCard.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

        productCard.onmouseover = () => {
            productCard.style.transform = "translateY(-5px)";
            productCard.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
        };
        productCard.onmouseleave = () => {
            productCard.style.transform = "none";
            productCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        };

        // Add product image
        const productImage = document.createElement("img");
        productImage.src = product.image; // Use the image from the product object
        productImage.alt = product.name;
        productImage.style.width = "100%";
        productImage.style.height = "300px";
        productImage.style.objectFit = "cover";

        // Add product name
        const productName = document.createElement("h4");
        productName.textContent = product.name;
        productName.style.margin = "15px 0 10px";
        productName.style.color = "#333";

        // Add product price
        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;
        productPrice.style.margin = "0 0 15px";
        productPrice.style.color = "#666";
        productPrice.style.fontSize = "18px";

        // Add "Add to Cart" button
        const addButton = document.createElement("button");
        addButton.textContent = "Add to Cart";
        addButton.style.backgroundColor = "#6a11cb";
        addButton.style.color = "#fff";
        addButton.style.border = "none";
        addButton.style.padding = "10px 15px";
        addButton.style.fontSize = "16px";
        addButton.style.fontWeight = "bold";
        addButton.style.cursor = "pointer";
        addButton.style.borderRadius = "5px";
        addButton.style.marginBottom = "15px";
        addButton.style.transition = "background-color 0.3s ease";
        addButton.onmouseover = () => {
            addButton.style.backgroundColor = "#4e0da5";
        };
        addButton.onmouseleave = () => {
            addButton.style.backgroundColor = "#6a11cb";
        };
        addButton.addEventListener("click", () => addToCart(product.id));

        // Append elements to the product card
        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(addButton);

        // Append the product card to the container
        productContainer.appendChild(productCard);
    });
};

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    createProductList(); // Create the product list when page loads
    updateCartCount(); // Update cart count on page load
});

// --------------------------------------
// Cart Page functionality
const cartPage = document.getElementById("cart-page");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartList = document.getElementById("cart-list");
const filterPriceInput = document.getElementById("filter-price");
const filterBtn = document.getElementById("filter-btn");

// Show Cart Page
cartBtn.addEventListener("click", () => {
    displayCart();
    cartPage.classList.remove("hidden");
    cartPage.classList.add("show");
});

// Close Cart Page
closeCartBtn.addEventListener("click", () => {
    cartPage.classList.remove("show");
    cartPage.classList.add("hidden");
});

// Remove from Cart
const removeFromCart = (productId) => {
    cart = cart.filter((item) => item.id !== productId);
    saveCartToLocalStorage(); // Save the updated cart to localStorage
    displayCart(); // Update the cart display
    updateCartCount(); // Update the cart count
};

// Display Cart Items
const displayCart = () => {
    cartList.innerHTML = ""; // Clear previous items

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.style.display = "flex";

        if (window.innerWidth <= 768) {
            cartItem.style.width = "100%"; // Mobile view
            cartItem.style.flexDirection = "column"; // Stack items vertically
            cartItem.style.alignItems = "flex-start";
            
        } else {
            cartItem.style.width = "800px"; // Desktop view
            cartItem.style.flexDirection = "row";
            cartItem.style.alignItems = "center";
        }

        // cartItem.style.width = "800px";
        cartItem.style.justifyContent = "space-between";
        cartItem.style.alignItems = "center";
        cartItem.style.padding = "10px";
        cartItem.style.borderBottom = "5px solid #ddd";

         // Add image element
         const productImage = document.createElement("img");
         productImage.src = item.image; // Image path from cart item
         productImage.alt = item.name;
         productImage.style.width = "50px";
         productImage.style.height = "50px";
         productImage.style.objectFit = "cover";
         productImage.style.marginRight = "10px";


         cartItem.innerHTML = `
         <div style="display: flex; align-items: center;">
             ${productImage.outerHTML} <!-- Display the image -->
             <p>${item.name} (${item.quantity})</p>
         </div>
         <p>$${(item.price * item.quantity).toFixed(2)}</p>
         <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
     `;

        // Style the remove button
        const removeBtn = cartItem.querySelector(".remove-btn");
        removeBtn.style.backgroundColor = "#ff4d4d";
        removeBtn.style.color = "#fff";
        removeBtn.style.border = "none";
        removeBtn.style.padding = "8px 12px";
        removeBtn.style.fontSize = "14px";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.borderRadius = "5px";
        removeBtn.style.transition = "background-color 0.3s ease";

        removeBtn.onmouseover = () => {
            removeBtn.style.backgroundColor = "#e63946";
        };
        removeBtn.onmouseleave = () => {
            removeBtn.style.backgroundColor = "#ff4d4d";
        };

        cartList.appendChild(cartItem);
    });
};

// Filter Cart Items by Price
filterBtn.addEventListener("click", () => {
    const maxPrice = parseFloat(filterPriceInput.value);

    if (isNaN(maxPrice)) {
        alert("Please enter a valid number for max price.");
        return;
    }

    const filteredCart = cart.filter((item) => item.price * item.quantity <= maxPrice);
    cartList.innerHTML = ""; // Clear previous items

    if (filteredCart.length === 0) {
        cartList.innerHTML = "<p>No items match the filter criteria.</p>";
        return;
    }

    filteredCart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <p>${item.name} (${item.quantity})</p>
            <p>$${item.price * item.quantity}</p>
        `;

        cartList.appendChild(cartItem);
    });
});
