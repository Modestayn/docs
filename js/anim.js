const container = document.getElementById('background-animation');
const particleIcons = ['📚','📄','💡', '🖥️', '⚙️', '🔑', '🌐', '🤖', '✨', '📱', '🖱️', '🎧', '⌨️'];
const particleCount = 30;

for(let i = 0; i < particleCount; i++){
    const p = document.createElement('div');
    p.classList.add('particle');

    const icon = particleIcons[Math.floor(Math.random() * particleIcons.length)];
    p.textContent = icon;

    p.style.left = `${Math.random() * window.innerWidth}px`;
    p.style.top = `${Math.random() * window.innerHeight}px`;

    p.style.fontSize = `${15 + Math.random() * 25}px`;
    p.style.animationDuration = `${10 + Math.random() * 20}s`;
    p.style.animationDelay = `0s`;

    container.appendChild(p);
}
