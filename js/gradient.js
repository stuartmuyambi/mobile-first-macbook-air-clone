document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.main-header-text h3');
    let lastX = 50;
    let lastY = 50;

    title.addEventListener('mousemove', (e) => {
        if (!title.matches(':hover')) return;
        
        const rect = title.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
        
        lastX = x;
        lastY = y;
        
        // Remove transition during mouse movement
        title.style.transition = 'none';
        title.style.setProperty('--x', `${x}%`);
        title.style.setProperty('--y', `${y}%`);
    });

    title.addEventListener('mouseleave', () => {
        // Re-enable transition for smooth return
        title.style.transition = '--x 2s ease, --y 2s ease';
        
        // Animate back to center from last position
        requestAnimationFrame(() => {
            title.style.setProperty('--x', '50%');
            title.style.setProperty('--y', '50%');
        });
    });
});
