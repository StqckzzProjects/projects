let isSignedIn = false;  // Placeholder for user authentication state
let cart = [];

function signIn() {
    isSignedIn = true;
    updateAuthStatus();
}

function signOut() {
    isSignedIn = false;
    updateAuthStatus();
}

function addToCart(productName, price) {
    if (!isSignedIn) {
        alert("You must be signed in to add items to the cart.");
        window.location.href = 'signin.html';
    } else {
        cart.push({ productName, price });
        alert(`${productName} has been added to your cart.`);
        updateCartDisplay();
    }
}

function updateAuthStatus() {
    const signinLink = document.getElementById('signin-link');
    const authStatus = document.getElementById('auth-status');

    if (isSignedIn) {
        signinLink.innerText = 'Sign Out';
        signinLink.onclick = signOut;
        authStatus.innerText = 'Logged in as: User';
    } else {
        signinLink.innerText = 'Sign In';
        signinLink.onclick = () => window.location.href = 'signin.html';
        authStatus.innerText = 'Not logged in';
    }
}

function updateCartDisplay() {
    let cartItems = document.getElementById('cart-items');
    let checkoutButton = document.getElementById('checkout-button');
}

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    }