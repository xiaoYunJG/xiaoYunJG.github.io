# 我的技术博客

一个可直接部署到 GitHub Pages 的中文个人技术博客，使用 [Hexo](https://hexo.io/) 和 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 主题构建。页面包含响应式导航、首页 Banner、文章分页、分类/标签/归档、自动目录、代码复制、本地搜索与深色模式。

## 环境要求

- [Node.js](https://nodejs.org/) 20 或更高版本（推荐 LTS）
- npm（随 Node.js 安装）
- Git（用于推送到 GitHub）

在 Windows PowerShell 检查版本：

```powershell
node --version
npm.cmd --version
git --version
```

> 如果 PowerShell 报 `npm.ps1` 执行策略错误，请把下文中的 `npm` 替换为 `npm.cmd`，或使用 `npm.cmd` 运行命令。

## 安装与本地启动

在项目目录打开 PowerShell 后运行：

```powershell
npm.cmd install
npm.cmd run dev
```

浏览器访问终端显示的本地地址，通常是 `http://localhost:4000`。开发服务会监视文章与配置修改；修改 `_config.yml` 或 `_config.fluid.yml` 后，建议停止服务并重新运行 `npm.cmd run dev`。

常用命令：

```powershell
npm.cmd run clean  # 清理 Hexo 缓存和生成目录
npm.cmd run build  # 生成 public 静态网站
npm.cmd run deploy # 本地构建；推送 main 后由 GitHub Actions 自动部署
```

## 创建新文章

用 Hexo 命令新建一篇文章：

```powershell
npx.cmd hexo new "我的新文章"
```

文章会生成在 `source/_posts/`。在文章顶部填写 Front Matter：

```yaml
---
title: 我的新文章
date: 2026-07-17 20:00:00
categories:
  - Go
tags:
  - Slice
excerpt: 这里是一段会显示在首页的文章摘要。
index_img: /img/post-cover.svg
---
```

随后用 Markdown 正文写作。文章内的本地图片建议放在 `source/img/`，引用时写 `/img/文件名.png`。

## 修改个人信息

所有基础个人信息已集中在项目根目录的 [_config.yml](_config.yml) 顶部：

- `title`：博客标题
- `subtitle`：博客副标题
- `author`：作者名称
- `url` 与 `root`：部署地址（最重要）

主题展示相关内容放在 [_config.fluid.yml](_config.fluid.yml)：

- 顶部导航的 `navbar.menu`
- 首页背景的 `index.banner_img`
- 主题默认配色模式的 `color_scheme`（`light`、`dark` 或 `auto`）
- 社交链接的 `social`

“关于”页头像由 `_config.fluid.yml` 的 `about.avatar` 管理，当前使用 `source/img/avatar.svg` 本地占位图。替换时将自己的图片放入 `source/img/`，然后把 `avatar: /img/avatar.svg` 改为对应路径。个人资料不要写入 `node_modules`。

## 更换首页背景图

1. 将自己的图片复制到 `source/img/`，例如 `source/img/home-banner.jpg`。
2. 打开 [_config.fluid.yml](_config.fluid.yml)。
3. 将 `index.banner_img: /img/home-banner.svg` 改为：

```yaml
index:
  banner_img: /img/home-banner.jpg
```

建议使用宽度至少 1600px 的压缩图片。当前提供的 `home-banner.svg`、`page-banner.svg`、`post-banner.svg` 与 `post-cover.svg` 都是本地原创占位图，可以直接替换。

## 修改导航栏和主题颜色

导航栏在 `_config.fluid.yml` 的 `navbar.menu` 中。每项格式如下：

```yaml
- { key: '关于', link: '/about/', icon: 'iconfont icon-user-fill' }
```

增加或移除项目后重新启动本地服务确认。站点的项目级样式在 [source/css/custom.css](source/css/custom.css)，它通过 Fluid 的 `custom_css` 配置加载；项目级交互在 [source/js/custom.js](source/js/custom.js)，通过 `custom_js` 配置加载。需要调整强调色时，修改 CSS 顶部的 `--gocoder-accent`。

## 修改 GitHub 用户名和部署地址

这个仓库按个人主页仓库 `goCoder.github.io` 配置，因此当前值为：

```yaml
url: https://gocoder.github.io
root: /
```

请将 `goCoder` 替换为你真实的 GitHub 用户名。GitHub Pages 域名通常会转为小写；推荐写成小写域名。若部署到项目仓库 `YOUR_GITHUB_USERNAME.github.io/blog`，必须同时改成：

```yaml
url: https://YOUR_GITHUB_USERNAME.github.io/blog
root: /blog/
```

这样生成的站内链接、静态资源和分页路径都会带上正确前缀。

## 创建 GitHub 仓库并推送

1. 登录 GitHub，点击右上角 **New repository**。
2. 若要使用根域名站点，仓库名必须严格为 `YOUR_GITHUB_USERNAME.github.io`。
3. 创建仓库时不要初始化 README、`.gitignore` 或 License，以免第一次推送产生额外合并。
4. 在本地项目目录执行以下命令（将占位地址改为自己的仓库地址）：

```powershell
git init
git add .
git commit -m "feat: initialize Hexo Fluid blog"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_GITHUB_USERNAME.github.io.git
git push -u origin main
```

已经有 Git 仓库时，不要重复 `git init`；只需检查远程地址并推送：

```powershell
git remote -v
git add .
git commit -m "feat: update blog"
git push origin main
```

## 开启 GitHub Pages 自动部署

工作流文件已在 [.github/workflows/pages.yml](.github/workflows/pages.yml)，会在 `main` 分支推送或手动触发时：安装依赖、构建 `public`、上传 Pages Artifact 并使用官方 Actions 发布。

首次推送后：

1. 打开 GitHub 仓库的 **Settings** → **Pages**。
2. 在 **Build and deployment** 的 **Source** 选择 **GitHub Actions**。
3. 打开 **Actions** 页，选择 `Deploy Hexo site to Pages`，等待工作流完成。
4. 完成后访问 `https://YOUR_GITHUB_USERNAME.github.io/`。

工作流已声明 `contents: read`、`pages: write` 和 `id-token: write` 权限，并使用 `github-pages` environment 与并发保护，避免重复部署互相覆盖。

## 部署失败排查

1. **`npm ci` 失败**：确认 `package-lock.json` 已提交。修改依赖后，在本地运行 `npm.cmd install`，再提交新锁文件。
2. **页面 404 或图片丢失**：检查 `_config.yml` 的 `url`、`root` 是否与仓库类型匹配；个人主页仓库使用 `root: /`。
3. **构建错误**：先运行 `npm.cmd run clean`，再运行 `npm.cmd run build`。检查文章 Front Matter 的 YAML 缩进和日期格式。
4. **Actions 没有部署**：检查分支是否确实为 `main`，并确认 Settings → Pages 的 Source 为 **GitHub Actions**。
5. **网站还没刷新**：等待 Actions 结束后刷新页面；GitHub Pages 的 CDN 更新可能需要一点时间。

## 查看 GitHub Actions 日志

进入 GitHub 仓库顶部的 **Actions** 标签，选择最近一次 `Deploy Hexo site to Pages` 工作流，再点开 `build` 或 `deploy` 作业即可看到每一步日志。构建失败时，优先查看 **Install dependencies** 和 **Build static site** 两个步骤的错误信息。
