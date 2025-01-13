const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 300;

function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random();
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    
    this.update = function () {
        this.opacity += this.speed;
        if (this.opacity >= 1 || this.opacity <= 0.2) {
            this.speed *= -1;
        }
    };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    };
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function drawGalaxyCore() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 300);
    
    gradient.addColorStop(0, 'rgba(255, 180, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 300, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGalaxyCore();

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
