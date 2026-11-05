# 更新日志 / Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 格式，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [2.0.0] - 2026-11-06

### 新增 / Added

- 🎡 **转盘模式**：Canvas 绘制的美食大转盘，与列表模式一键切换，转动动画 + 指针揭晓，自动适配明暗主题（参考 wheelofnames / meishi-wheel）
  Canvas-based wheel mode with spin animation and pointer reveal, switchable with list mode (inspired by wheelofnames / meishi-wheel)
- 🎰 **抽奖滚动动画 + 庆祝特效**：列表模式结果以拉霸机方式滚动定格，揭晓时撒花庆祝
  Slot-machine rolling animation and celebration sparkles for list-mode results
- 🔁 **三种抽取模式**：普通（无重复）/ 排除 Elimination（选过的移出候选，直到抽完）/ 统计 Accumulate（允许重复选中）
  Three pick modes: Normal (unique) / Elimination / Accumulate (repeats allowed), inspired by Picker Wheel
- ⚖️ **防吃腻机制**：可排除最近 N 次抽中的菜，候选不足时自动回退纯随机并提示
  Anti-repeat: exclude dishes picked in the last N rounds, with graceful fallback
- 📋 **预设菜单模板**：家常菜 / 外卖 / 饮品 / 零食一键应用
  Built-in menu templates (home-style / takeout / drinks / snacks)
- 📤 **导入 / 导出**：菜单可导出为 txt 下载，或从 txt 导入
  Menu import/export as plain text
- 🔗 **分享链接**：菜单编码进 URL hash，一键复制分享；打开分享链接可一键加载
  Share links: menu encoded in URL hash with copy-and-load support
- 📊 **统计面板**：各菜品累计被选次数 Top 排行，可清空
  Stats panel: per-dish pick counts with reset
- 🕘 **历史增强**：历史上限 5 → 20 条，支持一键清空
  History raised from 5 to 20 records with a clear button
- 📱 **PWA 支持**：manifest + Service Worker，可安装到主屏、离线可用
  PWA support (manifest + Service Worker): installable and offline-capable

### 变更 / Changed

- 🧱 单文件 `index.html`（542 行）拆分为 `index.html` + `css/style.css` + `js/app.js` + `js/wheel.js`
  Monolithic `index.html` split into structure / styles / app logic / wheel component
- 🧰 新增开发工具链：ESLint、Prettier、html-validate、EditorConfig，`npm run lint` 一键检查
  Added dev toolchain: ESLint, Prettier, html-validate, EditorConfig
- 🤖 新增 GitHub Actions CI（lint + format check），与 Pages 部署工作流并存
  Added GitHub Actions CI for lint & format checks alongside the Pages deployment
- 🤝 新增社区文件：Issue/PR 模板、CONTRIBUTING、CODE_OF_CONDUCT、SECURITY
  Added community health files (issue/PR templates, contributing guide, code of conduct, security policy)

### 修复 / Fixed

- 📱 补充缺失的 `<meta name="viewport">`，移动端响应式真正生效
  Added the missing viewport meta tag — responsive layout now actually works on mobile
- 🛡 结果与历史渲染改用 DOM API / `textContent`，杜绝 `innerHTML` 拼接用户输入的 XSS 风险
  Result and history rendering now use DOM APIs / `textContent`, removing the `innerHTML` XSS risk
- ♿ 无障碍改进：数量输入与图标按钮补充 label / aria-label
  Accessibility: labels and aria-labels for the count input and icon-only buttons

## [1.0.0] - 2025-06-20

### 新增 / Added

- 🍱 首个版本：从自定义菜单列表随机选择菜品，中英双语自动检测、手动切换
  First release: random dish picker with bilingual (zh/en) auto-detection and manual toggle
- 🌙 跟随系统的明暗主题（可手动三态切换）
  System-following light/dark theme with manual tri-state toggle
- 💾 菜单列表、选择数量、选择历史（5 条）与语言/主题偏好自动保存
  Auto-saved menu, dish count, selection history (5 records) and language/theme preferences

[Unreleased]: https://github.com/ohto-ai/random_menu/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/ohto-ai/random_menu/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/ohto-ai/random_menu/releases/tag/v1.0.0
