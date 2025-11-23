const BASE_URL = '/api'; 

export default function request(options) {
  // 从 Vuex 或缓存获取 Token
  const token = uni.getStorageSync('admin_token');

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '' // 适配 SpringBoot Security
      },
      success: (res) => {
        // 假设后端成功返回 code: 200
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          uni.showToast({ title: '登录已过期', icon: 'none' });
          uni.reLaunch({ url: '/pages/login/login' });
          reject(res.data);
        } else {
          uni.showToast({ title: '操作失败', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络连接错误', icon: 'none' });
        reject(err);
      }
    });
  });
}