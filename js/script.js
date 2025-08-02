document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing banner...'); // Debug log
    
    // Banner Slider Functionality
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    
    console.log('Found slides:', slides.length); // Debug log
    console.log('Found indicators:', indicators.length); // Debug log
    
    if (slides.length === 0) {
        console.error('No banner slides found!');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to show specific slide
    function showSlide(index) {
        console.log('Changing to slide:', index); // Debug log
        
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        console.log('Next slide:', next); // Debug log
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Event listeners for indicators - click to go to specific slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index); // Debug log
            showSlide(index);
            // Reset auto-play interval after manual selection
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    });

    // Initialize banner - make sure first slide is active
    showSlide(0);

    // Auto-play functionality - continuous without pause
    let autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    console.log('Auto-play started'); // Debug log

    // Remove pause on hover for continuous play
    // const bannerSection = document.querySelector('.banner-section');
    // bannerSection.addEventListener('mouseenter', () => {
    //     clearInterval(autoPlayInterval);
    // });

    // Resume auto-play when mouse leaves
    // bannerSection.addEventListener('mouseleave', () => {
    //     autoPlayInterval = setInterval(nextSlide, 5000);
    // });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            // Reset auto-play interval after manual navigation
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            // Reset auto-play interval after manual navigation
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Here you would typically send the search request to your backend
            // For now, we'll just show an alert
            alert(`ค้นหา: ${searchTerm}`);
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // User profile dropdown (basic functionality)
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', () => {
        // Here you would typically show a dropdown menu
        alert('เปิดเมนูผู้ใช้');
    });

    // Country selector functionality
    const countrySelector = document.querySelector('.country-selector');
    countrySelector.addEventListener('click', () => {
        // Here you would typically show a country selection dropdown
        alert('เลือกประเทศ');
    });

    // Handle navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow normal navigation for nav-links
            const linkText = link.textContent;
            console.log(`Navigating to: ${linkText}`);
        });
    });

    // Handle global header links (prevent default for demo)
    document.querySelectorAll('.global-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default action for demo purposes
            e.preventDefault();
            
            // Get the link text for demonstration
            const linkText = link.textContent;
            console.log(`Clicked global link: ${linkText}`);
            
            // Show alert for global links only
            alert(`คลิก: ${linkText}`);
        });
    });

    // Add smooth transitions when window is resized
    window.addEventListener('resize', () => {
        // Recalculate banner dimensions if needed
        showSlide(currentSlide);
    });

    // Touch/swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    const bannerSection = document.querySelector('.banner-section');
    if (bannerSection) {
        bannerSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        bannerSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - go to next slide
                nextSlide();
            } else {
                // Swiped right - go to previous slide
                prevSlide();
            }
        }
    }
});
