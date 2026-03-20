# 百度网盘直链获取工具

一个简单易用的百度网盘直链获取工具，基于 Tampermonkey 用户脚本。

## 功能特点

- ✅ 在百度网盘分享页面直接获取下载链接
- ✅ 一键复制到剪贴板
- ✅ 支持电脑和手机端
- ✅ 纯本地运行，安全可靠
- ✅ 无需服务器，即装即用

## 快速开始

### 1. 安装 Tampermonkey

**电脑端：**
- Chrome/Edge: [Chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Firefox: [Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)

**手机端：**
- Android: 使用 Kiwi Browser 或 Firefox
- iOS: 从 App Store 安装 Tampermonkey

### 2. 安装脚本

1. 点击 [baidu-pan-direct-download.user.js](./baidu-pan-direct-download.user.js)
2. 点击 "Raw" 按钮
3. Tampermonkey 会自动弹出安装页面
4. 点击"安装"

### 3. 使用

1. 访问百度网盘分享链接
2. 登录你的百度网盘账号
3. 点击页面上的"获取直链"按钮
4. 复制下载链接
5. 使用 IDM 等下载工具下载

## 详细安装指南

查看 [TAMPERMONKEY_INSTALL.md](./TAMPERMONKEY_INSTALL.md) 获取详细的安装和使用说明。

## 常见问题

### Q: 为什么需要登录百度网盘？
A: 百度网盘的下载接口需要验证用户身份，必须登录后才能获取真实下载链接。

### Q: 手机端可以用吗？
A: 可以！Android 使用 Kiwi Browser 或 Firefox，iOS 使用 Safari + Tampermonkey。

### Q: 安全吗？
A: 完全安全。脚本开源可审查，所有操作在本地浏览器完成，不上传任何数据。

### Q: 为什么不用网页版？
A: 百度网盘 API 需要登录状态，纯网页版无法获取用户的 Cookie。Tampermonkey 方案可以直接在百度网盘页面运行，访问登录状态。

## 技术栈

- Tampermonkey 用户脚本
- JavaScript (ES6+)
- GM_xmlhttpRequest API
- GM_setClipboard API

## 项目结构

```
.
├── baidu-pan-direct-download.user.js  # Tampermonkey 脚本
├── TAMPERMONKEY_INSTALL.md            # 详细安装指南
└── README.md                          # 本文件
```

## 为什么选择 Tampermonkey 方案？

之前尝试过纯网页 + 后端代理的方案，但遇到以下问题：
1. 百度网盘 API 需要用户登录状态（Cookie）
2. 后端代理无法获取用户的登录信息
3. 返回错误码 9019（需要登录）

Tampermonkey 方案的优势：
- ✅ 可以访问用户的登录状态
- ✅ 无需部署服务器
- ✅ 安装简单，即装即用
- ✅ 支持电脑和手机端
- ✅ 完全本地运行，安全可靠

## 许可证

MIT License

## 免责声明

本工具仅供学习交流使用，请勿用于商业用途。使用本工具下载的内容，请遵守相关法律法规和百度网盘服务条款。

