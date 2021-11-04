<template>
	<div class="home-search-box">
		<el-row type="flex" justify="center" :gutter="25" style="margin-left:0;margin-right:0">
			<el-col :md="5" class="left">
				<div class="card">
					<el-card class="box-card" shadow="always" style="border:none">
						<div slot="header" class="clearfix hot-recommoned">
							<i class="el-icon-star-off" style="color:rgb(231,35,74);"></i>
							<span class="recent-hot">近期热门</span>
						</div>
						<div v-for="(hotitem, index) in hotList" :key="hotitem.id" class="item">
							<span class="rank" :style="{ backgroundColor: hotitem.bkc }">{{ index + 1 }}</span>
							<span class="rank-title">{{ hotitem.title }}</span>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :md="11" class="main">
				<div class="input-suffix">
					<el-input
						suffix-icon="el-icon-search"
						v-model="input"
						placeholder="搜一搜你感兴趣的吧"
					></el-input>
				</div>
				<div class="content">
					<div class="content-item" v-for="blogitem in blogList" :key="blogitem.id">
						<el-card>
							<div class="not">
								{{ blogitem.title }}
								<el-tag
									v-if="blogitem.is_top"
									effect="dark"
									style="padding:0 7px;height:19px;line-height:19px;margin-left:5px"
									>置顶</el-tag
								>
							</div>
							<div class="not-content" style="margin-top:10px;line-height:25px;font-size: 15px;">
								{{ blogitem.desc }}
							</div>
							<span class="time">
								<div style="color: #999;font-size:12.5px;">
									<i class="el-icon-user">{{ blogitem.user }}</i>
									<span
										@click="loveBlog"
										class="iconfont icon-dianzan_huaban"
										style="font-size:12.5px;margin-right:10px"
										>{{ blogitem.love_count }}</span
									>
									<i class="el-icon-chat-line-square">{{ blogitem.comment_count }}条评论</i>
									<i class="el-icon-timer">{{ blogitem.created_at }}</i>
								</div>
							</span>
						</el-card>
					</div>
				</div>
			</el-col>
			<el-col :md="5" class="right">
				<div class="content-notice">
					<el-card>
						<div
							class="not"
							style="border-bottom: 1px solid rgb(192, 196, 204);padding-bottom: 7px;font-size:17px"
						>
							<i class="el-icon-bell"></i><span style="font-weight: bold;">公告栏</span>
						</div>
						<div class="not-content" style="margin-top:10px;line-height:25px;font-size: 15px;">
							{{ notice }}
						</div>
					</el-card>
				</div>
				<div class="tag-list">
					<el-card>
						<div class="tag-top">
							<i class="el-icon-price-tag"></i><span style="font-weight: bold;">标签</span>
						</div>
						<div class="tag-body">
							<router-link
								:to="{ name: 'Home' }"
								v-for="tag in tagList"
								:key="tag.id"
								class="tag-item"
								:style="{ backgroundColor: tag.bkc }"
							>
								{{ tag.name }}
							</router-link>
						</div>
					</el-card>
				</div>
				<!-- <div class="clock">
						<div class="head-time">
							<div class="day">2021/11/1</div>
							<div class="week">Monday</div>
						</div>
						<div class="main-time">17:49:48</div>
					</div> -->
				<div class="block">
					<el-timeline>
						<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
							:icon="activity.icon"
							:type="activity.type"
							:color="activity.color"
							:size="activity.size"
							:timestamp="activity.timestamp"
							:placement="activity.placement"
						>
							{{ activity.content }}
						</el-timeline-item>
					</el-timeline>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import { BlogApis } from '@/utils/apis'
import { OK, BAD_REQUEST, Unauthorized } from '@/utils/constants'

export default {
	data() {
		return {
			input: '',
			activities: [
				{
					content: '开始内测',
					timestamp: '2021-10-25',
					color: '#5073e9',
					placement: 'top',
				},
				{
					content: '开放"每日壹题"板块',
					timestamp: '2021-10-30',
					color: '#5073e9',
					placement: 'top',
				},
			],
			notice: '网站正在开发中，请积极反馈BUG~',
			tagList: [],
			hotList: [],
			blogList: [],
		}
	},
	methods: {
		getBlogList() {
			ajax.get(BlogApis.blogListUrl).then(
				(res) => {
					if (res.data.code === OK) {
						this.blogList = res.data.body.data
					}
				},
				(error) => {
					if (error.data.code === BAD_REQUEST) {
						this.$message({
							showClose: true,
							message: res.data.message,
							type: 'error',
						})
					} else {
						this.$message({
							showClose: true,
							message: '服务器出现错误，请联系作者',
							type: 'error',
						})
					}
				}
			)
		},
		getHotList() {
			ajax
				.get(BlogApis.blogListUrl, {
					params: {
						is_hot: 1,
					},
				})
				.then(
					(res) => {
						if (res.data.code === OK) {
							this.hotList = res.data.body.data
						}
					},
					(error) => {
						if (error.data.code === BAD_REQUEST) {
							this.$message({
								showClose: true,
								message: res.data.message,
								type: 'error',
							})
						} else {
							this.$message({
								showClose: true,
								message: '服务器出现错误，请联系作者',
								type: 'error',
							})
						}
					}
				)
		},
		getTagList() {
			ajax.get(BlogApis.tagListUrl).then(
				(res) => {
					if (res.data.code === OK) {
						this.tagList = res.data.body.data
					}
				},
				(error) => {
					if (error.data.code === BAD_REQUEST) {
						this.$message({
							showClose: true,
							message: res.data.message,
							type: 'error',
						})
					} else {
						this.$message({
							showClose: true,
							message: '服务器出现错误，请联系作者',
							type: 'error',
						})
					}
				}
			)
		},
		loveBlog() {
			ajax.post(BlogApis.loveBlogUrl).then(
				(res) => {
					if (res.data.code === CREATED) {
						console.log('操作成功')
					}
				},
				(error) => {
					if (error.data.code === Unauthorized) {
						this.$message({
							showClose: true,
							message: res.data.message,
							type: '请登录',
						})
					} else {
						this.$message({
							showClose: true,
							message: '服务器出现错误，请联系作者',
							type: 'error',
						})
					}
				}
			)
		},
	},
	created() {
		this.getHotList()
		this.getTagList()
		this.getBlogList()
	},
	mounted() {
		// this.show = true
	},
}
</script>

<style lang="less">
.home-search-box {
	font-family: 'Consolas', 'Microsoft JhengHei', 'Apple LiGothic Medium,Microsoft YaHei', '微软雅黑',
		'Arial', sans-serif;
	// padding: 40px 0;
	padding-top: 20px;

	.left {
		.card {
			.el-card__header {
				padding: 15px 8px;
			}
			.el-card__body {
				padding: 0;
				.item:hover {
					background-color: #f1f3f5;
					cursor: pointer;
				}
			}
		}
		.item {
			border: 1px solid #ebeef5;
			padding: 15px 10px;
			display: flex;
			align-items: center;
			.rank {
				text-align: center;
				background-color: #e04a1d;
				color: #fff;
				border-radius: 5px;
				// border:1px solid whitesmoke;
				width: 18px;
				height: 18px;
				margin-right: 10px;
			}
			.rank-title {
				flex: auto;
			}
		}
		.hot-recommoned {
			border-radius: 8px;
		}
	}

	.right {
		.tag-list {
			margin-top: 10px;
		}
		.tag-top {
			font-size: 17px;
			border-bottom: 1px solid rgb(192, 196, 204);
			padding-bottom: 7px;
		}
		.tag-item {
			text-decoration: none;
			color: black;
			border-radius: 5px;
			padding: 0 2px;
			display: inline-block;
			margin-right: 5px;
			margin-top: 10px;
			line-height: 25px;
			opacity: 0.6;
		}
		.block {
			margin-top: 15px;
			border: 1px solid #ebeef5;
			background-color: #fff;
			padding-top: 25px;
			.el-timeline-item__tail {
				position: absolute;
				left: 2.5px;
				height: 100%;
				border-left: 5px solid #b7c4ec;
			}
		}
	}

	.el-main {
		margin-top: 5px;
	}
	.main {
		.content-item {
			margin-bottom: 15px;
			.el-card__body {
				.not {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					font-size: 25px;
					padding: 7px 0;
					font-weight: bold;
					// border-bottom: 1px solid rgb(192,196,204);
				}
				.time {
					div {
						padding-top: 15px;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						cursor: pointer;
						i {
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
	.input-suffix {
		.el-input {
			margin-bottom: 15px;
			i {
				cursor: pointer;
			}
		}
	}
	.card {
		// margin-top: 10px;
		.recent-hot {
			color: rgb(59, 58, 58);
			// font-weight: bold;
		}
	}
	.el-card__body {
		padding: 12px;
	}
}
</style>
