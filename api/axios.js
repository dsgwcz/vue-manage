import axios from "axios";
import config from "../config";

// 通过对配置环境的判断，改变接口请求的地址
const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.baseUrl.dev
    : config.baseUrl.pro;

class HttpRequest {
  // 构造函数拿到当前接口请求的地址
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  //   获取内部配置函数
  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {},
    };
    return config;
  }

  //   拦截器函数
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        console.log(response, "response");
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        console.log(error, "error");
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    // 创建 axios 实例
    const instance = axios.create();
    // 使用扩展运算符 ... 设置配置项
    options = { ...this.getInsideConfig(), ...options };
    // 将实例传入拦截器
    this.interceptors(instance);
    // 返回配置好的 axios 实例
    return instance(options);
  }
}

export default new HttpRequest(baseUrl);
