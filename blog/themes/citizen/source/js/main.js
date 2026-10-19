// Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Search button submits a query, or opens the input on mobile.
const searchButton = document.getElementById('search-button');
const searchBox = document.querySelector('.search-box');

if (searchButton && searchBox) {
    searchButton.addEventListener('click', () => {
        if (document.getElementById('search-input').value.trim()) {
            performSearch();
            return;
        }
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
    const input = document.getElementById('search-input');
    const query = input.value.trim();
    if (query) {
        window.location.href = input.dataset.searchUrl + '?q=' + encodeURIComponent(query);
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
        const platform = Array.from(button.classList).find(name => name.startsWith('share-'));
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
            copyToClipboard(url).then(() => {
                alert('链接已复制到剪贴板，请在微信中粘贴分享');
            }).catch(() => {
                window.prompt('请复制链接后在微信中分享', url);
            });
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

async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch (_) {
            // Fall back when clipboard permission is unavailable.
        }
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    try {
        textarea.select();
        if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
        document.body.removeChild(textarea);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
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

// Build table of contents from post headings (client-side)
(function buildToc() {
    const tocList = document.getElementById('toc-list');
    const postContent = document.querySelector('.post-content');
    if (!tocList || !postContent) return;

    const headings = postContent.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        const toc = tocList.closest('.toc');
        if (toc) toc.style.display = 'none';
        return;
    }

    headings.forEach(h => {
        if (!h.id) {
            h.id = h.textContent.trim().toLowerCase().replace(/[^\w一-龥-]+/g, '-');
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        if (h.tagName === 'H3') a.classList.add('toc-sub');
        li.appendChild(a);
        tocList.appendChild(li);
    });
})();
