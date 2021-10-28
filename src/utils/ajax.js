import axios from "axios";
// 创建axios实例
export const ajax = axios.create({
  // 自定义请求头
  headers: {
    "Content-Type": "application/json"
  },
  // 默认携带上次的cookie
  withCredentials: true
});

