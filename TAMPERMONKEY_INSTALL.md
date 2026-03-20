# Tampermonkey 安装指南

## 步骤 1：安装 Tampermonkey 扩展

### 电脑端

**Chrome / Edge / Opera**
1. 访问 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. 点击"添加至 Chrome"
3. 确认安装

**Firefox**
1. 访问 [Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
2. 点击"添加到 Firefox"
3. 确认安装

**Safari**
1. 访问 [App Store](https://apps.apple.com/app/tampermonkey/id1482490089)
2. 下载并安装

### 手机端

**Android（Kiwi Browser 或 Firefox）**
1. 下载 Kiwi Browser 或 Firefox
2. 在浏览器中访问 Chrome 网上应用店或 Firefox 附加组件
3. 安装 Tampermonkey

**iOS（Safari）**
1. 从 App Store 安装 Tampermonkey
2. 在设置中启用扩展

## 步骤 2：安装脚本

### 方法一：直接安装（推荐）

1. 点击 [baidu-pan-direct-download.user.js](./baidu-pan-direct-download.user.js) 文件
2. 点击 "Raw" 按钮
3. Tampermonkey 会自动识别并弹出安装页面
4. 点击"安装"

### 方法二：手动安装

1. 打开 Tampermonkey 管理面板
2. 点击"添加新脚本"
3. 复制 `baidu-pan-direct-download.user.js` 的全部内容
4. 粘贴到编辑器
5. 点击"文件" → "保存"

## 步骤 3：使用脚本

1. 访问任意百度网盘分享链接
2. 登录你的百度网盘账号（必须）
3. 在页面右侧会出现"获取直链"按钮
4. 点击按钮获取真实下载链接
5. 复制链接，使用 IDM 或其他下载工具下载

## 常见问题

### Q: 为什么没有看到"获取直链"按钮？
A: 
- 确认 Tampermonkey 已安装并启用
- 确认脚本已安装并启用
- 刷新页面重试
- 检查浏览器控制台是否有错误

### Q: 提示"请先登录百度网盘账号"？
A: 
- 必须先登录百度网盘账号
- 脚本需要使用你的登录状态来获取下载链接

### Q: 获取链接失败？
A: 
- 检查分享链接是否有效
- 检查是否需要提取码
- 尝试刷新页面重试

### Q: 手机端可以用吗？
A: 
- Android：可以，使用 Kiwi Browser 或 Firefox
- iOS：可以，使用 Safari + Tampermonkey 扩展

### Q: 安全吗？
A: 
- 完全安全，脚本开源可审查
- 所有操作在本地浏览器完成
- 不上传任何数据到第三方服务器

## 脚本功能

- ✅ 自动注入"获取直链"按钮
- ✅ 一键获取真实下载链接
- ✅ 支持复制到剪贴板
- ✅ 友好的错误提示
- ✅ 支持电脑和手机端

## 更新脚本

1. 打开 Tampermonkey 管理面板
2. 找到"百度网盘直链获取"脚本
3. 点击"编辑"
4. 替换为新版本代码
5. 保存

## 卸载脚本

1. 打开 Tampermonkey 管理面板
2. 找到"百度网盘直链获取"脚本
3. 点击"删除"
4. 确认删除

## 技术支持

如有问题，请在 GitHub 提交 Issue。
