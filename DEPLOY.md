# 部署指南

## 快速部署到 Vercel

### 步骤 1：准备 GitHub 仓库

1. 在 GitHub 上创建新仓库
2. 将代码推送到仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 步骤 2：部署到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你刚创建的仓库
5. 点击 "Deploy"
6. 等待 1-2 分钟部署完成

### 步骤 3：获取访问链接

部署完成后，Vercel 会提供一个访问链接，格式为：
```
https://你的项目名.vercel.app
```

你可以：
- 直接使用这个链接
- 绑定自己的域名（在 Vercel 项目设置中）

## 本地开发

### 安装 Vercel CLI

```bash
npm install -g vercel
```

### 启动本地开发服务器

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`

### 本地测试后端 API

后端 API 会自动在本地运行，访问：
```
http://localhost:3000/api/parse
```

## 环境要求

- Node.js 14.x 或更高版本
- npm 或 yarn

## 故障排查

### 问题 1：部署失败

**解决方案**：
- 检查 `vercel.json` 配置是否正确
- 确保 `api/parse.js` 文件存在
- 查看 Vercel 部署日志

### 问题 2：API 调用失败

**解决方案**：
- 检查浏览器控制台错误信息
- 确认后端 API 是否正常运行
- 检查网络连接

### 问题 3：CORS 错误

**解决方案**：
- 确保通过 HTTP 服务器访问（不是直接打开 HTML 文件）
- 检查 `api/parse.js` 中的 CORS 头设置

## 更新部署

当你修改代码后，只需推送到 GitHub：

```bash
git add .
git commit -m "更新说明"
git push
```

Vercel 会自动检测到更新并重新部署。

## 自定义域名

1. 在 Vercel 项目设置中点击 "Domains"
2. 输入你的域名
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

## 成本

Vercel 免费套餐包括：
- 每月 100GB 带宽
- 无限请求
- 自动 HTTPS
- 全球 CDN

对于个人使用完全足够。
