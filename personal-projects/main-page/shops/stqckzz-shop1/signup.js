let isSignedIn = false;
let cart = [];
let users = []; // Array to store user accounts
let currentUser = null; // Stores the currently logged-in user

// Function to simulate user authentication
function authenticateUser(email, password) {
    return users.find(user => user.email === email && user.password === password);
}

// Handle sign in
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    currentUser = authenticateUser(email, password);
    if (currentUser) {
        isSignedIn = true;
        alert("Sign in successful!");
        window.location.href = 'index.html';
    } else {
        document.getElementById('signin-message').innerText = 'Invalid email or password';
    }
    updateAuthStatus();
}

// Handle sign up
function handleSignUp(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Check if the email is already registered
    if (users.some(user => user.email === email)) {
        document.getElementById('signup-message').innerText = 'Email is already registered';
    } else {
        // Register the new user with a default profile picture
        const profilePic = 'images/default-profile.png'; // Default profile picture
        users.push({ email, password, profilePic });
        alert("Account created successfully!");
        window.location.href = 'signin.html';
    }
}

// Handle sign out
function signOut() {
    isSignedIn = false;
    currentUser = null;
    updateAuthStatus();
}

// Update authentication status in the UI
function updateAuthStatus() {
    const signinLink = document.getElementById('signin-link');
    const authStatus = document.getElementById('auth-status');
    const profilePicContainer = document.getElementById('profile-pic');

    if (isSignedIn && currentUser) {
        signinLink.innerText = 'Sign Out';
        signinLink.onclick = signOut;
        if (authStatus) authStatus.innerText = `Logged in as: ${currentUser.email}`;
        if (profilePicContainer) profilePicContainer.src = currentUser.profilePic;
    } else {
        signinLink.innerText = 'Sign In';
        signinLink.onclick = () => window.location.href = 'signin.html';
        if (authStatus) authStatus.innerText = 'Not logged in';
        if (profilePicContainer) profilePicContainer.src = '';
    }
}

// Event listeners for sign-in and sign-up forms
document.getElementById('signin-form')?.addEventListener('submit', handleSignIn);
document.getElementById('signup-form')?.addEventListener('submit', handleSignUp);

// Initialize the page with the current auth status
window.onload = () => {
    updateAuthStatus();
};
