// UIController 模块 - 管理用户界面
class UIController {
  constructor() {
    this.linkInput = null;
    this.pwdInput = null;
    this.fetchButton = null;
    this.resultContainer = null;
    this.errorContainer = null;
  }

  /**
   * 初始化 UI 事件监听
   */
  init() {
    this.linkInput = document.getElementById('link-input');
    this.pwdInput = document.getElementById('pwd-input');
    this.fetchButton = document.getElementById('fetch-button');
    this.resultContainer = document.getElementById('result-container');
    this.errorContainer = document.getElementById('error-container');

    this.fetchButton.addEventListener('click', () => this.handleFetch());
    this.linkInput.addEventListener('input', () => this.validateInput());
    
    // 支持 Enter 键提交
    this.linkInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.fetchButton.disabled) {
        this.handleFetch();
      }
    });
    this.pwdInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.fetchButton.disabled) {
        this.handleFetch();
      }
    });

    // 初始验证
    this.validateInput();
    
    // 自动聚焦到链接输入框
    this.linkInput.focus();
  }

  /**
   * 验证输入
   */
  validateInput() {
    const hasLink = this.linkInput.value.trim().length > 0;
    this.fetchButton.disabled = !hasLink;
  }

  /**
   * 处理获取下载链接
   */
  async handleFetch() {
    const link = this.linkInput.value.trim();
    let pwd = this.pwdInput.value.trim();
    
    this.showLoading(true);
    this.clearError();
    this.clearResult();
    
    const parser = new LinkParser();
    const parseResult = parser.parse(link);
    
    if (!parseResult.success) {
      this.showError(parseResult.error);
      this.showLoading(false);
      return;
    }
    
    // 如果链接中包含提取码，自动填充到输入框
    if (parseResult.pwd && !pwd) {
      pwd = parseResult.pwd;
      this.pwdInput.value = pwd;
      this.showSuccess('已自动提取提取码');
    }
    
    const apiCaller = new ApiCaller();
    const result = await apiCaller.fetchDownloadLink(parseResult.surl, pwd);
    
    this.showLoading(false);
    
    if (result.success) {
      this.showResult(result.dlink);
    } else {
      this.showError(result.error);
    }
  }

  /**
   * 显示加载状态
   * @param {boolean} loading
   */
  showLoading(loading) {
    this.fetchButton.disabled = loading;
    this.fetchButton.textContent = loading ? '获取中...' : '获取下载链接';
    if (loading) {
      this.fetchButton.classList.add('loading');
    } else {
      this.fetchButton.classList.remove('loading');
    }
  }

  /**
   * 显示下载链接
   * @param {string} dlink
   */
  showResult(dlink) {
    this.resultContainer.innerHTML = `
      <div class="result">
        <p class="result-label">下载链接：</p>
        <input type="text" value="${dlink}" readonly id="dlink-input" class="dlink-input">
        <button id="copy-button" class="copy-button">复制链接</button>
      </div>
    `;
    
    document.getElementById('copy-button').addEventListener('click', () => {
      this.copyToClipboard(dlink);
    });
  }

  /**
   * 显示错误信息
   * @param {string} message
   */
  showError(message) {
    this.errorContainer.textContent = message;
    this.errorContainer.style.display = 'block';
  }

  /**
   * 清除错误信息
   */
  clearError() {
    this.errorContainer.textContent = '';
    this.errorContainer.style.display = 'none';
  }

  /**
   * 清除结果
   */
  clearResult() {
    this.resultContainer.innerHTML = '';
  }

  /**
   * 复制到剪贴板
   * @param {string} text
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showSuccess('复制成功');
    } catch (error) {
      // 降级方案：选中文本
      const input = document.getElementById('dlink-input');
      input.select();
      try {
        document.execCommand('copy');
        this.showSuccess('复制成功');
      } catch (e) {
        this.showError('复制失败，请手动复制');
      }
    }
  }

  /**
   * 显示成功提示
   * @param {string} message
   */
  showSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}
