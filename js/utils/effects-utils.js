function createParticles(containerId, count = 100) {
    const container = document.getElementById(containerId);
    if (!container) return; 
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'star absolute rounded-full';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `width: ${size}px; height: ${size}px; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; background: hsl(${Math.random() > 0.7 ? '45' : '0'}, 70%, 80%); animation-delay: ${Math.random() * 3}s;`;
        container.appendChild(particle);
    }
}
