// Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Search Box Toggle
const searchButton = document.getElementById('search-button');
const searchBox = document.querySelector('.search-box');

if (searchButton && searchBox) {
    searchButton.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            document.getElementById('search-input').focus();
        }
    });
}

// Search Functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        // This will be implemented with hexo-generator-search
        // For now, just redirect to search page
        window.location.href = '/search/?q=' + encodeURIComponent(query);
    }
}

// Back to Top
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Share Buttons
document.querySelectorAll('.share-buttons a').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.classList[1]; // e.g., share-weibo, share-wechat
        handleShare(platform, window.location.href);
    });
});

function handleShare(platform, url) {
    let shareUrl = '';

    switch(platform) {
        case 'share-weibo':
            shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(document.title)}`;
            break;
        case 'share-wechat':
            // WeChat sharing typically uses QR code or native app
            // For now, just copy to clipboard
            copyToClipboard(url);
            alert('链接已复制到剪贴板，请在微信中粘贴分享');
            return;
        case 'share-twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(document.title)}`;
            break;
        case 'share-facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image lazy loading (if needed)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
}

// Syntax highlighting enhancement
document.querySelectorAll('pre code').forEach(block => {
    block.classList.add('language-' + block.tagName.toLowerCase());
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mainNav && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
    }
});