# 比奇堡热心市民博客 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个经典文学风格的个人博客网站，支持文章发布、评论、搜索、RSS 订阅等功能。

**Architecture:** 使用 Hexo 静态网站生成器，基于 Apollo 主题骨架进行深度定制，创建自定义主题 "citizen"，实现经典文学风格的双栏响应式布局。

**Tech Stack:** Hexo 7.x, EJS, Stylus, Waline, hexo-generator-search, hexo-generator-feed

---

## Task 1: 项目初始化

**Files:**
- Create: `blog/package.json`
- Create: `blog/_config.yml`
- Create: `blog/.gitignore`

- [ ] **Step 1: 创建项目目录并初始化 Hexo**

```bash
mkdir -p blog
cd blog
npm init -y
```

- [ ] **Step 2: 安装 Hexo 核心依赖**

```bash
npm install hexo --save
```

- [ ] **Step 3: 创建 Hexo 配置文件**

Create: `blog/_config.yml`

```yaml
# Site
title: 比奇堡热心市民
subtitle: 记录生活与技术的点滴
description: 比奇堡热心市民的个人博客
author: 比奇堡热心市民
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://your-domain.com
root: /
permalink: posts/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md
default_layout: post
titlecase: false
external_link: true
filename_case: 0
render_drafts: false
post_asset_folder: true
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
per_page: 10
pagination_dir: page

# Extensions
theme: citizen

# Deployment
deploy:
  type: ''
```

- [ ] **Step 4: 创建 .gitignore 文件**

Create: `blog/.gitignore`

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

- [ ] **Step 5: 创建 source 目录结构**

```bash
mkdir -p source/_posts
mkdir -p source/images
```

- [ ] **Step 6: 创建示例文章**

Create: `blog/source/_posts/hello-world.md`

```markdown
---
title: Hello World
date: 2024-01-15 10:00:00
categories:
  - 技术
tags:
  - 博客
  - Hexo
---

欢迎来到我的博客！这是第一篇文章。

## 关于本博客

这是一个使用 Hexo 搭建的个人博客，采用经典文学风格设计。

<!-- more -->

感谢您的访问！
```

- [ ] **Step 7: 验证 Hexo 安装**

```bash
npx hexo version
```

Expected: 显示 Hexo 版本信息

- [ ] **Step 8: 提交初始化**

```bash
git init
git add .
git commit -m "chore: initialize hexo blog project"
```

---

## Task 2: 创建主题目录结构

**Files:**
- Create: `blog/themes/citizen/_config.yml`
- Create: `blog/themes/citizen/languages/zh-CN.yml`

- [ ] **Step 1: 创建主题目录**

```bash
mkdir -p themes/citizen/layout
mkdir -p themes/citizen/layout/_partial
mkdir -p themes/citizen/source/css
mkdir -p themes/citizen/source/js
mkdir -p themes/citizen/source/fonts
mkdir -p themes/citizen/languages
```

- [ ] **Step 2: 创建主题配置文件**

Create: `blog/themes/citizen/_config.yml`

```yaml
# 主题配置
# Theme Config

# 菜单配置
menu:
  首页: /
  归档: /archives
  分类: /categories
  标签: /tags
  关于: /about

# 侧边栏设置
sidebar:
  position: right
  display:
    - profile
    - categories
    - tags

# 个人信息
profile:
  avatar: /images/avatar.png
  author: 比奇堡热心市民
  bio: 记录生活与技术的点滴

# 社交链接
social:
  github: https://github.com/yourusername
  email: mailto:your@email.com

# 评论系统 (Waline)
waline:
  enable: true
  serverURL: https://your-waline-server.vercel.app
  placeholder: 说点什么吧...

# 搜索
search:
  enable: true

# RSS
rss:
  enable: true

# 数据统计
analytics:
  baidu:
    enable: false
    id: ''
  google:
    enable: false
    id: ''

# 页脚
footer:
  since: 2024
  powered: true
```

- [ ] **Step 3: 创建中文语言文件**

Create: `blog/themes/citizen/languages/zh-CN.yml`

```yaml
menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于

post:
  read_more: 阅读全文
  reading_time: 阅读约 %d 分钟
  posted_on: 发布于
  updated_at: 更新于
  in: 分类
  visitors: 阅读次数
  share: 分享

archive:
  total: 共 %d 篇文章

sidebar:
  categories: 分类
  tags: 标签
  recent_posts: 最新文章

search:
  placeholder: 搜索...
  no_results: 没有找到相关结果

footer:
  powered_by: 由 %s 驱动
  theme: 主题
```

- [ ] **Step 4: 创建主题配置文件链接**

Create: `blog/_config.citizen.yml`

```yaml
# 从 themes/citizen/_config.yml 复制内容
# 此文件用于覆盖主题配置
```

- [ ] **Step 5: 提交主题初始化**

```bash
git add .
git commit -m "feat(theme): initialize citizen theme structure"
```

---

## Task 3: 创建基础布局模板

**Files:**
- Create: `blog/themes/citizen/layout/layout.ejs`
- Create: `blog/themes/citizen/layout/_partial/head.ejs`
- Create: `blog/themes/citizen/layout/_partial/header.ejs`

- [ ] **Step 1: 创建主布局文件**

Create: `blog/themes/citizen/layout/layout.ejs`

```html
<!DOCTYPE html>
<html lang="<%= config.language %>">
<head>
  <%- partial('_partial/head') %>
</head>
<body>
  <div class="container">
    <%- partial('_partial/header') %>
    <main class="main">
      <div class="content-wrapper">
        <%- body %>
      </div>
      <%- partial('_partial/sidebar') %>
    </main>
    <%- partial('_partial/footer') %>
  </div>
  <%- partial('_partial/scripts') %>
</body>
</html>
```

- [ ] **Step 2: 创建 head 部分**

Create: `blog/themes/citizen/layout/_partial/head.ejs`

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<% if (page.description) { %>
<meta name="description" content="<%= page.description %>">
<% } else if (config.description) { %>
<meta name="description" content="<%= config.description %>">
<% } %>

<meta name="author" content="<%= config.author %>">

<title><% if (page.title) { %><%= page.title %> - <% } %><%= config.title %></title>

<!-- Favicon -->
<link rel="icon" href="<%= url_for('/images/favicon.ico') %>">

<!-- CSS -->
<link rel="stylesheet" href="<%= url_for('/css/style.css') %>">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet">

<!-- Open Graph -->
<% if (page.title) { %>
<meta property="og:title" content="<%= page.title %>">
<meta property="og:type" content="article">
<meta property="og:url" content="<%= url %>">
<% } %>

<!-- RSS -->
<% if (theme.rss && theme.rss.enable) { %>
<link rel="alternate" href="<%= url_for('/atom.xml') %>" title="<%= config.title %>" type="application/atom+xml">
<% } %>

<!-- Analytics -->
<% if (theme.analytics.baidu.enable && theme.analytics.baidu.id) { %>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?<%= theme.analytics.baidu.id %>";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
<% } %>

<% if (theme.analytics.google.enable && theme.analytics.google.id) { %>
<script async src="https://www.googletagmanager.com/gtag/js?id=<%= theme.analytics.google.id %>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '<%= theme.analytics.google.id %>');
</script>
<% } %>
```

- [ ] **Step 3: 创建 header 部分**

Create: `blog/themes/citizen/layout/_partial/header.ejs`

```html
<header class="header">
  <div class="header-inner">
    <div class="site-info">
      <h1 class="site-title">
        <a href="<%= url_for() %>"><%= config.title %></a>
      </h1>
      <% if (config.subtitle) { %>
      <p class="site-subtitle"><%= config.subtitle %></p>
      <% } %>
    </div>

    <nav class="nav">
      <% for (var name in theme.menu) { %>
      <a class="nav-link<% if (is_current(theme.menu[name])) { %> active<% } %>" href="<%= url_for(theme.menu[name]) %>">
        <%= name %>
      </a>
      <% } %>
    </nav>

    <% if (theme.search && theme.search.enable) { %>
    <div class="search">
      <button class="search-toggle" aria-label="搜索">
        <svg class="icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
      <div class="search-popup">
        <input type="text" class="search-input" placeholder="<%= __('search.placeholder') %>">
        <div class="search-results"></div>
      </div>
    </div>
    <% } %>
  </div>
</header>
```

- [ ] **Step 4: 验证模板语法**

```bash
cd blog && npx hexo generate --bail 2>&1 | head -20
```

Expected: 可能报错缺少其他模板，这是正常的

- [ ] **Step 5: 提交基础布局**

```bash
git add .
git commit -m "feat(theme): add base layout templates"
```

---

## Task 4: 创建页面模板

**Files:**
- Create: `blog/themes/citizen/layout/index.ejs`
- Create: `blog/themes/citizen/layout/post.ejs`
- Create: `blog/themes/citizen/layout/page.ejs`
- Create: `blog/themes/citizen/layout/archive.ejs`
- Create: `blog/themes/citizen/layout/_partial/post-card.ejs`

- [ ] **Step 1: 创建首页模板**

Create: `blog/themes/citizen/layout/index.ejs`

```html
<div class="posts">
  <% page.posts.each(function(post) { %>
    <%- partial('_partial/post-card', { post: post }) %>
  <% }) %>
</div>

<% if (page.total > 1) { %>
<nav class="pagination">
  <%- paginator({
    prev_text: '<i class="icon prev"></i>',
    next_text: '<i class="icon next"></i>'
  }) %>
</nav>
<% } %>
```

- [ ] **Step 2: 创建文章卡片组件**

Create: `blog/themes/citizen/layout/_partial/post-card.ejs`

```html
<article class="post-card">
  <h2 class="post-title">
    <a href="<%= url_for(post.path) %>"><%= post.title %></a>
  </h2>

  <div class="post-meta">
    <time class="post-date" datetime="<%= date(post.date, 'YYYY-MM-DD') %>">
      <%= date(post.date, 'YYYY-MM-DD') %>
    </time>

    <% if (post.categories && post.categories.length) { %>
    <span class="post-category">
      <%- __('post.in') %>
      <% post.categories.forEach(function(category) { %>
        <a href="<%= url_for(category.path) %>"><%= category.name %></a>
      <% }) %>
    </span>
    <% } %>

    <span class="post-reading-time">
      <%= __('post.reading_time', Math.ceil(post.content.replace(/<[^>]+>/g, '').length / 400)) %>
    </span>
  </div>

  <% if (post.excerpt) { %>
  <div class="post-excerpt">
    <%- post.excerpt %>
  </div>
  <a href="<%= url_for(post.path) %>" class="read-more"><%= __('post.read_more') %> →</a>
  <% } else { %>
  <div class="post-content">
    <%- post.content %>
  </div>
  <% } %>

  <% if (post.tags && post.tags.length) { %>
  <div class="post-tags">
    <% post.tags.forEach(function(tag) { %>
      <a href="<%= url_for(tag.path) %>" class="tag">#<%= tag.name %></a>
    <% }) %>
  </div>
  <% } %>
</article>
```

- [ ] **Step 3: 创建文章详情页模板**

Create: `blog/themes/citizen/layout/post.ejs`

```html
<article class="post">
  <header class="post-header">
    <h1 class="post-title"><%= page.title %></h1>
    <div class="post-meta">
      <time class="post-date" datetime="<%= date(page.date, 'YYYY-MM-DD') %>">
        <%= date(page.date, 'YYYY-MM-DD') %>
      </time>

      <% if (page.categories && page.categories.length) { %>
      <span class="post-category">
        <% page.categories.forEach(function(category) { %>
          <a href="<%= url_for(category.path) %>"><%= category.name %></a>
        <% }) %>
      </span>
      <% } %>

      <span class="post-reading-time">
        <%= __('post.reading_time', Math.ceil(page.content.replace(/<[^>]+>/g, '').length / 400)) %>
      </span>
    </div>
  </header>

  <div class="post-content">
    <%- page.content %>
  </div>

  <% if (page.tags && page.tags.length) { %>
  <footer class="post-footer">
    <div class="post-tags">
      <% page.tags.forEach(function(tag) { %>
        <a href="<%= url_for(tag.path) %>" class="tag">#<%= tag.name %></a>
      <% }) %>
    </div>
  </footer>
  <% } %>

  <!-- 分享按钮 -->
  <div class="share-buttons">
    <span><%= __('post.share') %>:</span>
    <button class="share-btn" data-share="weibo" title="分享到微博">微博</button>
    <button class="share-btn" data-share="wechat" title="分享到微信">微信</button>
    <button class="share-btn" data-share="copy" title="复制链接">复制链接</button>
  </div>

  <!-- 评论 -->
  <% if (theme.waline && theme.waline.enable) { %>
  <div class="comments">
    <div id="waline"></div>
  </div>
  <% } %>
</article>
```

- [ ] **Step 4: 创建独立页面模板**

Create: `blog/themes/citizen/layout/page.ejs`

```html
<article class="page">
  <header class="page-header">
    <h1 class="page-title"><%= page.title %></h1>
  </header>

  <div class="page-content">
    <%- page.content %>
  </div>
</article>
```

- [ ] **Step 5: 创建归档页模板**

Create: `blog/themes/citizen/layout/archive.ejs`

```html
<div class="archive">
  <h1 class="archive-title">
    <%= __('archive.total', site.posts.length) %>
  </h1>

  <div class="archive-posts">
    <% var last_year = null; %>
    <% site.posts.sort('date', -1).each(function(post) { %>
      <% var year = date(post.date, 'YYYY'); %>
      <% if (last_year !== year) { %>
        <% if (last_year !== null) { %>
          </div>
        <% } %>
        <h2 class="archive-year"><%= year %></h2>
        <div class="year-posts">
        <% last_year = year; %>
      <% } %>

      <article class="archive-post">
        <time class="archive-date" datetime="<%= date(post.date, 'YYYY-MM-DD') %>">
          <%= date(post.date, 'MM-DD') %>
        </time>
        <a href="<%= url_for(post.path) %>" class="archive-title"><%= post.title %></a>
      </article>
    <% }) %>
    <% if (last_year !== null) { %>
      </div>
    <% } %>
  </div>
</div>
```

- [ ] **Step 6: 提交页面模板**

```bash
git add .
git commit -m "feat(theme): add page layout templates"
```

---

## Task 5: 创建侧边栏和页脚

**Files:**
- Create: `blog/themes/citizen/layout/_partial/sidebar.ejs`
- Create: `blog/themes/citizen/layout/_partial/footer.ejs`
- Create: `blog/themes/citizen/layout/_partial/scripts.ejs`

- [ ] **Step 1: 创建侧边栏**

Create: `blog/themes/citizen/layout/_partial/sidebar.ejs`

```html
<aside class="sidebar">
  <% if (theme.sidebar.display.includes('profile')) { %>
  <section class="widget profile-widget">
    <div class="profile">
      <% if (theme.profile.avatar) { %>
      <img src="<%= url_for(theme.profile.avatar) %>" alt="<%= theme.profile.author %>" class="profile-avatar">
      <% } %>
      <h3 class="profile-author"><%= theme.profile.author %></h3>
      <% if (theme.profile.bio) { %>
      <p class="profile-bio"><%= theme.profile.bio %></p>
      <% } %>
      <% if (theme.social) { %>
      <div class="social-links">
        <% if (theme.social.github) { %>
        <a href="<%= theme.social.github %>" target="_blank" rel="noopener" aria-label="GitHub">
          <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <% } %>
        <% if (theme.social.email) { %>
        <a href="<%= theme.social.email %>" aria-label="Email">
          <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
        <% } %>
      </div>
      <% } %>
    </div>
  </section>
  <% } %>

  <% if (theme.sidebar.display.includes('categories')) { %>
  <section class="widget">
    <h4 class="widget-title"><%= __('sidebar.categories') %></h4>
    <ul class="category-list">
      <% site.categories.sort('name').forEach(function(category) { %>
        <li class="category-list-item">
          <a href="<%= url_for(category.path) %>">
            <%= category.name %> (<%= category.posts.length %>)
          </a>
        </li>
      <% }) %>
    </ul>
  </section>
  <% } %>

  <% if (theme.sidebar.display.includes('tags')) { %>
  <section class="widget">
    <h4 class="widget-title"><%= __('sidebar.tags') %></h4>
    <div class="tag-cloud">
      <% site.tags.sort('name').forEach(function(tag) { %>
        <a href="<%= url_for(tag.path) %>" class="tag-cloud-tag" style="font-size: <%= Math.min(Math.max(tag.posts.length / site.tags.length * 3, 0.8), 1.5) %>em">
          <%= tag.name %>
        </a>
      <% }) %>
    </div>
  </section>
  <% } %>
</aside>
```

- [ ] **Step 2: 创建页脚**

Create: `blog/themes/citizen/layout/_partial/footer.ejs`

```html
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-content">
      <span>&copy; <%= theme.footer.since || date(Date.now(), 'YYYY') %> <%= config.author %></span>

      <% if (theme.footer.powered) { %>
      <span class="footer-powered">
        <%- __('footer.powered_by', '<a href="https://hexo.io" target="_blank" rel="noopener">Hexo</a>') %>
        | <a href="https://github.com" target="_blank" rel="noopener">Citizen</a> <%= __('footer.theme') %>
      </span>
      <% } %>
    </div>
  </div>
</footer>

<!-- 返回顶部按钮 -->
<button class="back-to-top" aria-label="返回顶部">
  <svg class="icon" viewBox="0 0 24 24" width="20" height="20">
    <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
  </svg>
</button>
```

- [ ] **Step 3: 创建脚本部分**

Create: `blog/themes/citizen/layout/_partial/scripts.ejs`

```html
<!-- 搜索功能 -->
<% if (theme.search && theme.search.enable) { %>
<script src="<%= url_for('/js/search.js') %>"></script>
<% } %>

<!-- 分享功能 -->
<script src="<%= url_for('/js/share.js') %>"></script>

<!-- 返回顶部 -->
<script src="<%= url_for('/js/back-to-top.js') %>"></script>

<!-- 评论系统 -->
<% if (theme.waline && theme.waline.enable) { %>
<script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v2/dist/waline.css">
<script>
  Waline.init({
    el: '#waline',
    serverURL: '<%= theme.waline.serverURL %>',
    placeholder: '<%= theme.waline.placeholder %>',
    locale: 'zh-CN'
  });
</script>
<% } %>
```

- [ ] **Step 4: 提交侧边栏和页脚**

```bash
git add .
git commit -m "feat(theme): add sidebar, footer and scripts partials"
```

---

## Task 6: 创建分类和标签页面模板

**Files:**
- Create: `blog/themes/citizen/layout/category.ejs`
- Create: `blog/themes/citizen/layout/tag.ejs`

- [ ] **Step 1: 创建分类页模板**

Create: `blog/themes/citizen/layout/category.ejs`

```html
<div class="category-page">
  <h1 class="page-title">
    <%- __('menu.categories') %>: <%= page.category %>
  </h1>

  <div class="posts">
    <% page.posts.each(function(post) { %>
      <%- partial('_partial/post-card', { post: post }) %>
    <% }) %>
  </div>

  <% if (page.total > 1) { %>
  <nav class="pagination">
    <%- paginator({
      prev_text: '<i class="icon prev"></i>',
      next_text: '<i class="icon next"></i>'
    }) %>
  </nav>
  <% } %>
</div>
```

- [ ] **Step 2: 创建标签页模板**

Create: `blog/themes/citizen/layout/tag.ejs`

```html
<div class="tag-page">
  <h1 class="page-title">
    <%- __('menu.tags') %>: #<%= page.tag %>
  </h1>

  <div class="posts">
    <% page.posts.each(function(post) { %>
      <%- partial('_partial/post-card', { post: post }) %>
    <% }) %>
  </div>

  <% if (page.total > 1) { %>
  <nav class="pagination">
    <%- paginator({
      prev_text: '<i class="icon prev"></i>',
      next_text: '<i class="icon next"></i>'
    }) %>
  </nav>
  <% } %>
</div>
```

- [ ] **Step 3: 提交分类和标签模板**

```bash
git add .
git commit -m "feat(theme): add category and tag page templates"
```

---

## Task 7: 创建样式文件

**Files:**
- Create: `blog/themes/citizen/source/css/style.css`

- [ ] **Step 1: 创建基础样式变量**

Create: `blog/themes/citizen/source/css/style.css`

```css
/* ===== Variables ===== */
:root {
  /* Colors */
  --color-bg: #fffdf7;
  --color-text: #2c2c2c;
  --color-text-secondary: #555555;
  --color-text-muted: #8b8680;
  --color-border: #c9c4b8;
  --color-border-light: #e8e4db;
  --color-link: #a0522d;
  --color-link-hover: #8b4513;

  /* Typography */
  --font-serif: Georgia, 'Noto Serif SC', 'PingFang SC', 'Microsoft YaHei', serif;
  --font-sans: 'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 20px;
  --spacing-lg: 30px;
  --spacing-xl: 40px;

  /* Layout */
  --content-width: 720px;
  --sidebar-width: 240px;
  --header-height: 80px;

  /* Responsive */
  --breakpoint-sm: 768px;
  --breakpoint-md: 992px;
}

/* ===== Reset ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--color-link);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-link-hover);
}

img {
  max-width: 100%;
  height: auto;
}

/* ===== Container ===== */
.container {
  max-width: calc(var(--content-width) + var(--sidebar-width) + 80px);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* ===== Header ===== */
.header {
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  margin-bottom: var(--spacing-lg);
}

.header-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.site-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: 4px;
  margin-bottom: var(--spacing-xs);
}

.site-title a {
  color: var(--color-text);
}

.site-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 2px;
}

.nav {
  margin-top: var(--spacing-md);
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  font-size: 0.8125rem;
  color: var(--color-text);
  letter-spacing: 1px;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid transparent;
}

.nav-link:hover,
.nav-link.active {
  border-bottom-color: var(--color-border);
}

/* ===== Main Layout ===== */
.main {
  display: flex;
  gap: var(--spacing-xl);
  min-height: calc(100vh - var(--header-height) - 200px);
}

.content-wrapper {
  flex: 1;
  max-width: var(--content-width);
}

/* ===== Posts ===== */
.posts {
  display: flex;
  flex-direction: column;
}

.post-card {
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.post-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: var(--spacing-sm);
}

.post-title a {
  color: var(--color-text);
}

.post-title a:hover {
  color: var(--color-link);
}

.post-meta {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.post-meta > *::after {
  content: '·';
  margin-left: var(--spacing-sm);
}

.post-meta > *:last-child::after {
  display: none;
}

.post-excerpt {
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
}

.read-more {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--color-link);
}

.post-tags {
  margin-top: var(--spacing-sm);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  background: #f5f3ef;
  padding: 3px 10px;
  border-radius: 2px;
}

/* ===== Post Detail ===== */
.post {
  max-width: var(--content-width);
}

.post-header {
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--spacing-md);
}

.post .post-title {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.post-content {
  line-height: 1.8;
}

.post-content h1,
.post-content h2,
.post-content h3 {
  font-family: var(--font-serif);
  color: var(--color-text);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

.post-content h2 {
  font-size: 1.25rem;
}

.post-content h3 {
  font-size: 1.125rem;
}

.post-content p {
  margin-bottom: var(--spacing-md);
}

.post-content code {
  font-family: 'Fira Code', 'Source Code Pro', monospace;
  font-size: 0.875em;
  background: #f5f3ef;
  padding: 2px 6px;
  border-radius: 3px;
}

.post-content pre {
  background: #2c2c2c;
  color: #e8e4db;
  padding: var(--spacing-md);
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: var(--spacing-md);
}

.post-content pre code {
  background: transparent;
  padding: 0;
}

.post-content blockquote {
  border-left: 3px solid var(--color-border);
  padding-left: var(--spacing-md);
  margin: var(--spacing-md) 0;
  color: var(--color-text-muted);
  font-style: italic;
}

.post-content ul,
.post-content ol {
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-lg);
}

.post-content li {
  margin-bottom: var(--spacing-xs);
}

.post-content img {
  display: block;
  margin: var(--spacing-md) auto;
  border-radius: 4px;
}

.post-footer {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}

/* ===== Share Buttons ===== */
.share-buttons {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.share-btn {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  background: transparent;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.share-btn:hover {
  background: var(--color-border-light);
}

/* ===== Sidebar ===== */
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
}

.widget {
  margin-bottom: var(--spacing-lg);
}

.widget-title {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

/* Profile Widget */
.profile-widget {
  text-align: center;
  border: 1px solid var(--color-border-light);
  padding: var(--spacing-md);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: var(--spacing-sm);
}

.profile-author {
  font-size: 0.875rem;
  color: var(--color-text);
  font-weight: 400;
  margin-bottom: var(--spacing-xs);
}

.profile-bio {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.social-links a {
  color: var(--color-text-muted);
}

.social-links a:hover {
  color: var(--color-text);
}

/* Category & Tag Lists */
.category-list,
.tag-list {
  list-style: none;
}

.category-list-item,
.tag-list-item {
  margin-bottom: var(--spacing-xs);
}

.category-list-item a,
.tag-list-item a {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.category-list-item a:hover,
.tag-list-item a:hover {
  color: var(--color-link);
}

/* Tag Cloud */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag-cloud-tag {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.tag-cloud-tag:hover {
  color: var(--color-link);
}

/* ===== Archive ===== */
.archive-title {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-lg);
}

.archive-year {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.year-posts {
  border-left: 1px solid var(--color-border-light);
  padding-left: var(--spacing-md);
}

.archive-post {
  display: flex;
  align-items: baseline;
  margin-bottom: var(--spacing-sm);
}

.archive-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  width: 50px;
  flex-shrink: 0;
}

.archive-post .archive-title {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.archive-post .archive-title:hover {
  color: var(--color-link);
}

/* ===== Pagination ===== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.pagination .page-number,
.pagination .extend {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
}

.pagination .page-number:hover,
.pagination .extend:hover {
  background: var(--color-border-light);
}

.pagination .page-number.current {
  background: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

/* ===== Footer ===== */
.footer {
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
}

.footer-inner {
  text-align: center;
}

.footer-content {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.footer-powered {
  margin-left: var(--spacing-sm);
}

/* ===== Back to Top ===== */
.back-to-top {
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background: var(--color-border-light);
}

/* ===== Search ===== */
.search {
  position: relative;
  margin-top: var(--spacing-md);
}

.search-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  color: var(--color-text-muted);
}

.search-toggle:hover {
  color: var(--color-text);
}

.search-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: var(--spacing-md);
  border-radius: 4px;
  display: none;
  z-index: 100;
}

.search-popup.active {
  display: block;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border-light);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  outline: none;
}

.search-input:focus {
  border-color: var(--color-border);
}

.search-results {
  margin-top: var(--spacing-sm);
  max-height: 300px;
  overflow-y: auto;
}

.search-result-item {
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item a {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.search-no-results {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .sidebar {
    width: 180px;
  }
}

@media (max-width: 768px) {
  :root {
    --content-width: 100%;
  }

  .main {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    order: 2;
    margin-top: var(--spacing-lg);
  }

  .content-wrapper {
    max-width: 100%;
  }

  .header-inner {
    text-align: center;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .post .post-title {
    font-size: 1.5rem;
  }
}

/* ===== Comments ===== */
.comments {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}
```

- [ ] **Step 2: 验证样式文件**

```bash
cat blog/themes/citizen/source/css/style.css | head -50
```

Expected: 显示样式文件内容

- [ ] **Step 3: 提交样式文件**

```bash
git add .
git commit -m "feat(theme): add classic literature style CSS"
```

---

## Task 8: 创建 JavaScript 功能

**Files:**
- Create: `blog/themes/citizen/source/js/search.js`
- Create: `blog/themes/citizen/source/js/share.js`
- Create: `blog/themes/citizen/source/js/back-to-top.js`

- [ ] **Step 1: 创建搜索功能**

Create: `blog/themes/citizen/source/js/search.js`

```javascript
(function() {
  'use strict';

  // 搜索数据路径
  var searchPath = '/search.xml';
  var searchInput = document.querySelector('.search-input');
  var searchResults = document.querySelector('.search-results');
  var searchToggle = document.querySelector('.search-toggle');
  var searchPopup = document.querySelector('.search-popup');
  var searchData = null;

  // 切换搜索框
  if (searchToggle && searchPopup) {
    searchToggle.addEventListener('click', function(e) {
      e.preventDefault();
      searchPopup.classList.toggle('active');
      if (searchPopup.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // 点击外部关闭
    document.addEventListener('click', function(e) {
      if (!searchPopup.contains(e.target) && !searchToggle.contains(e.target)) {
        searchPopup.classList.remove('active');
      }
    });
  }

  // 加载搜索数据
  function loadSearchData(callback) {
    if (searchData) {
      callback(searchData);
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', searchPath, true);
    xhr.responseType = 'text';
    xhr.onload = function() {
      if (this.status === 200) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(this.responseText, 'text/xml');
        var entries = xml.querySelectorAll('entry');
        var data = [];

        entries.forEach(function(entry) {
          data.push({
            title: entry.querySelector('title').textContent,
            url: entry.querySelector('url').textContent,
            content: entry.querySelector('content').textContent.replace(/<[^>]+>/g, '').substring(0, 200)
          });
        });

        searchData = data;
        callback(searchData);
      }
    };
    xhr.send();
  }

  // 搜索
  function search(query) {
    if (!query || query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    loadSearchData(function(data) {
      var results = data.filter(function(item) {
        return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
               item.content.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">没有找到相关结果</div>';
        return;
      }

      var html = '';
      results.slice(0, 10).forEach(function(item) {
        html += '<div class="search-result-item"><a href="' + item.url + '">' + item.title + '</a></div>';
      });

      searchResults.innerHTML = html;
    });
  }

  // 绑定输入事件
  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        search(searchInput.value);
      }, 300);
    });
  }
})();
```

- [ ] **Step 2: 创建分享功能**

Create: `blog/themes/citizen/source/js/share.js`

```javascript
(function() {
  'use strict';

  var shareButtons = document.querySelectorAll('.share-btn');

  shareButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var type = this.getAttribute('data-share');
      var url = window.location.href;
      var title = document.title;

      switch (type) {
        case 'weibo':
          window.open(
            'https://service.weibo.com/share/share.php?url=' +
            encodeURIComponent(url) +
            '&title=' +
            encodeURIComponent(title),
            '_blank',
            'width=600,height=400'
          );
          break;

        case 'wechat':
          // 微信分享可以显示二维码
          alert('请截图分享到微信');
          break;

        case 'copy':
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function() {
              alert('链接已复制到剪贴板');
            });
          } else {
            var input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            alert('链接已复制到剪贴板');
          }
          break;
      }
    });
  });
})();
```

- [ ] **Step 3: 创建返回顶部功能**

Create: `blog/themes/citizen/source/js/back-to-top.js`

```javascript
(function() {
  'use strict';

  var backToTop = document.querySelector('.back-to-top');

  if (!backToTop) return;

  // 监听滚动
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // 点击返回顶部
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
```

- [ ] **Step 4: 提交 JavaScript 文件**

```bash
git add .
git commit -m "feat(theme): add search, share and back-to-top scripts"
```

---

## Task 9: 安装和配置 Hexo 插件

**Files:**
- Modify: `blog/package.json`
- Modify: `blog/_config.yml`

- [ ] **Step 1: 安装必要插件**

```bash
cd blog
npm install hexo-generator-search hexo-generator-feed hexo-generator-archive hexo-generator-category hexo-generator-tag hexo-renderer-ejs hexo-renderer-marked --save
```

- [ ] **Step 2: 更新配置文件添加插件设置**

追加到 `blog/_config.yml`:

```yaml
# 搜索
search:
  path: search.xml
  field: post
  content: true

# RSS
feed:
  type: atom
  path: atom.xml
  limit: 20

# 归档生成
archive_generator:
  per_page: 0
  yearly: true
  monthly: true

# 分类生成
category_generator:
  per_page: 10

# 标签生成
tag_generator:
  per_page: 10
```

- [ ] **Step 3: 验证插件安装**

```bash
cd blog && npm ls hexo-generator-search hexo-generator-feed
```

Expected: 显示已安装的插件版本

- [ ] **Step 4: 提交插件配置**

```bash
git add .
git commit -m "feat: add hexo plugins for search, feed and generators"
```

---

## Task 10: 创建关于页面和示例内容

**Files:**
- Create: `blog/source/about/index.md`
- Create: `blog/source/_posts/welcome.md`

- [ ] **Step 1: 创建关于页面**

Create: `blog/source/about/index.md`

```markdown
---
title: 关于
layout: page
---

## 关于我

欢迎来到我的博客！我是比奇堡热心市民。

这里是我记录生活和技术的地方。

## 联系方式

- GitHub: [yourusername](https://github.com/yourusername)
- Email: your@email.com

## 关于本博客

本博客使用 [Hexo](https://hexo.io) 构建，采用经典文学风格设计。
```

- [ ] **Step 2: 创建欢迎文章**

Create: `blog/source/_posts/welcome.md`

```markdown
---
title: 欢迎来到我的博客
date: 2024-01-15 10:00:00
categories:
  - 随笔
tags:
  - 博客
  - 开始
---

欢迎来到比奇堡热心市民的博客！

## 关于这个博客

这是我的个人博客，用于分享：

- 技术文章
- 生活随笔
- 学习笔记

## 博客特色

本博客采用经典文学风格设计，追求简洁优雅的阅读体验。

<!-- more -->

感谢您的访问，希望您能在这里找到有价值的内容。

## 联系我

如果您有任何问题或建议，欢迎通过以下方式联系我：

- 在文章下方留言
- 发送邮件到 my@email.com
- 访问我的 [GitHub](https://github.com)

期待与您交流！
```

- [ ] **Step 3: 提交示例内容**

```bash
git add .
git commit -m "content: add about page and welcome post"
```

---

## Task 11: 测试和验证

- [ ] **Step 1: 生成静态文件**

```bash
cd blog && npx hexo clean && npx hexo generate
```

Expected: 生成成功，无错误

- [ ] **Step 2: 启动本地服务器**

```bash
cd blog && npx hexo server
```

Expected: 服务器启动在 http://localhost:4000

- [ ] **Step 3: 验证页面**

打开浏览器访问 http://localhost:4000，检查：
- [ ] 首页正常显示
- [ ] 文章可以点击查看
- [ ] 导航链接正常
- [ ] 样式正确加载

- [ ] **Step 4: 停止服务器并提交最终版本**

```bash
# Ctrl+C 停止服务器
git add .
git commit -m "chore: final verification complete"
```

---

## 完成检查清单

- [ ] Hexo 项目初始化完成
- [ ] 主题目录结构创建完成
- [ ] 布局模板创建完成
- [ ] 样式文件创建完成
- [ ] JavaScript 功能实现完成
- [ ] 插件安装配置完成
- [ ] 示例内容创建完成
- [ ] 本地测试通过
