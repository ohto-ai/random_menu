# 安全策略 / Security Policy

## 支持的版本 / Supported Versions

| 版本 / Version | 支持 / Supported |
| -------------- | ---------------- |
| 2.x            | ✅               |
| < 2.0          | ❌               |

## 报告漏洞 / Reporting a Vulnerability

请**不要**通过公开 Issue、Pull Request 或 Discussion 报告安全漏洞。
Please do **not** report security vulnerabilities through public GitHub issues, pull requests, or discussions.

推荐方式 / Preferred channel:

1. 使用 GitHub 的 [私下报告漏洞](https://github.com/ohto-ai/random_menu/security/advisories/new) 功能；
   Use GitHub's [private vulnerability reporting](https://github.com/ohto-ai/random_menu/security/advisories/new).
2. 或通过 [GitHub 私信](https://github.com/ohto-ai) 联系维护者。
   Or contact the maintainer via [GitHub](https://github.com/ohto-ai).

报告时请尽量包含：受影响的版本/文件、复现步骤、影响评估、修复建议（如有）。我们会在 **7 天内** 给出初步回应。
Please include as much of the following as possible: affected version/file, reproduction steps, impact, and any suggested fix. You can expect an initial response within **7 days**.

## 范围说明 / Scope Notes

本项目是纯客户端静态应用：

- 所有用户数据（菜单、历史、统计、偏好）仅存储在浏览器 `localStorage`，**没有任何服务器端存储、上传或遥测**。
  All user data (menu, history, stats, preferences) lives in the browser's `localStorage` only — there is no server-side storage, upload, or telemetry.
- 关注点主要集中在：XSS（动态渲染）、分享链接解码、Service Worker 缓存。
  Focus areas include: XSS via dynamic rendering, share-link decoding, and Service Worker caching.
