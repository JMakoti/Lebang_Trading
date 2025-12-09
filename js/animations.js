// Scroll Animations
function initScrollAnimations() {
    // Animate hero content on home page
    if (document.querySelector('.hero')) {
        const heroTitle = document.querySelector('.hero h1');
        const heroTagline = document.querySelector('.hero .tagline');
        const heroText = document.querySelector('.hero p');
        const heroButtons = document.querySelector('.hero-buttons');
        
        setTimeout(() => {
            if (heroTitle) heroTitle.classList.add('animate');
        }, 300);
        
        setTimeout(() => {
            if (heroTagline) heroTagline.classList.add('animate');
        }, 500);
        
        setTimeout(() => {
            if (heroText) heroText.classList.add('animate');
        }, 700);
        
        setTimeout(() => {
            if (heroButtons) heroButtons.classList.add('animate');
        }, 900);
    }
    
    // Observe elements for animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe value items
    document.querySelectorAll('.value-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe partner logos
    document.querySelectorAll('.partner-logo').forEach(logo => {
        observer.observe(logo);
    });
    
    // Observe CTA section
    document.querySelectorAll('.cta').forEach(cta => {
        observer.observe(cta);
    });
    
    // Observe service details
    document.querySelectorAll('.service-details').forEach(detail => {
        observer.observe(detail);
    });
    
    // Observe contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe map container
    document.querySelectorAll('.map-container').forEach(map => {
        observer.observe(map);
    });
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initScrollAnimations };
}