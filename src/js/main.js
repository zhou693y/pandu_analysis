// 主控逻辑 - 页面加载初始化
document.addEventListener('DOMContentLoaded', () => {
  try {
    const uiController = new UIController();
    uiController.init();
  } catch (error) {
    console.error('初始化失败：', error);
    alert('页面初始化失败，请刷新重试');
  }
});

// 全局错误捕获
window.addEventListener('error', (event) => {
  console.error('全局错误：', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝：', event.reason);
});
