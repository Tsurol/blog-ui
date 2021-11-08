<template>
	<div class="page-project">
		<Navbar />
		<transition name="el-fade-in-linear">
			<el-row
				:gutter="35"
				type="flex"
				style="margin-left:0;margin-right:0;margin-top:15px"
				justify="center"
				v-show="show"
			>
				<el-col :md="5" class="left">
					开发中
				</el-col>
				<el-col :md="11" class="main">
					<div class="content">
						<div class="notice">
							<el-card v-for="project in projectList" :key="project.id">
								<div class="not" style="border-bottom: 1px solid rgb(192,196,204);">
									<a
										class="link-pro"
										style="text-decoration:none;color:black"
										:href="project.link"
										target="_blank"
										>{{ project.not }}
									</a>
								</div>
								<div class="not-content" style="margin-top:10px;line-height:30px">
									{{ project.content }}
								</div>
								<span class="time">
									<div style="color: #999;font-size:12px;margin-top:5px">
										<i class="el-icon-timer"></i>
										{{ project.time }}
									</div>
								</span>
							</el-card>
						</div>
					</div>
				</el-col>
				<el-col :md="5" class="right">
					开发中
				</el-col>
			</el-row>
		</transition>
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
.background {
	background-color: rgb(85, 219, 159);
	border: none;
}
.background-warning {
	background-color: rgb(247, 130, 126);
	border: none;
}
.page-project {
	font-family: 'Consolas', 'Microsoft JhengHei', 'Apple LiGothic Medium,Microsoft YaHei', '微软雅黑',
		'Arial', sans-serif;
	background-color: #f5f5f5;
	.el-main {
		margin-top: 15px;
	}
	.main {
		.el-card {
			margin-bottom: 30px;
		}
		.el-card__body {
			padding: 12px;
		}
		.not {
			font-size: 16px;
			padding: 8px 0;
			.link-pro {
				font-weight: 800;
			}
			.link-pro:hover {
				background-color: rgb(231, 239, 245);
			}
		}
	}
}
</style>
