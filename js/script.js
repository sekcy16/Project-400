// Banner Slider Functionality
function initializeBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    const swiperPrevBtn = document.querySelector('.swiper-button-prev');
    const swiperNextBtn = document.querySelector('.swiper-button-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to show specific slide
    function showSlide(index) {
        console.log('Changing to slide:', index); // Debug log
        
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            // Reset the loading animation by removing and re-adding the class
            indicator.style.animation = 'none';
            indicator.offsetHeight; // Trigger reflow
            indicator.style.animation = null;
        });
        
        // Add active class to current slide and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
            // Restart the loading animation using a more stable method
            const activeIndicator = indicators[index];
            
            // Force animation restart by temporarily setting a unique animation name
            activeIndicator.classList.add('restart-animation');
            
            // Use double requestAnimationFrame for better stability
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    activeIndicator.classList.remove('restart-animation');
                });
            });
        }
        
        // Update swiper button previews
        updateSwiperPreviews(index);
        
        currentSlide = index;
    }

    // Function to update swiper button preview images
    function updateSwiperPreviews(currentIndex) {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (currentIndex + 1) % totalSlides;
        
        // Update previous button preview
        const swiperPrevImg = document.querySelector('.swiper-button-prev .button-preview img');
        const swiperNextImg = document.querySelector('.swiper-button-next .button-preview img');
        
        if (swiperPrevImg && slides[prevIndex]) {
            const prevImgSrc = slides[prevIndex].querySelector('img').src;
            swiperPrevImg.src = prevImgSrc;
        }
        
        if (swiperNextImg && slides[nextIndex]) {
            const nextImgSrc = slides[nextIndex].querySelector('img').src;
            swiperNextImg.src = nextImgSrc;
        }
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
    
    // Event listeners for swiper navigation buttons
    if (swiperNextBtn) swiperNextBtn.addEventListener('click', nextSlide);
    if (swiperPrevBtn) swiperPrevBtn.addEventListener('click', prevSlide);

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

    // Add enhanced resize handling to preserve animations during responsive changes
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Clear existing timeout to prevent multiple rapid calls
        clearTimeout(resizeTimeout);
        
        // Delay execution to avoid triggering during rapid resize events
        resizeTimeout = setTimeout(() => {
            // Preserve current slide and animation state
            const activeIndicator = indicators[currentSlide];
            if (activeIndicator && activeIndicator.classList.contains('active')) {
                // Don't restart animation unnecessarily during resize
                console.log('Window resized, preserving animation state');
            }
            
            // Update swiper previews for current layout
            updateSwiperPreviews(currentSlide);
        }, 100);
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
}

// Navbar Animation Functionality
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
}

// Search functionality (part of header)
function initializeSearchFunctionality() {
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

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// User profile functionality (part of header)
function initializeUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            // Here you would typically show a dropdown menu
            alert('เปิดเมนูผู้ใช้');
        });
    }
}

// Country selector functionality (part of header)
function initializeCountrySelector() {
    const countrySelector = document.querySelector('.country-selector');
    
    if (countrySelector) {
        countrySelector.addEventListener('click', () => {
            // Here you would typically show a country selection dropdown
            alert('เลือกประเทศ');
        });
    }
}

// Dropdown Navigation functionality
function initializeDropdownNavigation() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    console.log('🔍 Found dropdowns:', dropdowns.length); // Debug log
    
    dropdowns.forEach((dropdown, index) => {
        const arrow = dropdown.querySelector('.dropdown-arrow');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        console.log(`🔍 Dropdown ${index}:`, { arrow, menu }); // Debug log
        
        if (arrow && menu) {
            arrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🖱️ Dropdown arrow clicked!', index); // Debug log
                
                // Toggle active state
                const isActive = dropdown.classList.contains('dropdown-active');
                console.log('📊 Current state:', isActive); // Debug log
                
                // Close all other dropdowns first
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('dropdown-active');
                        const otherArrow = otherDropdown.querySelector('.dropdown-arrow');
                        if (otherArrow) {
                            otherArrow.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current dropdown
                if (isActive) {
                    dropdown.classList.remove('dropdown-active');
                    arrow.classList.remove('active');
                } else {
                    dropdown.classList.add('dropdown-active');
                    arrow.classList.add('active');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const clickedInsideDropdown = e.target.closest('.nav-dropdown');
        if (!clickedInsideDropdown) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-active');
                const arrow = dropdown.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.remove('active');
                }
            });
        }
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-active');
                const arrow = dropdown.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.remove('active');
                }
            });
        }
    });
}

// Mobile menu toggle functionality for responsive design
function initializeMobileMenu() {
    // This function will handle mobile hamburger menu when screen size is small
    let isMobileMenuOpen = false;
    
    // Create mobile menu toggle button (hamburger)
    function createMobileMenuButton() {
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.querySelector('.mobile-menu-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileToggle.style.display = 'none'; // Hidden by default, shown via CSS media queries
            
            headerRight.appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }
    }
    
    function toggleMobileMenu() {
        const mainNav = document.querySelector('.main-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mainNav && mobileToggle) {
            isMobileMenuOpen = !isMobileMenuOpen;
            
            if (isMobileMenuOpen) {
                mainNav.classList.add('mobile-active');
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mainNav.classList.remove('mobile-active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
    
    // Handle window resize to close mobile menu on larger screens
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            const mainNav = document.querySelector('.main-nav');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mainNav) mainNav.classList.remove('mobile-active');
            if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            isMobileMenuOpen = false;
        }
    });
    
    // Initialize mobile menu button
    createMobileMenuButton();
}

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug log
    
    // Banner Slider Functionality (only if banner exists)
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
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
    
    // Initialize other header functionalities
    initializeSearchFunctionality();
    initializeUserProfile();
    initializeCountrySelector();
    
    // Initialize dropdown navigation
    initializeDropdownNavigation();
    
    // Initialize mobile menu for responsive design
    initializeMobileMenu();
});
