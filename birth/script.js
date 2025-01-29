const canvas = document.getElementById("effectCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let balloons = [];
let interval;

// Particle for fireworks and sparkles
function createParticle(x, y, color) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x,
            y,
            size: Math.random() * 4 + 1,
            color,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            life: 100,
        });
    }
}

// Balloon object
function createBalloon(x, y, color) {
    balloons.push({
        x,
        y,
        width: 30,
        height: 50,
        color,
        speedY: Math.random() * 2 + 1,
        sway: Math.random() * 2 - 1,
    });
}

// Update and draw particles
function updateParticles() {
    particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 2;
        if (p.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

function drawParticles() {
    particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}

// Update and draw balloons
function updateBalloons() {
    balloons.forEach((balloon, index) => {
        balloon.y -= balloon.speedY;
        balloon.x += balloon.sway;
        if (balloon.y + balloon.height < 0) {
            balloons.splice(index, 1);
        }
    });
}

function drawBalloons() {
    balloons.forEach((balloon) => {
        // Balloon body
        ctx.beginPath();
        ctx.ellipse(
            balloon.x,
            balloon.y,
            balloon.width / 2,
            balloon.height / 2,
            0,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = balloon.color;
        ctx.fill();
        ctx.closePath();

        // String
        ctx.beginPath();
        ctx.moveTo(balloon.x, balloon.y + balloon.height / 2);
        ctx.lineTo(balloon.x, balloon.y + balloon.height + 20);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    });
}

// Fireworks animation
function startFireworks() {
    clearInterval(interval);
    interval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const colors = ["#ff6f61", "#ffd700", "#00bfff", "#adff2f", "#ff1493"];
        createParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }, 100);
}

// Balloons animation
function releaseBalloons() {
    clearInterval(interval);
    interval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 50;
        const colors = ["#ff6f61", "#ffd700", "#00bfff", "#adff2f", "#ff1493"];
        createBalloon(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }, 200);
}

// Sparkles animation
function sparkleEffect() {
    clearInterval(interval);
    interval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createParticle(x, y, "#ffffff");
    }, 100);
}

// Play background music
function playSong() {
    const song = document.getElementById("birthdaySong");
    song.play();
}

// Main loop to animate everything
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    drawParticles();
    updateBalloons();
    drawBalloons();
    requestAnimationFrame(loop);
}

loop();
