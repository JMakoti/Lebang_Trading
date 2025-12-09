// Hero Image Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselIndicators = document.querySelectorAll('.carousel-indicator');
    const carouselPrevBtn = document.querySelector('.carousel-prev');
    const carouselNextBtn = document.querySelector('.carousel-next');
    
    if (carouselSlides.length === 0) return;
    
    let currentSlide = 0;
    let carouselInterval;
    
    function showSlide(index) {
        // Hide all slides
        carouselSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        carouselIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show current slide and activate indicator
        carouselSlides[index].classList.add('active');
        if (carouselIndicators[index]) {
            carouselIndicators[index].classList.add('active');
        }
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= carouselSlides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = carouselSlides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Initialize carousel
    showSlide(0);
    
    // Auto-advance carousel
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    startCarousel();
    
    // Event listeners for carousel controls
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', function() {
            clearInterval(carouselInterval);
            nextSlide();
            startCarousel();
        });
    }
    
    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', function() {
            clearInterval(carouselInterval);
            prevSlide();
            startCarousel();
        });
    }
    
    // Event listeners for indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(carouselInterval);
            showSlide(index);
            startCarousel();
        });
    });
    
    // Pause carousel on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        heroCarousel.addEventListener('mouseleave', function() {
            startCarousel();
        });
    }
});