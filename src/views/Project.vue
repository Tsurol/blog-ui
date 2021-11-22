<template>
	<div class="page-project">
		<h1>开发中</h1>
	</div>
</template>

<script>
import Navbar from '@/components/home/navbar'
export default {
	name: 'Project',
	components: {
		Navbar,
	},
	data() {
		return {
			show: false,
			projectList: [
				{
					id: 1,
					link: 'http://39.105.148.140:8002/',
					not: '在线问答系统',
					content:
						'该系统是基于Falsk框架的Web开发实战项目，主要分为用户模块和问答模块。实现了登录注册，互动问答，评论回复等主要功能。',
					time: '2021/4-2021/6',
				},
				{
					id: 2,
					link: 'http://39.105.148.140:8001/',
					not: '移动端旅游网站',
					content:
						'该网站采用前后端分离技术，基于Vue和Django框架，主要分为系统模块，景点模块，订单模块。实现了登录注册，景点展示，下单门票等主要功能。',
					time: '2021/7-2021/9',
				}
			],
		}
	},
	methods: {
	},
	mounted() {
		this.show = true;
	}
}
</script>

<style lang="less">
</style>
