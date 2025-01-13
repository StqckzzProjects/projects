// Add stars and spaceships to the page
function createParticles() {
    // Create stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        document.body.appendChild(star);
        
        // Randomize position and size
        const size = Math.random() * 3 + 1;
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${xPos}px`;
        star.style.top = `${yPos}px`;
    }

    // Create moving spaceships
    for (let i = 0; i < 3; i++) { // Add 3 spaceships for the effect
        const ship = document.createElement('div');
        ship.classList.add('ship');
        document.body.appendChild(ship);

        // Randomize position
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight;

        ship.style.left = `${xPos}px`;
        ship.style.top = `${yPos}px`;
    }
}

// Call the function to generate particles when the page loads
window.onload = createParticles;
