import axios from 'axios'
import Router from '@/router/index'
import { Message } from 'element-ui'

// 创建axios实例
export const ajax = axios.create({
	// 自定义请求头
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
	// 默认携带上次的cookie
	withCredentials: true,
})

// 在请求发出之前进行拦截
ajax.interceptors.request.use(
	function(config) {
		// 在发送请求前做些什么
		console.log('请求拦截到了')
		const access = window.localStorage.getItem('access')
		if (access) {
			config.headers['authorization'] = access
		}
		return config
	},
	function(error) {
		// 对请求错误做什么
		return Promise.reject(error)
	}
)

ajax.interceptors.response.use(
	function(response) {
		// 对响应数据做些什么
		// console.log(response.data)
		console.log('响应拦截到了')
		// window.app.$toast.clear()
		return response
	},
	function(error) {
		if (error.response) {
			// 对错误响应做点什么
			// 统一的错误处理
			if (error.response.status === 400) {
				Message({
					message: error.response.data.message,
					type: 'error',
					duration: 5000,
					showClose: true,
				})
			} else if (error.response.status === 500) {
				Message({
					message: error.response.data.message,
					type: 'error',
					duration: 5000,
					showClose: true,
				})
			} else if (error.response.status === 401) {
				Message({
					message: '请先登录后再操作',
					type: 'error',
					duration: 5000,
					showClose: true,
				})
				// Router.push({ name: 'Login' })
			} else if (error.response.status === 404) {
				Message({
					message: error.response.data.message,
					type: 'error',
					duration: 5000,
					showClose: true,
				})
			}
		}
		// window.app.$toast.clear()
		return Promise.reject(error)
	}
)
