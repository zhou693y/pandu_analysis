// ==UserScript==
// @name         百度网盘直链获取
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  在百度网盘分享页面直接获取下载链接，支持复制到 IDM 下载
// @author       You
// @match        *://pan.baidu.com/s/*
// @match        *://pan.baidu.com/share/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @connect      pan.baidu.com
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 样式
    const style = `
        .direct-download-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            margin-left: 10px;
            transition: all 0.3s;
        }
        .direct-download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .direct-download-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            opacity: 0.6;
        }
        .direct-download-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .direct-download-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }
        .direct-download-modal h3 {
            margin: 0 0 16px 0;
            color: #333;
            font-size: 18px;
        }
        .direct-download-link {
            background: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            word-break: break-all;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            color: #0369a1;
        }
        .direct-download-copy-btn {
            width: 100%;
            padding: 10px;
            background: #0ea5e9;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .direct-download-copy-btn:hover {
            background: #0284c7;
        }
        .direct-download-close-btn {
            width: 100%;
            padding: 10px;
            background: #6b7280;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }
        .direct-download-toast {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            font-size: 14px;
            font-weight: 600;
        }
        .direct-download-error {
            background: #ef4444;
        }
    `;

    // 注入样式
    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.appendChild(styleEl);

    // 显示提示
    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = 'direct-download-toast' + (isError ? ' direct-download-error' : '');
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // 获取下载链接
    function getDownloadLink() {
        const btn = document.querySelector('.direct-download-btn');
        btn.disabled = true;
        btn.textContent = '获取中...';

        // 提取页面参数
        const yunData = window.yunData;
        if (!yunData) {
            showToast('无法获取页面数据', true);
            btn.disabled = false;
            btn.textContent = '获取直链';
            return;
        }

        const shareid = yunData.shareid;
        const uk = yunData.uk;
        const sign = yunData.sign;
        const timestamp = yunData.timestamp;
        
        // 从 Cookie 获取 bdstoken
        const bdstoken = getCookie('BDCLND') || '';
        
        // 获取文件列表
        const fileList = yunData.file_list;
        if (!fileList || fileList.length === 0) {
            showToast('未检测到文件', true);
            btn.disabled = false;
            btn.textContent = '获取直链';
            return;
        }

        // 构造请求参数
        const fs_id = fileList[0].fs_id;
        const params = new URLSearchParams({
            sign: sign,
            timestamp: timestamp,
            fid_list: `[${fs_id}]`,
            bdstoken: bdstoken
        });

        // 发送请求
        GM_xmlhttpRequest({
            method: 'POST',
            url: `https://pan.baidu.com/api/sharedownload?${params}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': window.location.href,
                'User-Agent': navigator.userAgent
            },
            onload: function(response) {
                btn.disabled = false;
                btn.textContent = '获取直链';
                
                try {
                    const data = JSON.parse(response.responseText);
                    if (data.errno === 0 && data.dlink) {
                        showDownloadModal(data.dlink, fileList[0].server_filename);
                    } else {
                        const errorMsg = getErrorMessage(data.errno);
                        showToast(errorMsg, true);
                    }
                } catch (e) {
                    showToast('解析响应失败', true);
                }
            },
            onerror: function() {
                btn.disabled = false;
                btn.textContent = '获取直链';
                showToast('网络请求失败', true);
            }
        });
    }

    // 显示下载链接弹窗
    function showDownloadModal(dlink, filename) {
        const overlay = document.createElement('div');
        overlay.className = 'direct-download-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'direct-download-modal';
        modal.innerHTML = `
            <h3>下载链接获取成功</h3>
            <p style="margin-bottom: 12px; color: #666;">文件名：${filename}</p>
            <div class="direct-download-link">${dlink}</div>
            <button class="direct-download-copy-btn">复制链接</button>
            <button class="direct-download-close-btn">关闭</button>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        // 复制按钮
        modal.querySelector('.direct-download-copy-btn').onclick = () => {
            GM_setClipboard(dlink);
            showToast('链接已复制到剪贴板');
        };

        // 关闭按钮
        const close = () => {
            overlay.remove();
            modal.remove();
        };
        modal.querySelector('.direct-download-close-btn').onclick = close;
        overlay.onclick = close;
    }

    // 获取 Cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // 错误码映射
    function getErrorMessage(errno) {
        const errorMap = {
            '-1': '分享链接已失效',
            '-2': '分享链接不存在',
            '-3': '提取码错误',
            '-7': '文件已被删除',
            '-9': '访问频率过快，请稍后重试',
            '9019': '请先登录百度网盘账号'
        };
        return errorMap[errno] || `未知错误（错误码：${errno}）`;
    }

    // 注入按钮
    function injectButton() {
        // 等待页面加载
        const checkInterval = setInterval(() => {
            const toolbar = document.querySelector('.slide-show-right') || 
                           document.querySelector('.share-file-toolbar');
            
            if (toolbar && !document.querySelector('.direct-download-btn')) {
                const btn = document.createElement('button');
                btn.className = 'direct-download-btn';
                btn.textContent = '获取直链';
                btn.onclick = getDownloadLink;
                toolbar.appendChild(btn);
                clearInterval(checkInterval);
            }
        }, 500);

        // 10 秒后停止检查
        setTimeout(() => clearInterval(checkInterval), 10000);
    }

    // 启动
    injectButton();
})();
