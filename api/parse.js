// Vercel Serverless Function - 百度网盘 API 代理
// 用于绕过 CORS 限制

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允许 POST 请求' });
  }

  try {
    const { surl, pwd } = req.body;

    if (!surl) {
      return res.status(400).json({ error: '缺少 surl 参数' });
    }

    // 构造百度网盘 API 请求
    const params = new URLSearchParams({
      surl: surl,
      pwd: pwd || ''
    });

    const apiUrl = `https://pan.baidu.com/api/sharedownload?${params}`;

    // 发送请求到百度网盘 API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://pan.baidu.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const data = await response.json();

    // 返回结果
    return res.status(200).json(data);

  } catch (error) {
    console.error('API 代理错误：', error);
    return res.status(500).json({ 
      error: '服务器错误',
      message: error.message 
    });
  }
}
