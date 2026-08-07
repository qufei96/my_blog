// Client-side search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.querySelector('.search-results');

    if (!searchInput) return;

    // Handle search button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Debounce search input
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (e.target.value.length > 2) {
                performSearch();
            }
        }, 500);
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length < 2) return;

        // Show loading state
        if (searchResults) {
            searchResults.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> 搜索中...</div>';
        }

        // Search in page content
        searchInPage(query);
    }

    function searchInPage(query) {
        const results = [];
        const searchQuery = new RegExp(query, 'gi');

        // Search in titles
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(title => {
            if (searchQuery.test(title.textContent)) {
                results.push({
                    element: title,
                    title: title.textContent,
                    excerpt: getExcerpt(title),
                    type: 'title'
                });
            }
        });

        // Search in paragraphs
        document.querySelectorAll('p').forEach(paragraph => {
            if (searchQuery.test(paragraph.textContent)) {
                results.push({
                    element: paragraph,
                    title: getHeading(paragraph),
                    excerpt: highlightText(paragraph.textContent, query),
                    type: 'content'
                });
            }
        });

        // Display results
        displayResults(results, query);
    }

    function getExcerpt(element) {
        let text = '';
        let current = element;
        let count = 0;

        // Get text from current element and siblings
        while (current && count < 100) {
            text += current.textContent + ' ';
            current = current.nextSibling;
            count++;
        }

        return text.substring(0, 200);
    }

    function getHeading(element) {
        // Find the nearest heading
        let current = element;
        while (current && !/^h[1-6]$/i.test(current.tagName)) {
            current = current.previousSibling;
        }

        return current ? current.textContent : '内容';
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function displayResults(results, query) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-search"></i>
                    <h3>没有找到相关结果</h3>
                    <p>尝试使用不同的关键词</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = `
            <h2>搜索结果</h2>
            <p>找到 <span class="search-count">${results.length}</span> 个相关结果</p>
            <div class="search-results-list">
                ${results.map(result => `
                    <div class="search-result-item">
                        <h3>
                            ${highlightText(result.title, query)}
                        </h3>
                        <div class="search-result-excerpt">
                            ${result.type === 'title' ? result.excerpt : highlightText(result.excerpt, query)}
                        </div>
                        <div class="search-result-meta">
                            <span class="result-type">
                                <i class="fas fa-${result.type === 'title' ? 'file-alt' : 'paragraph'}"></i>
                                ${result.type === 'title' ? '标题' : '内容'}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Scroll to results
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Create manifest.json for PWA
if (typeof window !== 'undefined') {
    if (!document.getElementById('manifest')) {
        const manifest = document.createElement('link');
        manifest.rel = 'manifest';
        manifest.href = '/manifest.json';
        manifest.id = 'manifest';
        document.head.appendChild(manifest);
    }
}