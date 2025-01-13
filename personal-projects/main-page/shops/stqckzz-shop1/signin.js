let isSignedIn = false;  // Placeholder for user authentication state
let cart = [];

// Dummy user data for simulation
const dummyUser = {
    email: "user@example.com",
    password: "password123"
};

function signIn() {
    isSignedIn = true;
    updateAuthStatus();
}

function signOut() {
    isSignedIn = false;
    updateAuthStatus();
}

function authenticateUser(email, password) {
    // In a real application, authentication would be done via a server
    return email === dummyUser.email && password === dummyUser.password;
}

function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(email, password)) {
        signIn();
        alert("Sign in successful!");
        window.location.href = 'index.html';  // Redirect to the homepage or another page
    } else {
        document.getElementById('signin-message').innerText = 'Invalid email or password';
    }
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
        if (authStatus) authStatus.innerText = 'Logged in as: User';
    } else {
        signinLink.innerText = 'Sign In';
        signinLink.onclick = () => window.location.href = 'signin.html';
        if (authStatus) authStatus.innerText = 'Not logged in';
    }
}

function updateCartDisplay() {
    let cartItems = document.getElementById('cart-items');
    let checkoutButton = document.getElementById('checkout-button');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        checkoutButton.disabled = true;
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            cartItems.innerHTML += `<p>${item.productName} - $${item.price}</p>`;
        });
        checkoutButton.disabled = false;
    }
}

// Add event listener for the sign-in form
const signinForm = document.getElementById('signin-form');
if (signinForm) {
    signinForm.addEventListener('submit', handleSignIn);
}

// Initialize the page with the current auth status
window.onload = () => {
    updateAuthStatus();
    updateCartDisplay();
};
