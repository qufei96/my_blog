// 全站搜索：读取 hexo-generator-search 生成的 /search.xml，在客户端完成搜索
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-page-input');
  const searchButton = document.getElementById('search-page-button');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !searchResults) return;

  // 从 URL 读取 ?q= 并立即搜索（来自首页搜索框的跳转）
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q');
  if (initialQuery) {
    searchInput.value = initialQuery;
    doSearch(initialQuery);
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => doSearch(searchInput.value));
  }
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') doSearch(searchInput.value);
  });

  // 输入防抖
  let timer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (e.target.value.trim().length >= 2) doSearch(e.target.value);
    }, 400);
  });

  function doSearch(query) {
    const q = query.trim();
    if (q.length < 2) {
      searchResults.innerHTML = '<div class="no-search-results"><p>请输入至少 2 个字符</p></div>';
      return;
    }

    searchResults.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> 搜索中...</div>';

    fetch('/search.xml')
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(xmlText => {
        const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
        const entries = doc.querySelectorAll('entry');
        const keyword = q.toLowerCase();
        const results = [];

        entries.forEach(entry => {
          const title = entry.querySelector('title').textContent || '';
          const url = entry.querySelector('url').textContent || '';
          const content = entry.querySelector('content').textContent || '';
          const plainText = stripHtml(content);
          if (title.toLowerCase().includes(keyword) || plainText.toLowerCase().includes(keyword)) {
            results.push({ title, url, excerpt: getExcerpt(plainText, q, 120) });
          }
        });

        renderResults(results, q);
      })
      .catch(() => {
        searchResults.innerHTML = '<div class="no-search-results"><p>搜索数据加载失败，请稍后重试</p></div>';
      });
  }

  function renderResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-search-results">
          <h3>没有找到「${escapeHtml(query)}」相关的结果</h3>
          <p>尝试换个关键词</p>
        </div>`;
      return;
    }

    searchResults.innerHTML = `
      <h2>搜索结果</h2>
      <p>找到 <span class="search-count">${results.length}</span> 个相关结果</p>
      ${results.map(r => `
        <div class="search-result-item">
          <h3><a href="${r.url}">${escapeHtml(r.title)}</a></h3>
          <div class="search-result-excerpt">${highlight(r.excerpt, query)}</div>
        </div>
      `).join('')}
    `;
  }

  function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
  }

  function getExcerpt(text, keyword, length) {
    const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
    if (idx === -1) return text.substring(0, length);
    const start = Math.max(0, idx - length / 2);
    return (start > 0 ? '…' : '') + text.substring(start, start + length) + (start + length < text.length ? '…' : '');
  }

  function highlight(text, keyword) {
    const escaped = escapeHtml(text);
    return escaped.replace(new RegExp('(' + escapeRegExp(keyword) + ')', 'gi'), '<mark>$1</mark>');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
});