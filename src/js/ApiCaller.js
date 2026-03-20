// ApiCaller 模块 - 调用后端代理 API
class ApiCaller {
  constructor() {
    // API 端点配置
    // 本地开发时使用相对路径，部署后会自动使用正确的域名
    this.apiEndpoint = '/api/parse';
  }

  /**
   * 调用后端代理获取下载链接
   * @param {string} surl - 分享链接标识
   * @param {string} pwd - 提取码
   * @returns {Promise<Object>} {success: boolean, dlink?: string, error?: string}
   */
  async fetchDownloadLink(surl, pwd) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surl: surl,
          pwd: pwd || ''
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        return { success: false, error: `HTTP 错误：${response.status}` };
      }
      
      const data = await response.json();
      return this.parseResponse(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        return { success: false, error: '请求超时，请重试' };
      }
      return { success: false, error: `网络错误：${error.message}` };
    }
  }

  /**
   * 解析 API 响应
   * @param {Object} data
   * @returns {Object}
   */
  parseResponse(data) {
    if (data.errno === 0 && data.dlink) {
      return { success: true, dlink: data.dlink };
    }
    
    const errorMessage = this.getErrorMessage(data.errno);
    return { success: false, error: errorMessage, errno: data.errno };
  }

  /**
   * 将错误码转换为中文说明
   * @param {number} errno
   * @returns {string}
   */
  getErrorMessage(errno) {
    const errorMap = {
      '-1': '分享链接已失效',
      '-2': '分享链接不存在',
      '-3': '提取码错误',
      '-7': '文件已被删除',
      '-9': '访问频率过快，请稍后重试'
    };
    
    return errorMap[errno] || `未知错误（错误码：${errno}）`;
  }
}
