document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug log
    
    // Banner Slider Functionality (only if banner exists)
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    
    console.log('Found slides:', slides.length); // Debug log
    console.log('Found indicators:', indicators.length); // Debug log
    
    // Only initialize banner if elements exist
    if (slides.length > 0) {
        console.log('Initializing banner slider...'); // Debug log
        initializeBannerSlider();
    } else {
        console.log('No banner found, skipping banner initialization'); // Debug log
    }
    
    // Always initialize navbar animation regardless of banner
    console.log('Initializing navbar animation...'); // Debug log
    initializeNavbarAnimation();

    function initializeBannerSlider() {
    
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
    } // End of initializeBannerSlider function

    function initializeNavbarAnimation() {
        // Navbar Scroll Animation - Simple and Clean
        const mainHeader = document.querySelector('.main-header');
        console.log('🔍 Main header element found:', mainHeader); // Debug log
        let isScrolled = false;
        
        function handleNavbarScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const shouldBeScrolled = scrollTop > 100;
            console.log('📊 Scroll position:', scrollTop, 'Should be scrolled:', shouldBeScrolled); // Debug log
            
            if (shouldBeScrolled !== isScrolled) {
                isScrolled = shouldBeScrolled;
                console.log('🔄 Scroll state changed to:', isScrolled); // Debug log
                
                if (isScrolled) {
                    if (mainHeader) {
                        mainHeader.classList.add('scrolled');
                        console.log('✅ Added "scrolled" class to header'); // Debug log
                    }
                    const screenWidth = window.innerWidth;
                    console.log('📏 Screen width:', screenWidth); // Debug log
                    if (screenWidth >= 1570) {
                        console.log('✨ Navbar elements moving to sides (large screen animation)');
                    } else {
                        console.log('✨ Navbar scrolled state active (no movement for safer display)');
                    }
                } else {
                    if (mainHeader) {
                        mainHeader.classList.remove('scrolled');
                        console.log('✅ Removed "scrolled" class from header'); // Debug log
                    }
                    console.log('↩️ Navbar back to normal state');
                }
            }
        }
        
        // Add scroll event listener with throttling for better performance
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            console.log('📜 Scroll event fired!'); // Debug log
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleNavbarScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        console.log('🎯 Scroll event listener attached'); // Debug log
        
        // Initial check in case page is already scrolled
        console.log('🚀 Running initial navbar scroll check'); // Debug log
        handleNavbarScroll();
    } // End of initializeNavbarAnimation function
});
