# 百度网盘直链获取工具

一个简单易用的百度网盘直链获取工具，支持手机和电脑端使用。

## 功能特点

- ✅ 纯前端界面，后端代理绕过 CORS
- ✅ 响应式设计，手机/电脑均可使用
- ✅ 自动提取链接中的提取码
- ✅ 一键复制下载链接
- ✅ 简洁美观的界面
- ✅ 免费部署到 Vercel

## 使用方法

1. 打开工具网页
2. 粘贴百度网盘分享链接（支持自动提取提取码）
3. 如链接中没有提取码，请手动输入
4. 点击"获取下载链接"
5. 复制获取到的真实下载链接
6. 使用 IDM 或其他下载工具下载

## 部署方式

### 方式一：Vercel 部署（推荐）

1. Fork 本项目到你的 GitHub 账号
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 导入你 Fork 的项目
5. 点击 "Deploy"
6. 等待部署完成，获得访问链接

### 方式二：本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问 `http://localhost:3000`

### 方式三：GitHub Pages（不推荐）

由于需要后端代理，GitHub Pages 无法直接使用。建议使用 Vercel 部署。

## 技术架构

### 前端
- HTML5
- CSS3
- JavaScript (ES6+)

### 后端
- Vercel Serverless Functions
- Node.js

### 为什么需要后端？

百度网盘 API 有 CORS 跨域限制，纯前端无法直接调用。通过 Vercel Serverless Functions 作为代理，可以绕过这个限制。

## 项目结构

```
.
├── index.html          # 主页面
├── src/
│   ├── css/
│   │   └── style.css   # 样式文件
│   └── js/
│       ├── LinkParser.js    # 链接解析模块（支持自动提取提取码）
│       ├── ApiCaller.js     # API 调用模块（调用后端代理）
│       ├── UIController.js  # UI 控制模块
│       └── main.js          # 主控逻辑
├── api/
│   └── parse.js        # Vercel Serverless Function（后端代理）
├── vercel.json         # Vercel 配置
├── package.json        # 项目配置
└── README.md
```

## 常见问题

### Q: 为什么获取失败？
A: 可能的原因：
- 分享链接已失效
- 提取码错误
- 网络连接问题
- 百度网盘 API 限制

### Q: 手机端可以使用吗？
A: 可以，本工具采用响应式设计，完美支持手机端使用。

### Q: 数据安全吗？
A: 后端代理只是转发请求，不存储任何数据。所有请求都是实时处理。

### Q: 本地打开 HTML 文件为什么不能用？
A: 因为需要后端代理，必须通过 HTTP 服务器访问。建议部署到 Vercel 或使用 `npm run dev` 本地开发。

### Q: 提取码能自动识别吗？
A: 可以！如果分享链接格式为 `https://pan.baidu.com/s/xxxxx?pwd=yyyy`，工具会自动提取提取码。

## 部署成本

- Vercel 免费套餐：
  - 每月 100GB 带宽
  - 无限请求
  - 完全够个人使用

## 许可证

MIT License

## 免责声明

本工具仅供学习交流使用，请勿用于商业用途。使用本工具下载的内容，请遵守相关法律法规和百度网盘服务条款。
