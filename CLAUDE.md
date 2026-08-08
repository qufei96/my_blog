# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

「比奇堡热心市民」的个人博客，基于 Hexo 静态站点生成器，使用自定义主题 `citizen`（经典文学风格：暖色纸张背景、衬线字体、双栏响应式布局）。站点语言为中文（zh-CN）。设计规格与实现计划见 `docs/superpowers/`。开发与推送中遇到的坑及解决办法见 `NOTICE.md`（代理/令牌、Hexo 构建、YAML 陷阱等）。

## 常用命令

以下命令均在 `blog/` 目录下执行：

- `npm run build` — 生成静态站点（`hexo generate`），输出到 `blog/public/`
- `npm start` — 启动本地预览服务器（`hexo server`，默认 http://localhost:4000）
- `npm run clean` — 清理缓存与生成产物（`hexo clean`）
- `npm run deploy` — 部署（当前 `_config.yml` 中 `deploy.type` 为空，尚未配置）
- `npx hexo new "文章标题"` — 新建文章（Markdown，位于 `source/_posts/`）

## 架构

- `blog/` 是 Hexo 站点根目录（当前开发中的工作区）：
  - `_config.yml` — Hexo 主配置：站点信息、主题、搜索与 RSS 插件
  - `source/` — 内容源：`_posts/` 存放 Markdown 文章，`images/` 存放本地图片
  - `themes/citizen/` — 自定义主题（核心开发对象）：
    - `_config.yml` — 主题配置，分两个顶层段：`custom:`（含 `header`/`sidebar`/`post` 功能开关，以及嵌套在其中的 `design:` 配色/字体/宽度断点）和 `external:`（评论/统计/分享）
    - `layout/` — EJS 模板：`layout.ejs` 为主布局，`index.ejs`/`post.ejs`/`search.ejs` 为页面，`_partial/` 为可复用片段（header/sidebar/footer/article/comments/pagination）
    - `source/css/` — Stylus 样式（`style.styl` 主样式、`responsive.styl` 响应式）
    - `source/js/` — 原生 JS（`main.js`、`responsive.js`、`search.js`）
- `docs/superpowers/` — 设计规格（`specs/`）与实现计划（`plans/`），是主题设计与功能的权威参考，改动前先对照
- `blog/blog/`（含 `blog/blog/blog/`）— 早期 `hexo init` 脚手架的残留目录（含完整依赖与另一版 citizen 主题），已弃用，请勿修改或当作工作区
- 仓库根目录 `themes/citizen/` — 空占位目录，与 `blog/themes/citizen/` 无关

## 主题开发要点

- 模板通过 `theme.custom.*`、`theme.external.*` 读取主题配置（对应 `themes/citizen/_config.yml` 的 `custom:`/`external:` 段），例如 `theme.custom.header.logo_text`、`theme.custom.design.background`、`theme.external.comment.waline.server_url`
- 主题 `_config.yml` 的 YAML 陷阱：颜色值必须用引号包裹（`background: '#fffdf7'`），否则 `#` 会被当成注释使值解析为 null；字体列表需用流式序列 `['Georgia', 'Source Han Serif SC', serif]`
- RSS 链接由 hexo-generator-feed v4 的 `after_render:html` 过滤器自动注入 `<head>`（读取主配置 `feed.path`/`feed.type`），模板无需手动处理
- `layout.ejs` 中 CSS/JS 以 `url_for('/css/style.css')`、`url_for('/js/main.js')` 引用：`style.styl`/`responsive.styl` 经 hexo-renderer-stylus 编译到 `public/css/`，`source/js/*.js` 复制到 `public/js/`
- 设计规范（色彩、字体、断点）见 `docs/superpowers/specs/`，改样式前先对照
- 文章 Front Matter 使用 `categories`/`tags` 分类；`<!-- more -->` 标记用于首页摘要截断

## 当前状态与注意点

- 依赖已补齐（hexo 8.1.2 + EJS/Stylus/Marked 渲染器 + 各生成器），`npm run build` 可直接运行。注意 `blog/package.json` 必须含 `"hexo": {"version": "..."}` 字段——hexo-cli 靠它识别 Hexo 项目根，缺失时 `hexo generate` 等命令不会被加载
- `blog/` 尚未提交到 git（仓库目前只有 `docs/` 的首次提交）
- 主题的评论/分享/统计等外部服务默认关闭，通过 `themes/citizen/_config.yml` 的 `external:` 段开启
- 头部导航（`_partial/header.ejs`）行为特殊：首页把最近 10 篇文章标题当导航链接，其他页面列出所有 `hide !== true` 的站点页面，并非固定菜单
- 主题目前只实现了 `index`/`post`/`search` 三个页面布局（`layout/` 目录）；`page`/`category`/`tag`/`archive` 模板尚未创建。主配置虽已声明 `tag_dir`/`archive_dir`/`category_dir` 及主题 `layout:` 映射，但分类/标签/归档页面暂无法渲染（实现计划见 `docs/superpowers/plans/`）
- 评论（Waline）的客户端初始化脚本与配套样式整体内联在 `_partial/comments.ejs`，读取 `theme.external.comment.waline.*`
