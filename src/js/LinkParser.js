// LinkParser 模块 - 解析百度网盘分享链接
class LinkParser {
  /**
   * 解析分享链接，提取 surl 和 pwd
   * @param {string} input - 用户输入的分享链接
   * @returns {Object} {success: boolean, surl?: string, pwd?: string, error?: string}
   */
  parse(input) {
    if (!input || input.trim().length === 0) {
      return { success: false, error: '请输入分享链接' };
    }

    const trimmedInput = input.trim();
    
    // 尝试从 URL 中提取提取码
    let extractedPwd = null;
    const pwdMatch = trimmedInput.match(/[?&]pwd=([a-zA-Z0-9]{4})/);
    if (pwdMatch) {
      extractedPwd = pwdMatch[1];
    }
    
    // 支持完整链接：https://pan.baidu.com/s/1xxxxx 或 https://pan.baidu.com/s/1xxxxx?pwd=xxxx
    // 支持短链接：1xxxxx
    const patterns = [
      /pan\.baidu\.com\/s\/([a-zA-Z0-9_-]+)/,
      /^([a-zA-Z0-9_-]+)$/
    ];
    
    for (const pattern of patterns) {
      const match = trimmedInput.match(pattern);
      if (match) {
        return { 
          success: true, 
          surl: match[1],
          pwd: extractedPwd 
        };
      }
    }
    
    return { success: false, error: '分享链接格式不正确' };
  }

  /**
   * 验证提取码格式
   * @param {string} pwd - 提取码
   * @returns {boolean}
   */
  validatePwd(pwd) {
    if (!pwd) return true; // 提取码可选
    return /^[a-zA-Z0-9]{4}$/.test(pwd);
  }
}
