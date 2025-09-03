// Goodwin Hypnotherapy Website JavaScript - Fixed Navigation

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('show');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenuBtn && mobileMenu && 
            !mobileMenuBtn.contains(event.target) && 
            !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('show');
            resetHamburgerMenu();
        }
    });
    
    // Function to reset hamburger menu animation
    function resetHamburgerMenu() {
        if (mobileMenuBtn) {
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Page navigation function
    function showPage(targetPageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active nav link
        updateActiveNavLink(targetPageId);
        
        // Close mobile menu
        if (mobileMenu) {
            mobileMenu.classList.remove('show');
            resetHamburgerMenu();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update active navigation link
    function updateActiveNavLink(activePageId) {
        // Update desktop navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activePageId}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile navigation
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activePageId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Handle navigation clicks
    function handleNavigation(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            
            // Check if it's a page navigation or internal section
            const targetPage = document.getElementById(targetId);
            if (targetPage && targetPage.classList.contains('page')) {
                // It's a page navigation
                showPage(targetId);
            } else {
                // It's an internal section link (like #about-hypnotherapy)
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Make sure we're on the home page first
                    showPage('home');
                    
                    // Wait a bit for the page to load, then scroll to section
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        }
    }
    
    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Handle all buttons with href attributes
    const allButtons = document.querySelectorAll('.btn[href], a.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', handleNavigation);
    });
    
    // Handle specific button clicks for appointment booking
    const bookingButtons = document.querySelectorAll('a[href="#appointment"]');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('appointment');
        });
    });
    
    // Handle Learn More buttons that should scroll to about section
    const learnMoreButtons = document.querySelectorAll('a[href="#about-hypnotherapy"]');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Make sure we're on home page
            showPage('home');
            // Scroll to about section
            setTimeout(() => {
                const aboutSection = document.getElementById('about-hypnotherapy');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            if (header) header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            if (header) header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add shadow to header when scrolled
        if (header) {
            if (scrollTop > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe testimonial cards for animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe info cards for animation
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Utility function to show notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 2000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#10b981';
                break;
            case 'error':
                notification.style.backgroundColor = '#ef4444';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f59e0b';
                break;
            default:
                notification.style.backgroundColor = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Handle Calendly widget events
    window.addEventListener('message', function(event) {
        if (event.data.event && event.data.event.indexOf('calendly') === 0) {
            if (event.data.event === 'calendly.event_scheduled') {
                showNotification('Your appointment has been scheduled successfully!', 'success');
            }
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        // ESC key closes mobile menu
        if (event.key === 'Escape' && mobileMenu) {
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                resetHamburgerMenu();
            }
        }
        
        // Enter key activates focused buttons
        if (event.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement && (focusedElement.classList.contains('btn') || focusedElement.classList.contains('nav-link'))) {
                focusedElement.click();
            }
        }
    });
    
    // Add loading state for Calendly widget
    const calendlyWidget = document.querySelector('.calendly-inline-widget');
    if (calendlyWidget) {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'calendly-loading';
        loadingIndicator.innerHTML = '<p>Loading appointment scheduler...</p>';
        loadingIndicator.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            background: var(--color-bg-2);
            border-radius: 8px;
            color: var(--color-text-secondary);
            font-style: italic;
            margin-bottom: 20px;
        `;
        
        calendlyWidget.parentNode.insertBefore(loadingIndicator, calendlyWidget);
        
        // Remove loading indicator when Calendly loads
        const checkCalendlyLoaded = setInterval(() => {
            const calendlyFrame = calendlyWidget.querySelector('iframe');
            if (calendlyFrame) {
                loadingIndicator.remove();
                clearInterval(checkCalendlyLoaded);
            }
        }, 1000);
        
        // Fallback: remove loading indicator after 10 seconds
        setTimeout(() => {
            if (loadingIndicator.parentNode) {
                loadingIndicator.remove();
            }
            clearInterval(checkCalendlyLoaded);
        }, 10000);
    }
    
    // Initialize the page
    function init() {
        // Set the first page as active by default
        showPage('home');
        
        // Add click listeners to all anchor links
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', handleNavigation);
            }
        });
        
        console.log('Goodwin Hypnotherapy website initialized successfully');
    }
    
    // Initialize the application
    init();
    
    // Add resize handler for responsive behavior
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768 && mobileMenu) {
            mobileMenu.classList.remove('show');
            resetHamburgerMenu();
        }
    });
    
    // Performance optimization: Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe images for lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
});