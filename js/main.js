// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
                mainNav.classList.remove('show');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Testimonial slider (for home page)
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (testimonialItems.length > 0 && prevBtn && nextBtn) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });
            
            setTimeout(() => {
                testimonialItems[index].classList.add('active');
            }, 50);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentTestimonial--;
                if (currentTestimonial < 0) {
                    currentTestimonial = testimonialItems.length - 1;
                }
                showTestimonial(currentTestimonial);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentTestimonial++;
                if (currentTestimonial >= testimonialItems.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            });
        }
        
        // Auto-rotate testimonials
        setInterval(function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonialItems.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize animations
    setTimeout(initScrollAnimations, 500);
    
    // Add animation to stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate numbers
        function animateNumbers() {
            statNumbers.forEach(statNumber => {
                if (isInViewport(statNumber) && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    const finalValue = statNumber.textContent;
                    let currentValue = 0;
                    
                    // Remove non-numeric characters for counting
                    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
                    const isPercentage = finalValue.includes('%');
                    const suffix = finalValue.replace(/[0-9.]/g, '');
                    
                    const duration = 2000; // 2 seconds
                    const increment = numericValue / (duration / 16); // 60fps
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(timer);
                        }
                        
                        if (isPercentage) {
                            statNumber.textContent = Math.floor(currentValue) + '%';
                        } else if (suffix === '/5') {
                            statNumber.textContent = currentValue.toFixed(1) + suffix;
                        } else {
                            statNumber.textContent = Math.floor(currentValue) + suffix;
                        }
                    }, 16);
                }
            });
        }
        
        // Trigger animation when stats come into view
        window.addEventListener('scroll', animateNumbers);
        
        // Trigger on page load if already in view
        setTimeout(animateNumbers, 500);
        
        // Add hover effects to cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset to original transform based on card position
                const index = Array.from(statCards).indexOf(this);
                const transforms = ['translateX(-10px)', 'translateX(5px)', 'translateX(-5px)', 'translateX(10px)'];
                this.style.transform = transforms[index] || 'none';
            });
        });
    }
});

// Function to initialize scroll animations (if not defined elsewhere)
function initScrollAnimations() {
    // Your scroll animation initialization code here
    console.log('Scroll animations initialized');
}