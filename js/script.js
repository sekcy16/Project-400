document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug log
    
    // Banner Slider Functionality (only if banner exists)
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    const swiperPrevBtn = document.querySelector('.swiper-button-prev');
    const swiperNextBtn = document.querySelector('.swiper-button-next');
    
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

    // Initialize dropdown functionality
    initializeDropdown();

    function initializeDropdown() {
        // Handle all dropdowns on the page
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        if (dropdowns.length === 0) {
            console.log('No dropdowns found, skipping dropdown initialization');
            return;
        }

        dropdowns.forEach((dropdown, index) => {
            const dropdownArrow = dropdown.querySelector('.dropdown-arrow');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            let isDropdownOpen = false;

            if (!dropdownArrow) {
                console.log(`No dropdown arrow found for dropdown ${index}`);
                return;
            }

            // Toggle dropdown on arrow click
            dropdownArrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns first
                dropdowns.forEach((otherDropdown, otherIndex) => {
                    if (otherIndex !== index) {
                        otherDropdown.classList.remove('dropdown-active');
                        const otherArrow = otherDropdown.querySelector('.dropdown-arrow');
                        if (otherArrow) otherArrow.classList.remove('active');
                    }
                });
                
                isDropdownOpen = !isDropdownOpen;
                
                if (isDropdownOpen) {
                    dropdown.classList.add('dropdown-active');
                    dropdownArrow.classList.add('active');
                } else {
                    dropdown.classList.remove('dropdown-active');
                    dropdownArrow.classList.remove('active');
                }
                
                console.log(`Dropdown ${index} toggled:`, isDropdownOpen ? 'open' : 'closed');
            });

            // Handle keyboard access for dropdown arrow
            dropdownArrow.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdownArrow.click();
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target) && isDropdownOpen) {
                    isDropdownOpen = false;
                    dropdown.classList.remove('dropdown-active');
                    dropdownArrow.classList.remove('active');
                    console.log(`Dropdown ${index} closed by outside click`);
                }
            });

            // Handle dropdown item clicks
            const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const itemText = item.querySelector('span').textContent;
                    console.log('Selected item:', itemText);
                    
                    // Close dropdown after selection
                    isDropdownOpen = false;
                    dropdown.classList.remove('dropdown-active');
                    dropdownArrow.classList.remove('active');
                    
                    // Here you would typically navigate to the specific page
                    alert(`เลือก: ${itemText}`);
                });
            });
        });

        console.log(`✅ Click-based dropdown functionality initialized for ${dropdowns.length} dropdowns`);
    } // End of initializeDropdown function

    // Initialize Featured Items Swiper
    initializeFeaturedItemsSwiper();

    function initializeFeaturedItemsSwiper() {
        const swiperContainer = document.querySelector('#featured_items .list');
        
        if (!swiperContainer) {
            console.log('Swiper container not found');
            return;
        }

        // Scope the home_items navigation buttons
        const homePrevBtn = document.querySelector('#home_items .swiper-button-prev');
        const homeNextBtn = document.querySelector('#home_items .swiper-button-next');
        const categories = Array.from(document.querySelectorAll('#featured_items .list .category'));

        // Determine which category is most in view
        function getCurrentCategoryIndex() {
            if (categories.length === 0) return 0;
            const scrollLeft = swiperContainer.scrollLeft;
            // Pick the category whose left is closest to current scroll position
            let bestIdx = 0;
            let bestDelta = Infinity;
            categories.forEach((cat, idx) => {
                const delta = Math.abs(cat.offsetLeft - scrollLeft);
                if (delta < bestDelta) {
                    bestDelta = delta;
                    bestIdx = idx;
                }
            });
            return bestIdx;
        }

        // Scroll to a specific category (snap)
        function scrollToCategory(index) {
            const clamped = Math.max(0, Math.min(index, categories.length - 1));
            const target = categories[clamped];
            if (!target) return;
            swiperContainer.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
        }

        // Helper to update button visibility and accessibility based on index
        function updateHomeButtons() {
            if (!homePrevBtn || !homeNextBtn) return;
            const idx = categories.length ? getCurrentCategoryIndex() : 0;
            const last = Math.max(0, categories.length - 1);

            // Also decide based on scroll extremes (more robust)
            const maxScroll = Math.max(0, swiperContainer.scrollWidth - swiperContainer.clientWidth);
            const atStartByScroll = swiperContainer.scrollLeft <= 1;
            const atEndByScroll = swiperContainer.scrollLeft >= (maxScroll - 1);

            const atFirst = (idx === 0) || atStartByScroll;
            const atLast = (idx === last) || atEndByScroll;

            // Show/hide per requirement using swiper-button-disabled to preserve layout space
            homePrevBtn.classList.toggle('swiper-button-disabled', atFirst);
            homeNextBtn.classList.toggle('swiper-button-disabled', atLast);
            homePrevBtn.setAttribute('aria-hidden', String(atFirst));
            homeNextBtn.setAttribute('aria-hidden', String(atLast));

            // Also reflect disabled and tabindex for accessibility
            homePrevBtn.setAttribute('aria-disabled', String(atFirst));
            homePrevBtn.tabIndex = atFirst ? -1 : 0;
            homeNextBtn.setAttribute('aria-disabled', String(atLast));
            homeNextBtn.tabIndex = atLast ? -1 : 0;
        }

        // Smooth scroll handler
        function scrollFeatured(direction) {
            // Move by whole categories
            const current = getCurrentCategoryIndex();
            const nextIdx = current + (direction > 0 ? 1 : -1);
            scrollToCategory(nextIdx);
        }

        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse events for desktop drag scrolling
        swiperContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            swiperContainer.style.cursor = 'grabbing';
            startX = e.pageX - swiperContainer.offsetLeft;
            scrollLeft = swiperContainer.scrollLeft;
        });

        swiperContainer.addEventListener('mouseleave', () => {
            isDown = false;
            swiperContainer.style.cursor = 'grab';
        });

        swiperContainer.addEventListener('mouseup', () => {
            isDown = false;
            swiperContainer.style.cursor = 'grab';
        });

        swiperContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - swiperContainer.offsetLeft;
            const walk = (x - startX) * 2;
            swiperContainer.scrollLeft = scrollLeft - walk;
        });

        // Attach click events to home_items prev/next buttons
        if (homePrevBtn) {
            homePrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollFeatured(-1);
            });
        }

        if (homeNextBtn) {
            homeNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollFeatured(1);
            });
        }

        // Keep buttons state in sync while scrolling
        let rafPending = false;
        swiperContainer.addEventListener('scroll', () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                updateHomeButtons();
                rafPending = false;
            });
        }, { passive: true });
        window.addEventListener('resize', () => {
            // Re-evaluate positions and state on resize
            updateHomeButtons();
        });
    // Initial state (after layout)
    requestAnimationFrame(updateHomeButtons);

        console.log('✅ Featured items swiper initialized');
    }
});
