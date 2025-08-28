# 🍱 Random Menu Selector / 随机菜单选择器

A simple, elegant web application that helps you decide what to eat by randomly selecting dishes from your custom menu list. Features bilingual support (Chinese/English) with automatic language detection.

一个简洁优雅的网页应用，通过从你的自定义菜单列表中随机选择菜品来帮助你决定吃什么。支持中英双语，自动语言检测。

## 🌟 Features / 功能特性

- **🌐 Bilingual Support**: Automatic language detection (Chinese/English) with manual toggle
- **🎲 Random Selection**: Smart random selection algorithm to help you decide
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🌙 Dark Mode**: Automatic dark/light theme based on system preferences
- **💾 Auto Save**: Automatically saves your menu list and selection history
- **🕘 History**: Keeps track of your recent selections (last 5 entries)

---

- **🌐 双语支持**: 自动语言检测（中文/英文），支持手动切换
- **🎲 随机选择**: 智能随机选择算法帮你做决定
- **📱 响应式设计**: 在桌面和移动设备上完美工作
- **🌙 暗黑模式**: 基于系统偏好自动切换明暗主题
- **💾 自动保存**: 自动保存菜单列表和选择历史
- **🕘 历史记录**: 记录最近的选择（最多5条记录）

## 🚀 Live Demo / 在线演示

Visit / 访问: [https://ohto-ai.github.io/random_menu/](https://ohto-ai.github.io/random_menu/)

## 📸 Screenshots / 截图展示

### English Version / 英文版本
![English Version](https://github.com/user-attachments/assets/20305457-9d62-4a5c-9362-e7fbd2b17276)

### Chinese Version / 中文版本
![Chinese Version](https://github.com/user-attachments/assets/82fe05ed-dff0-4190-b99c-7b76aa10cfbe)

## 🛠 Usage / 使用方法

### English
1. **Enter Menu Items**: Add your dishes one per line in the text area
2. **Set Quantity**: Choose how many dishes to select (1-100)
3. **Click "Start Selection"**: The app will randomly pick dishes from your list
4. **Toggle Language**: Use the 🌐 button to switch between Chinese and English

### 中文
1. **输入菜单**: 在文本框中每行添加一个菜品
2. **设置数量**: 选择要选出多少个菜品（1-100个）
3. **点击"开始选择"**: 应用会从你的列表中随机选择菜品
4. **切换语言**: 使用 🌐 按钮在中英文之间切换

## 🎯 How It Works / 工作原理

### Language Detection / 语言检测
The app automatically detects your browser's language preference:
- If browser language starts with `en`: Defaults to English
- If browser language starts with `zh`: Defaults to Chinese  
- For other languages: Defaults to English
- Users can manually toggle between languages using the 🌐 button
- Language preference is saved in localStorage

应用自动检测浏览器的语言偏好：
- 如果浏览器语言以 `en` 开头：默认使用英文
- 如果浏览器语言以 `zh` 开头：默认使用中文
- 其他语言：默认使用英文
- 用户可以使用 🌐 按钮手动切换语言
- 语言偏好保存在 localStorage 中

### Random Selection Algorithm / 随机选择算法
```javascript
// Ensures no duplicate selections in a single round
const temp = [...menuItems];
const selected = [];
for (let i = 0; i < count; i++) {
  const randomIndex = Math.floor(Math.random() * temp.length);
  selected.push(temp.splice(randomIndex, 1)[0]);
}
```

## 💡 Technical Details / 技术细节

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **Storage**: localStorage for menu lists, selection history, and language preference
- **Responsive**: CSS Grid and Flexbox for adaptive layouts
- **Theme**: CSS custom properties with prefers-color-scheme media query
- **No Dependencies**: Everything is built with web standards

## 🎨 Customization / 自定义

The app uses CSS custom properties for easy theming:

```css
:root {
  --bg-color: #f9f9f9;
  --container-bg: #fff;
  --border-color: #ccc;
  --text-color: #000;
  --muted-color: #888;
}
```

## 📱 Browser Support / 浏览器支持

- ✅ Chrome/Edge 88+
- ✅ Firefox 85+  
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing / 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献代码！请随时提交 Pull Request。

## 📄 License / 许可证

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments / 致谢

- Icons: Emoji (native browser support)
- Inspiration: The daily struggle of "what should I eat today?" 

---

Made with ❤️ by [ohto-ai](https://github.com/ohto-ai)

*Helping people make food decisions, one random selection at a time!*

*让随机选择帮你解决今天吃什么的难题！*