# 贡献指南 / Contributing Guide

感谢你对 **Random Menu** 的关注！欢迎以 Issue 和 Pull Request 的形式参与贡献。
Thank you for your interest in **Random Menu**! Contributions via issues and pull requests are welcome.

## 🛠 本地开发 / Local Development

环境要求 / Requirements: **Node.js ≥ 18**, npm ≥ 9.

```bash
git clone https://github.com/ohto-ai/random_menu.git
cd random_menu
npm install        # 安装开发依赖 / install dev dependencies
npm run serve      # 启动本地服务 http://localhost:8080
npm run lint       # ESLint + html-validate
npm run format     # Prettier 格式化
npm run format:check
```

本项目是**零依赖的纯静态应用**：`npm run dev` 不存在，无需构建步骤，直接修改源码后刷新浏览器即可。
This is a **dependency-free static app**: there is no build step — edit the source and refresh the browser.

## 📁 项目结构 / Project Structure

```
random_menu/
├── index.html            # 页面结构 / page structure
├── css/style.css         # 样式 / styles
├── js/app.js             # 列表模式逻辑 / list-mode logic
├── js/wheel.js           # Canvas 转盘组件 / canvas wheel component
├── sw.js                 # Service Worker（PWA）
├── manifest.webmanifest  # PWA manifest
└── scripts/              # 开发辅助脚本 / dev helper scripts
```

## 🎨 代码约定 / Coding Conventions

1. **风格检查**：提交前请确保 `npm run lint` 与 `npm run format:check` 通过（CI 会做同样的检查）。
   Make sure `npm run lint` and `npm run format:check` pass before submitting — CI runs the same checks.
2. **双语文案**：所有面向用户的界面文案必须同时提供中文和英文，统一放在 `js/app.js` 的 `translations` 对象中。
   All user-facing strings must exist in both Chinese and English inside the `translations` object in `js/app.js`.
3. **安全性**：不要用 `innerHTML` 拼接用户输入；使用 `textContent` / DOM API 构建节点。
   Never build markup from user input with `innerHTML`; use `textContent` / DOM APIs.
4. **零依赖**：运行时不引入任何第三方库或构建工具，保持"打开即用"。
   No runtime dependencies or build tools — keep it "open and use".
5. **兼容性**：不破坏已有 `localStorage` 键的语义（`menuList` / `dishCount` / `mealHistory` 等）。
   Do not break the semantics of existing `localStorage` keys (`menuList` / `dishCount` / `mealHistory`, etc.).
6. **提交信息**：遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)，如 `feat: add wheel mode`、`fix: ...`、`docs: ...`。
   Follow [Conventional Commits](https://www.conventionalcommits.org/), e.g. `feat: add wheel mode`.

## 🔄 贡献流程 / Workflow

1. Fork 仓库并创建功能分支：`git checkout -b feat/my-feature`
   Fork the repo and create a feature branch.
2. 实现改动并自行测试核心流程（抽取、语言切换、主题切换、移动端布局）。
   Implement and test the core flows yourself (picking, language/theme toggles, mobile layout).
3. 提交并推送，然后创建 Pull Request，按模板填写说明。
   Push and open a pull request using the template.
4. CI 通过且讨论无异议后合并。
   A maintainer merges once CI passes and the discussion settles.

## 🐛 报告问题 / Reporting Issues

- 提交缺陷请使用 [Bug 报告模板](https://github.com/ohto-ai/random_menu/issues/new?template=bug_report.yml)。
  Use the bug report template.
- 功能建议请使用 [功能建议模板](https://github.com/ohto-ai/random_menu/issues/new?template=feature_request.yml)。
  Use the feature request template.
- 安全漏洞请勿公开提交，见 [SECURITY.md](SECURITY.md)。
  For security vulnerabilities, do **not** open a public issue — see [SECURITY.md](SECURITY.md).
