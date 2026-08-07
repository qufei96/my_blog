// Enhanced responsive features
document.addEventListener('DOMContentLoaded', () => {
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResize();
        }, 250);
    });

    // Initialize on load
    handleResize();
});

function handleResize() {
    const width = window.innerWidth;

    // Toggle responsive classes for better CSS targeting
    document.body.classList.toggle('mobile', width < 480);
    document.body.classList.toggle('tablet', width >= 480 && width < 992);
    document.body.classList.toggle('desktop', width >= 992);

    // Adjust header behavior
    adjustHeader();

    // Adjust sidebar visibility
    adjustSidebar();
}

function adjustHeader() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!header || !menuToggle || !mainNav) return;

    // On mobile, make header more compact
    if (window.innerWidth < 768) {
        header.classList.add('mobile-header');

        // Close menu when scrolling
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    } else {
        header.classList.remove('mobile-header');
        header.style.transform = 'translateY(0)';
    }
}

function adjustSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (!sidebar || !mainContent) return;

    if (window.innerWidth < 768) {
        // On mobile, move sidebar below main content
        sidebar.style.order = '2';
        mainContent.style.order = '1';

        // Remove sticky positioning
        sidebar.style.position = 'relative';
        sidebar.style.top = 'auto';
    } else {
        // Restore desktop layout
        sidebar.style.order = '';
        mainContent.style.order = '';
        sidebar.style.position = 'sticky';
    }
}

// Touch gesture support for mobile
if ('ontouchstart' in window) {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - open menu
                document.querySelector('.main-nav').classList.add('active');
            } else {
                // Swipe right - close menu
                document.querySelector('.main-nav').classList.remove('active');
            }
        }
    }
}

// Enhanced mobile navigation
const menuItems = document.querySelectorAll('.main-nav a');
menuItems.forEach(item => {
    // Add tap delay for better UX on mobile
    item.addEventListener('touchend', (e) => {
        e.preventDefault();
        setTimeout(() => {
            window.location.href = item.href;
        }, 100);
    });
});

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle viewport meta tag for better zoom control
const viewport = document.querySelector('meta[name=viewport]');
if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
} else {
    const newViewport = document.createElement('meta');
    newViewport.name = 'viewport';
    newViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(newViewport);
}