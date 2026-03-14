// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Liquid Glass Hover Effect - Card Parallax (Optional par badhiya lagega)
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Adds a subtle glow following the cursor on the glass cards
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 50%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))`;
    });
});