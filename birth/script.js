// Show Celebration Section
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('celebration').classList.remove('hidden');
    startConfetti();
  });
  
  // Confetti Effect
  function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const confetti = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 1,
      d: Math.random() * 6 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    }
  
    function update() {
      confetti.forEach(p => {
        p.y += p.d;
        if (p.y > canvas.height) p.y = -p.r;
      });
    }
  
    function loop() {
      draw();
      update();
      requestAnimationFrame(loop);
    }
  
    loop();
  }
  
  // Gift Opening
  function openGift() {
    document.getElementById('giftBox').style.display = 'none';
    document.getElementById('giftMessage').classList.remove('hidden');
  }
  