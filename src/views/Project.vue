<template>
	<div class="page-project">
		<Navbar />
		<el-row
			:gutter="20"
			type="flex"
			style="margin-left:0;margin-right:0;margin-top:15px"
			justify="space-around"
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
			<el-col :md="4" class="right">
				<div class="author">
					<el-avatar :src="author" class="avatar"></el-avatar>
					<div class="desc">一个程序员的成长之路</div>
					<div class="tag">
						<el-tag
							size="mini"
							v-for="tagitem in TagList"
							:key="tagitem.id"
							:type="tagitem.type"
							hit
							>{{ tagitem.content }}</el-tag
						>
					</div>
					<div class="tatistics">
						<div class="blog">
							<span>博客</span>
							<span class="blog-count">{{ blogcount }}</span>
						</div>
						<div class="comment">
							<span>评论</span>
							<span class="comment-count">{{ commentcount }}</span>
						</div>
					</div>
					<div class="contant">
						<el-button type="text" @click="openvx" style="margin:0;padding:0"
							><el-avatar :src="wechat" size="small"></el-avatar
						></el-button>
						<a v-for="contant in contantList" :key="contant.id" :href="contant.link" target="_blank">
							<el-avatar :src="contant.icon" size="small"></el-avatar>
						</a>
					</div>
				</div>
			</el-col>
		</el-row>
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
				},
			],
			TagList: [
				{ id: 1, type: 'success', content: '帅气' },
				{ id: 2, type: 'danger', content: '勤奋' },
				{ id: 3, type: 'warning', content: '好学' },
				{ id: 4, type: '', content: '阳光' },
				{ id: 5, type: 'success', content: '积极' },
			],
			contantList: [
				{
					id: 1,
					link:
						'https://space.bilibili.com/19096880?from=search&seid=3819783028781424627&spm_id_from=333.337.0.0',
					icon: '/static/bilibili-line.png',
				},
				{
					id: 2,
					link: 'https://blog.csdn.net/weixin_51999266',
					icon: '/static/csdn.png'
				},
				{
					id: 3,
					link: 'https://github.com/Tsurol',
					icon: '/static/githubb.png'
				}
			],
			author: '/static/logo.png',
			wechat: '/static/wechat.png',
			medium: 'medium',
			blogcount: 999,
			commentcount: 998,
		}
	},
	methods: {
		openvx() {
			this.$notify({
				dangerouslyUseHTMLString: true,
				message: '<strong>微信号：Tsurol</strong>',
				position: 'bottom-left',
				customClass: 'background',
			})
		},
	},
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
	.right {
		.author {
			border-radius: 8px;
			border: 1px solid #ebeef5;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			text-align: center;
			background: linear-gradient(to bottom, rgb(236, 199, 162) 10%, rgb(255, 255, 255) 20%);
			.tag {
				margin-top: 5px;
				span {
					margin-right: 5px;
				}
			}
			.avatar {
				transition: all 0.2s linear;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
			}
			.avatar:hover {
				transform: rotate(360deg);
			}
			.desc {
				color: rgb(153, 149, 149);
				font-size: 13px;
			}
			.tatistics {
				margin-top: 10px;
				display: flex;
				justify-content: space-evenly;
				.blog {
					display: flex;
					flex-direction: column;
				}
				.comment {
					display: flex;
					flex-direction: column;
				}
			}
			.contant {
				display: flex;
				padding: 10px 0;
				justify-content: center;
				align-items: center;
				.el-avatar--small {
					background-color: rgb(255, 255, 255);
					cursor: pointer;
					margin-right: 4px;
				}
			}
			.avatar {
				height: 85px;
				width: 85px;
			}
		}
	}
}
</style>
