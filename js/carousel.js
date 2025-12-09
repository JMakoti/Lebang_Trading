document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".carousel-slide");
    const indicators = document.querySelectorAll(".carousel-indicator");
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    // Function to show specific slide with smooth transition
    function showSlide(index) {
      if (isTransitioning || index === currentSlide) return;

      isTransitioning = true;
      const prevSlide = currentSlide;
      currentSlide = index;

      // Remove active class from all slides and indicators
      slides.forEach((slide) => {
        slide.classList.remove("active");
        slide.classList.remove("exit");
      });

      indicators.forEach((indicator) => indicator.classList.remove("active"));

      // Add exit animation to previous slide
      if (slides[prevSlide]) {
        slides[prevSlide].classList.add("exit");

        // Remove exit class after animation completes
        setTimeout(() => {
          slides[prevSlide].classList.remove("exit");
        }, 1200);
      }

      // Add active class to current slide and indicator
      setTimeout(() => {
        slides[index].classList.add("active");
        indicators[index].classList.add("active");
        isTransitioning = false;
      }, 100);
    }

    // Function to show next slide
    function nextSlide() {
      let nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
        resetInterval();
      });

      // Add auto-progress indicator
      indicator.addEventListener("mouseenter", function () {
        if (this.classList.contains("active")) {
          this.style.setProperty("--progress", "100%");
        }
      });
    });

    // Auto-advance slides
    function startInterval() {
      slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    // Start the carousel
    startInterval();

    // Pause on hover
    const heroSection = document.querySelector(".hero");
    heroSection.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    heroSection.addEventListener("mouseleave", () => {
      startInterval();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
        resetInterval();
      } else if (e.key === "ArrowLeft") {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        resetInterval();
      }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    heroSection.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(prevIndex);
        }
        resetInterval();
      }
    }
  });