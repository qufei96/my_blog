# NOTICE（注意事项 / 常见问题）

本文档汇总本项目开发与推送中踩过的坑及解决办法。遇到问题先查这里，再动手排查。

---

## 一、GitHub 网络与认证

### 1. 网络代理（GitHub 直连不稳定）

- **现象**：`git push` / `git fetch` 报 `Connection was reset` 或 `Failed to connect to github.com port 443`
- **原因**：GitHub 在本网络环境下直连不通，需要走本机系统代理
- **解决**（当前代理地址为系统设置中的 `127.0.0.1:7993`）：
  ```bash
  git config --global http.proxy http://127.0.0.1:7993
  git config --global https.proxy http://127.0.0.1:7993
  ```
- **注意**：代理地址可能变化。如果推送又出现连接失败，先去「系统设置 → 网络 → 代理」查看当前代理地址，再用上面的命令更新。

### 2. 推送认证（个人访问令牌 PAT）

- **现象**：`git push` 报 `could not read Username` / `invalid credential line`，且无法弹出 GitHub 登录窗口
- **原因**：本机的 Git Credential Manager (GCM) 工作异常（发出 `invalid credential line` 警告），且对话终端没有交互输入，无法手动输账号密码
- **解决**（一次性配置，之后无需重复）：
  1. 在 GitHub 网页创建令牌：头像 → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**，勾选 **`repo`**（私有仓库读写权限），生成后复制以 `ghp_` 开头的令牌
  2. 保存令牌到本地：
     ```bash
     git config --local credential.helper store
     printf 'protocol=https\nhost=github.com\nusername=qufei96\npassword=你的令牌\n' | git credential approve
     ```
  3. 推送：`git push`（之后无需再输凭据）
- **注意**：
  - 令牌**明文**存放在 `~/.git-credentials`，仅限个人电脑使用
  - 令牌可随时在 GitHub 网页上 **Revoke（撤销）**；撤销后需重新生成并重新执行上面的保存命令
  - 通过 `!` 前缀粘贴令牌时，**务必保持单行、不要在 `\n` 前加空格**，否则 git 读不到有效凭据（`unable to read credential from stdin`）

### 3. 对话中执行命令（`!` 前缀）

- `! 命令` 会在当前会话终端执行，但**没有交互输入**（`/dev/tty` 不可用）
- 需要交互的命令（如手动输用户名/密码、交互式登录）**无法**通过 `!` 完成，必须改用令牌等非交互方式

### 4. PyCharm 使用提醒

- **提交时新文件不会自动包含**：PyCharm 的 Commit 面板里，「未跟踪的新文件」（如新增的 `NOTICE.md`）默认不在提交列表，需要**手动勾选**，否则会漏提交（曾发生：提交信息写了「新增 NOTICE 文档」，实际 NOTICE.md 没提交进去）
- **推送会卡住、无弹窗**：PyCharm 推送私有仓库时会尝试弹出 GitHub 登录窗口，但由于本机 GCM 失效，会**一直转圈无弹窗**。稳妥做法：在 PyCharm 里只做**提交（Commit）**，推送用终端：
  ```
  ! git push
  ```
- **`.idea/` 目录**：PyCharm 打开项目时自动生成，属本机 IDE 配置，已加入根 `.gitignore`，**不要提交**
- 提交前在 Commit 面板确认文件清单，避免漏提交或误提交 IDE/缓存文件

---

## 二、Hexo 构建问题

### 1. `package.json` 必须含 `hexo` 字段

- **现象**：`hexo generate` 只输出 help/init/version，不执行实际构建
- **原因**：hexo-cli 靠 `package.json` 的 `"hexo"` 字段识别 Hexo 项目根
- **解决**：`blog/package.json` 中保留：
  ```json
  "hexo": {
    "version": "8.1.2"
  }
  ```

### 2. 主题 `_config.yml` 的 YAML 陷阱

- **颜色值必须加引号**：`background: '#fffdf7'`。不加引号时 `#` 会被 YAML 当作注释，值解析为 `null`，页面内联样式渲染为空
- **字体列表必须用流式序列**：`primary: ['Georgia', 'Source Han Serif SC', serif]`。写成逗号分隔（`'Georgia', 'Source Han Serif SC', serif`）是**非法 YAML**，会导致整份主题配置解析失败，所有 `theme.custom.*` 取值全部失效
- **改配置后快速验证**（在 `blog/` 下运行）：
  ```bash
  node -e "const Y=require('js-yaml');Y.load(require('fs').readFileSync('themes/citizen/_config.yml','utf8'));console.log('YAML OK')"
  ```

### 3. 模板取值路径

- `design:` 在主题配置里**嵌套于 `custom:` 下**，正确取值是 `theme.custom.design.background` 等，**不是** `theme.design.*`（后者取不到，会渲染报错或为空）
- 不要用 `asset_img` 助手（Hexo 没有），头像等图片用：`image_tag('/images/avatar.PNG', { alt: '...', class: '...' })`
- 不要用 `feed_link` 助手（hexo-generator-feed v4 不提供）；RSS 链接由该插件的 `after_render:html` 过滤器自动注入 `<head>`

### 4. CSS/JS 引用路径

- 用标准引用：`url_for('/css/style.css')`、`url_for('/js/main.js')`
- **不要**写 `/themes/citizen/source/...` 这种绝对路径（不经 Hexo 资源管线，产物中不存在该路径）
- `source/css/*.styl` 经 hexo-renderer-stylus 编译到 `public/css/`；`source/js/*.js` 复制到 `public/js/`

### 5. 构建与清理

- 构建命令都在 `blog/` 目录下执行：`npm run build`（hexo generate）、`npm start`（hexo server，默认 4000 端口）
- 改了样式/配置后不生效时，先 `hexo clean` 再构建（有 `db.json` 缓存）

---

## 三、项目结构注意点

- `blog/` 是真正的工作区（本站点源码 + 主题）
- `blog/blog/`（含 `blog/blog/blog/`）是已弃用的 `hexo init` 脚手架残留（含旧版完整依赖与另一版主题），已在 `blog/.gitignore` 排除，**不要修改**
- 根目录 `.claude/`、`.superpowers/` 是本地工具状态，已在根 `.gitignore` 排除，**不要提交**
- 提交前建议先 `git status` 确认没有 `node_modules/`、`public/`、`.claude/` 混入

---

## 四、待办（未完成项）

- 部署未配置（`_config.yml` 的 `deploy.type` 为空）；Waline 评论、百度/谷歌统计等外部服务待配置
- 站点目前只有示例文章 `hello-world.md` 和示例「关于」页，真实内容待写

## 五、已解决的坑与注意点

- **文章目录（TOC）**：hexo-renderer-marked v7 不再生成 `page.toc`，目录已改为客户端方案——`main.js` 的 `buildToc` 从正文 `h2/h3` 构建 `#toc-list`，无标题时自动隐藏；不要再尝试用 `page.toc` 做服务端渲染
- **hexo-server 中文 URL**：直接访问未编码的中文路径（如 `/categories/技术/`）会报 500（`URIError: URI malformed`）。浏览器会自动百分号编码，正常访问没问题；仅 curl/脚本直接发原始中文时触发，属 hexo-server 缺陷，静态部署不受影响
- 分类/标签/归档/关于/搜索页面现已可用：`page`/`category`/`tag`/`archive` 布局模板在 `themes/citizen/layout/`；搜索为客户端搜索（`search.js` 读取 `/search.xml`）；关于页在 `source/about/index.md`
