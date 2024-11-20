BEGIN

// Initialize the product data
products = [
    {id: 1, name: "Dark Red Linen Full Sleeves Shirt", image: "./imgs/img1.webp", price: 500},
    {id: 2, name: "Moomaya Printed Tops For Women, Long Sleeve, Semi-Formal Top", image: "./imgs/image2.jpeg", price: 300},
    {id: 3, name: "Black Top With Drawstring On Side Slits", image: "./imgs/image3.jpeg", price: 400}
]

// Initialize the cart from localStorage or as an empty array
cart = getCartFromLocalStorage()

// Function to update the cart count displayed in the header
FUNCTION updateCartCount():
    cartCount = 0
    FOR EACH item IN cart:
        cartCount = cartCount + item.quantity
    SET cart-count text to cartCount

// Function to save the cart to localStorage
FUNCTION saveCartToLocalStorage():
    STORE cart in localStorage as "cart"

// Function to add a product to the cart
FUNCTION addToCart(productId):
    product = findProductById(productId)
    IF product EXISTS:
        existingProduct = findProductInCart(productId)
        IF existingProduct EXISTS:
            existingProduct.quantity = existingProduct.quantity + 1
        ELSE:
            product.quantity = 1
            ADD product to cart
    updateCartCount()
    saveCartToLocalStorage()

// Function to display the product list on the page
FUNCTION createProductList():
    FOR EACH product IN products:
        CREATE product card with:
            - Image (product.image)
            - Name (product.name)
            - Price (product.price)
            - Add to Cart Button (which calls addToCart when clicked)
        ADD product card to product container

// Function to handle cart page visibility
FUNCTION displayCart():
    cartList.innerHTML = ""
    IF cart IS EMPTY:
        cartList.innerHTML = "Your cart is empty."
    ELSE:
        FOR EACH item IN cart:
            CREATE cart item with:
                - Product Image
                - Product Name
                - Quantity
                - Price
                - Remove Button (which calls removeFromCart when clicked)
            ADD cart item to cart list

// Function to remove a product from the cart
FUNCTION removeFromCart(productId):
    REMOVE item with productId from cart
    updateCartCount()
    saveCartToLocalStorage()
    displayCart()

// Function to handle price filter functionality
FUNCTION filterCartByPrice(maxPrice):
    filteredCart = FILTER cart WHERE (item.price * item.quantity) <= maxPrice
    IF filteredCart IS EMPTY:
        cartList.innerHTML = "No items match the filter criteria."
    ELSE:
        FOR EACH item IN filteredCart:
            DISPLAY item in cart list with price and quantity

// Event listeners for DOM elements:
- cart-btn: Show cart page when clicked
- close-cart: Hide cart page when clicked
- filter-btn: Filter cart by max price when clicked

// Event listener for the DOMContentLoaded event
FUNCTION onPageLoad():
    createProductList()
    updateCartCount()

END
