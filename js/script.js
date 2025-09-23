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

    // Initialize News Grid Navigation
    initializeNewsGridNavigation();

    function initializeNewsGridNavigation() {
        const newsGrid = document.querySelector('.news-promotion .news-grid');
        const prevBtn = document.querySelector('.news-promotion .swiper-button-prev');
        const nextBtn = document.querySelector('.news-promotion .swiper-button-next');
        
        if (!newsGrid || !prevBtn || !nextBtn) {
            console.log('News grid navigation elements not found');
            return;
        }

        const scrollAmount = 320; // Width of one card plus gap
        
        function updateButtonStates() {
            const scrollLeft = newsGrid.scrollLeft;
            const maxScroll = newsGrid.scrollWidth - newsGrid.clientWidth;
            
            // Show/hide buttons based on scroll position
            if (scrollLeft <= 0) {
                // At the beginning - hide left button, show right button
                prevBtn.classList.add('hidden');
                nextBtn.classList.remove('hidden');
            } else if (scrollLeft >= maxScroll - 1) {
                // At the end - show left button, hide right button  
                prevBtn.classList.remove('hidden');
                nextBtn.classList.add('hidden');
            } else {
                // In the middle - show both buttons
                prevBtn.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
            }
        }

        // Initial button state (start with only right button visible)
        prevBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
        
        // Update button states after a short delay to ensure proper initialization
        setTimeout(updateButtonStates, 100);

        // Previous button click
        prevBtn.addEventListener('click', function() {
            newsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Next button click
        nextBtn.addEventListener('click', function() {
            newsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states on scroll
        newsGrid.addEventListener('scroll', updateButtonStates);
        
        // Update button states on window resize
        window.addEventListener('resize', updateButtonStates);
    }

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
            const shouldBeScrolled = scrollTop > 10; // Reduced from 100 to 10 for immediate response
            console.log('📊 Scroll position:', scrollTop, 'Should be scrolled:', shouldBeScrolled); // Debug log
            
            // Close global dropdown when scrolling
            closeGlobalDropdown();
            
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

    // Initialize Special Deals Navigation
    initializeSpecialDealsNavigation();

    // Initialize Home Items Navigation
    initializeHomeItemsNavigation();

    // Initialize Cards Container Navigation
    initializeCardsContainerNavigation();

    function initializeHomeItemsNavigation() {
        const swiperContainer = document.querySelector('#featured_items .list');
        
        if (!swiperContainer) {
            console.log('No home items swiper container found');
            return;
        }

        // Scope the home_items navigation buttons
        const homePrevBtn = document.querySelector('#featured_items .swiper-button-prev');
        const homeNextBtn = document.querySelector('#featured_items .swiper-button-next');
        const items = Array.from(document.querySelectorAll('#featured_items .list a'));

        if (!homePrevBtn || !homeNextBtn) {
            console.log('Home items navigation buttons not found');
            return;
        }

        // Helper to update button visibility based on scroll position
        function updateHomeButtons() {
            const maxScroll = Math.max(0, swiperContainer.scrollWidth - swiperContainer.clientWidth);
            const atStart = swiperContainer.scrollLeft <= 1;
            const atEnd = swiperContainer.scrollLeft >= (maxScroll - 1);

            // Show/hide buttons using swiper-button-disabled to preserve layout space
            homePrevBtn.classList.toggle('swiper-button-disabled', atStart);
            homeNextBtn.classList.toggle('swiper-button-disabled', atEnd);
            homePrevBtn.setAttribute('aria-hidden', String(atStart));
            homeNextBtn.setAttribute('aria-hidden', String(atEnd));

            // Also reflect disabled and tabindex for accessibility
            homePrevBtn.setAttribute('aria-disabled', String(atStart));
            homePrevBtn.tabIndex = atStart ? -1 : 0;
            homeNextBtn.setAttribute('aria-disabled', String(atEnd));
            homeNextBtn.tabIndex = atEnd ? -1 : 0;
        }

        // Smooth scroll handler for home items
        function scrollHomeItems(direction) {
            const scrollAmount = 300; // Adjust scroll distance as needed
            const newScrollLeft = swiperContainer.scrollLeft + (direction * scrollAmount);
            swiperContainer.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }

        // Mouse drag scrolling
        let isDown = false;
        let startX;
        let scrollLeft;

        swiperContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - swiperContainer.offsetLeft;
            scrollLeft = swiperContainer.scrollLeft;
        });

        swiperContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        swiperContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        swiperContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - swiperContainer.offsetLeft;
            const walk = (x - startX) * 2;
            swiperContainer.scrollLeft = scrollLeft - walk;
        });

        // Attach click events to home_items prev/next buttons
        homePrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollHomeItems(-1);
        });

        homeNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollHomeItems(1);
        });

        // Keep buttons state in sync while scrolling
        let rafPending = false;
        swiperContainer.addEventListener('scroll', () => {
            if (!rafPending) {
                requestAnimationFrame(() => {
                    updateHomeButtons();
                    rafPending = false;
                });
                rafPending = true;
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            updateHomeButtons();
        });

        // Initial state (after layout)
        requestAnimationFrame(updateHomeButtons);

        console.log('✅ Home items navigation initialized');
    }

    function initializeSpecialDealsNavigation() {
        const swiperContainer = document.querySelector('#special_deals .list');
        
        if (!swiperContainer) {
            console.log('Special deals container not found');
            return;
        }

        // Scope the special_deals navigation buttons
        const specialPrevBtn = document.querySelector('#special_deals .swiper-button-prev');
        const specialNextBtn = document.querySelector('#special_deals .swiper-button-next');
        const deals = Array.from(document.querySelectorAll('#special_deals .list a'));

        if (!specialPrevBtn || !specialNextBtn) {
            console.log('Special deals navigation buttons not found');
            return;
        }

        // Helper to update button visibility based on scroll position
        function updateSpecialButtons() {
            const maxScroll = Math.max(0, swiperContainer.scrollWidth - swiperContainer.clientWidth);
            const atStart = swiperContainer.scrollLeft <= 1;
            const atEnd = swiperContainer.scrollLeft >= (maxScroll - 1);

            // Show/hide buttons using swiper-button-disabled to preserve layout space
            specialPrevBtn.classList.toggle('swiper-button-disabled', atStart);
            specialNextBtn.classList.toggle('swiper-button-disabled', atEnd);
            specialPrevBtn.setAttribute('aria-hidden', String(atStart));
            specialNextBtn.setAttribute('aria-hidden', String(atEnd));

            // Also reflect disabled and tabindex for accessibility
            specialPrevBtn.setAttribute('aria-disabled', String(atStart));
            specialPrevBtn.tabIndex = atStart ? -1 : 0;
            specialNextBtn.setAttribute('aria-disabled', String(atEnd));
            specialNextBtn.tabIndex = atEnd ? -1 : 0;
        }

        // Smooth scroll handler for special deals
        function scrollSpecialDeals(direction) {
            const scrollAmount = 300; // Adjust scroll distance as needed
            const newScrollLeft = swiperContainer.scrollLeft + (direction * scrollAmount);
            swiperContainer.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }

        // Mouse drag scrolling
        let isDown = false;
        let startX;
        let scrollLeft;

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

        // Attach click events to special_deals prev/next buttons
        specialPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollSpecialDeals(-1);
        });

        specialNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollSpecialDeals(1);
        });

        // Keep buttons state in sync while scrolling
        let rafPending = false;
        swiperContainer.addEventListener('scroll', () => {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(() => {
                updateSpecialButtons();
                rafPending = false;
            });
        }, { passive: true });

        window.addEventListener('resize', () => {
            updateSpecialButtons();
        });

        // Initial state (after layout)
        requestAnimationFrame(updateSpecialButtons);

        console.log('✅ Special deals navigation initialized');
    }

    function initializeCardsContainerNavigation() {
        const cardsGrid = document.querySelector('.cards-container .inner');
        const cardsPrevBtn = document.querySelector('.cards-container .swiper-button-prev');
        const cardsNextBtn = document.querySelector('.cards-container .swiper-button-next');

        if (!cardsGrid || !cardsPrevBtn || !cardsNextBtn) {
            console.log('Cards container navigation elements not found');
            return;
        }

        const scrollAmount = 290; // Width of one card plus gap
        
        function updateCardsButtons() {
            const scrollLeft = cardsGrid.scrollLeft;
            const maxScroll = cardsGrid.scrollWidth - cardsGrid.clientWidth;
            
            // Show/hide buttons based on scroll position (same logic as news)
            if (scrollLeft <= 0) {
                // At the beginning - hide left button, show right button
                cardsPrevBtn.classList.add('hidden');
                cardsNextBtn.classList.remove('hidden');
            } else if (scrollLeft >= maxScroll - 1) {
                // At the end - show left button, hide right button  
                cardsPrevBtn.classList.remove('hidden');
                cardsNextBtn.classList.add('hidden');
            } else {
                // In the middle - show both buttons
                cardsPrevBtn.classList.remove('hidden');
                cardsNextBtn.classList.remove('hidden');
            }
        }

        // Initial button state (start with only right button visible)
        cardsPrevBtn.classList.add('hidden');
        cardsNextBtn.classList.remove('hidden');
        
        // Update button states after a short delay to ensure proper initialization
        setTimeout(updateCardsButtons, 100);

        cardsPrevBtn.addEventListener('click', () => {
            cardsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(updateCardsButtons, 300);
        });

        cardsNextBtn.addEventListener('click', () => {
            cardsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(updateCardsButtons, 300);
        });

        cardsGrid.addEventListener('scroll', updateCardsButtons);
        window.addEventListener('resize', updateCardsButtons);

        console.log('✅ Cards container navigation initialized');
    }

    // News Promotion Slider
    const newsPromotionSection = document.querySelector('.news-promotion');
    if (newsPromotionSection) {
        const newsGrid = newsPromotionSection.querySelector('.news-grid');
        const newsPrevBtn = newsPromotionSection.querySelector('.swiper-button-prev');
        const newsNextBtn = newsPromotionSection.querySelector('.swiper-button-next');

        if (newsGrid && newsPrevBtn && newsNextBtn) {
            const scrollAmount = 340; // Width of one card plus gap

            newsPrevBtn.addEventListener('click', () => {
                newsGrid.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            newsNextBtn.addEventListener('click', () => {
                newsGrid.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Update button states
            function updateNewsButtons() {
                const scrollLeft = newsGrid.scrollLeft;
                const scrollWidth = newsGrid.scrollWidth;
                const clientWidth = newsGrid.clientWidth;

                newsPrevBtn.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
                newsNextBtn.style.opacity = scrollLeft >= scrollWidth - clientWidth ? '0.5' : '1';
            }

            newsGrid.addEventListener('scroll', updateNewsButtons);
            window.addEventListener('resize', updateNewsButtons);
            updateNewsButtons();

            console.log('✅ News promotion slider initialized');
        }
    }
});

// Helper function to reset main header position properly
function resetMainHeaderPosition() {
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        // Remove any inline styles that might override CSS
        mainHeader.style.top = '';
        mainHeader.style.transition = '';
        
        // Let CSS handle the positioning based on scrolled class
        console.log('🔄 Main header position reset to CSS defaults');
    }
}

// Helper function to close global dropdown and reset header
function closeGlobalDropdown() {
    const dropdown = document.getElementById('globalDropdown');
    if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
        resetMainHeaderPosition();
        console.log('📤 Global dropdown closed and header reset');
    }
}

// Global functions for mobile menu toggles
function toggleGlobalDropdown() {
    const dropdown = document.getElementById('globalDropdown');
    const mainHeader = document.querySelector('.main-header');
    
    if (dropdown) {
        dropdown.classList.toggle('active');
        
        // Adjust main header position based on dropdown state
        if (dropdown.classList.contains('active')) {
            // Calculate dropdown height and adjust main header
            const dropdownHeight = dropdown.offsetHeight;
            const globalHeaderHeight = 40; // Standard global header height
            const newTopPosition = globalHeaderHeight + dropdownHeight;
            
            if (mainHeader) {
                // Only adjust if not in scrolled state
                if (!mainHeader.classList.contains('scrolled')) {
                    mainHeader.style.top = `${newTopPosition}px`;
                    mainHeader.style.transition = 'top 0.3s ease';
                } else {
                    // If scrolled, position relative to top
                    mainHeader.style.top = `${dropdownHeight}px`;
                    mainHeader.style.transition = 'top 0.3s ease';
                }
            }
        } else {
            // Reset main header position
            resetMainHeaderPosition();
        }
    }
}

function toggleMobileDropdown(element) {
    // Find the dropdown arrow and the dropdown menu
    const arrow = element;
    const navDropdownHeader = arrow.closest('.nav-dropdown-header');
    const dropdown = navDropdownHeader.nextElementSibling; // The dropdown is after the header
    const parentNavItem = arrow.closest('.nav-dropdown'); // Get the li.nav-dropdown
    
    if (dropdown && dropdown.classList.contains('mobile-dropdown')) {
        const isActive = dropdown.classList.contains('active');
        
        // Close all other dropdowns in mobile nav
        const allDropdowns = document.querySelectorAll('.mobile-dropdown');
        const allArrows = document.querySelectorAll('.nav-dropdown .dropdown-arrow');
        const allParentNavItems = document.querySelectorAll('.nav-dropdown');
        
        allDropdowns.forEach(dd => dd.classList.remove('active'));
        allArrows.forEach(arr => arr.classList.remove('active'));
        allParentNavItems.forEach(parent => parent.classList.remove('dropdown-active'));
        
        // Toggle current dropdown
        if (!isActive) {
            dropdown.classList.add('active');
            arrow.classList.add('active');
            parentNavItem.classList.add('dropdown-active'); // Highlight parent nav item
        }
    }
}

function closeMobileDropdowns() {
    const allDropdowns = document.querySelectorAll('.mobile-dropdown');
    const allArrows = document.querySelectorAll('.nav-dropdown .dropdown-arrow');
    const allParentNavItems = document.querySelectorAll('.nav-dropdown');
    
    allDropdowns.forEach(dd => dd.classList.remove('active'));
    allArrows.forEach(arr => arr.classList.remove('active'));
    allParentNavItems.forEach(parent => parent.classList.remove('dropdown-active'));
}

function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileNavOverlay');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    
    if (mobileNav && overlay && hamburgerIcon) {
        const isActive = mobileNav.classList.contains('active');
        
        if (isActive) {
            // Close menu
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            // Open menu
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            hamburgerIcon.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const globalDropdown = document.getElementById('globalDropdown');
    const cubeMenu = document.querySelector('.global-header-cube-menu');
    
    // Close global dropdown if clicking outside
    if (globalDropdown && !cubeMenu.contains(e.target) && !globalDropdown.contains(e.target)) {
        closeGlobalDropdown();
    }
});

// Close mobile menu on window resize if screen becomes large
window.addEventListener('resize', function() {
    if (window.innerWidth > 1000) {
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.getElementById('mobileNavOverlay');
        const hamburgerIcon = document.getElementById('hamburgerIcon');
        
        if (mobileNav) mobileNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        if (hamburgerIcon) hamburgerIcon.classList.remove('active');
        
        // Close global dropdown and reset header
        closeGlobalDropdown();
        
        document.body.style.overflow = 'auto';
    }

    // Initialize Footer Collapsible Menu for Mobile
    function initializeFooterMobile() {
        if (window.innerWidth <= 481) {
            const footerTitles = document.querySelectorAll('#footer_nav dt');
            footerTitles.forEach(title => {
                // ป้องกันการเพิ่ม event ซ้ำ
                if (!title.classList.contains('footer-nav-init')) {
                    title.classList.add('footer-nav-init');
                    title.addEventListener('click', function() {
                        const ddElements = this.parentNode.querySelectorAll('dd');
                        const isActive = this.classList.contains('active');
                        // Close all other sections
                        footerTitles.forEach(otherTitle => {
                            if (otherTitle !== this) {
                                otherTitle.classList.remove('active');
                                const otherDds = otherTitle.parentNode.querySelectorAll('dd');
                                otherDds.forEach(dd => dd.classList.remove('show'));
                            }
                        });
                        // Toggle current section
                        if (isActive) {
                            this.classList.remove('active');
                            ddElements.forEach(dd => dd.classList.remove('show'));
                        } else {
                            this.classList.add('active');
                            ddElements.forEach(dd => dd.classList.add('show'));
                        }
                        // หมุน icon +
                        const icon = this.querySelector('.footer-nav-icon i');
                        if (icon) {
                            // ใช้ class fa-plus/fa-times เพื่อเปลี่ยน icon
                            if (this.classList.contains('active')) {
                                icon.classList.remove('fa-plus');
                                icon.classList.add('fa-times');
                            } else {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-plus');
                            }
                        }
                    });
                }
            });
        } else {
            // รีเซ็ต icon และ active เมื่อออกจาก mobile
            const footerTitles = document.querySelectorAll('#footer_nav dt');
            footerTitles.forEach(title => {
                title.classList.remove('active');
                const icon = title.querySelector('.footer-nav-icon i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-plus');
                }
                const ddElements = title.parentNode.querySelectorAll('dd');
                ddElements.forEach(dd => dd.classList.remove('show'));
            });
        }
    }

    // Initialize footer mobile functionality
    initializeFooterMobile();
    
    // Re-initialize on window resize
    window.addEventListener('resize', initializeFooterMobile);
});
