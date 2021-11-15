<template>
	<div class="home-search-box">
		<el-row type="flex" justify="center" :gutter="35" style="margin-left:0;margin-right:0">
			<el-col :md="5" class="left">
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
				<div class="input-suffix" id="input-box">
					<el-input
						v-model="search"
						placeholder="搜一搜你感兴趣的吧"
						@keydown.enter.native="searchContent"
					></el-input>
					<i class="el-icon-search" @click="searchContent"></i>
				</div>
				<transition name="el-zoom-in-top">
					<div class="content" v-show="show">
						<div class="content-item" v-for="blogitem in blogList" :key="blogitem.id">
							<el-card>
								<div class="not">
									<router-link
										:to="{ name: 'BlogDetail', params: { id: blogitem.id } }"
										target="_blank"
										class="not-title"
										>{{ blogitem.title }}</router-link
									>
									<el-tag
										v-if="blogitem.is_top"
										effect="dark"
										style="padding:0 7px;height:19px;line-height:19px;margin-left:5px"
										>置顶</el-tag
									>
								</div>
								<div class="blogpart" v-if="blogitem.img">
									<div class="blog-left">
										<el-image
											style="width: 130px; height: 100px;border-radius:5px"
											:src="blogitem.img"
											fit="fill"
										>
										</el-image>
									</div>
									<div class="not-content blog-right" style="line-height:25px;font-size: 15px;">
										{{ blogitem.desc }}
									</div>
								</div>
								<div class="not-content" style="line-height:25px;font-size:15px;" v-else>
									{{ blogitem.desc }}
								</div>
								<span class="time">
									<div style="color: #999;font-size:12.5px;">
										<i class="el-icon-user">&nbsp;{{ blogitem.user }}</i>
										<span
											:id="blogitem.id"
											@click="loveBlog($event)"
											class="iconfont icon-dianzan_huaban"
											style="font-size:12.5px;margin-right:10px"
											>{{ blogitem.love_count }}</span
										>
										<i class="el-icon-chat-line-square">&nbsp;{{ blogitem.comment_count }}条评论</i>
										<i class="el-icon-date">&nbsp;{{ blogitem.created_at }}</i>
									</div>
								</span>
							</el-card>
						</div>
					</div>
				</transition>
				<div class="pagination">
					<el-pagination
						@current-change="handleCurrentChange"
						layout="prev, pager, next"
						:total="this.blogcount"
						:page-size="this.limit"
						background
						:hide-on-single-page="true"
					></el-pagination>
				</div>
			</el-col>
			<el-col :md="5" class="right">
				<div class="author">
					<el-avatar :src="author" class="avatar"></el-avatar>
					<div
						class="name"
						style="margin-bottom:6px;font-size:18px;color:#999595;font-weight:bold;text-align:center;"
					>
						Tsurol
					</div>
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
						<div class="split">|</div>
						<div class="comment">
							<span>评论</span>
							<span class="comment-count">{{ commentcount }}</span>
						</div>
					</div>
					<div class="contant">
						<el-button
							class="contant-author"
							type="text"
							@click="openvx"
							style="margin:0;padding:0;"
							><el-avatar :src="wechat" size="small"></el-avatar
						></el-button>
						<a
							v-for="contant in contantList"
							:key="contant.id"
							:href="contant.link"
							target="_blank"
						>
							<el-avatar :src="contant.icon" size="small" class="contant-author"></el-avatar>
						</a>
					</div>
				</div>
				<div class="tag-list">
					<el-card>
						<div class="tag-top">
							<i class="el-icon-price-tag"></i><span style="font-weight: bold;">标签云</span>
						</div>
						<div class="tag-body">
							<span
								:data-id="tag.id"
								@click="searchByTag($event)"
								v-for="tag in tagList"
								:key="tag.id"
								class="tag-item"
								:style="{ backgroundColor: tag.bkc }"
							>
								{{ tag.name }}
							</span>
						</div>
					</el-card>
				</div>
				<div class="clock">
					<div class="clock-week">{{ nowWeek }}</div>
					<div class="clock-title">{{ nowTime }}</div>
					<div class="clock-second">{{ nowSecond }}</div>
				</div>
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
import { OK, CREATED } from '@/utils/constants'

export default {
	data() {
		return {
			show: false,
			search: '',
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
			blog_id: '',
			TagList: [
				{ id: 1, type: 'success', content: '帅气逼人' },
				{ id: 2, type: '', content: '勤奋好学' },
				{ id: 4, type: 'danger', content: '积极阳光' },
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
					icon: '/static/csdn.png',
				},
				{
					id: 3,
					link: 'https://github.com/Tsurol',
					icon: '/static/githubb.png',
				},
			],
			author: '/static/logo.png',
			wechat: '/static/wechat.png',
			medium: 'medium',
			blogcount: 0,
			commentcount: '',
			nowTime: '',
			nowSecond: '',
			nowWeek: '',
			current_page: 1,
			limit: 5,
		}
	},
	inject: ['reload'],
	methods: {
		openvx() {
			this.$notify({
				dangerouslyUseHTMLString: true,
				message: '<strong>微信号：Tsurol</strong>',
				position: 'bottom-left',
				customClass: 'background',
			})
		},
		handleCurrentChange(val) {
			let top = document.getElementById('input-box')
			this.current_page = val
			this.getBlogList()
			setTimeout(() => {
				//设置延迟执行
				top.scrollIntoView({
					behavior: 'smooth', // 平滑过渡
				})
			}, 30)
		},
		getBlogList() {
			ajax
				.get(BlogApis.blogListUrl, {
					params: {
						page: this.current_page,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.blogList = res.data.body.data
					}
				})
		},
		getBlogCount() {
			ajax
				.get(BlogApis.blogListUrl, {
					params: {
						limit: 999,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.blogcount = res.data.body.data.length
					}
				})
		},
		getHotList() {
			ajax
				.get(BlogApis.blogListUrl, {
					params: {
						is_hot: 1,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.hotList = res.data.body.data
					}
				})
		},
		getTagList() {
			ajax.get(BlogApis.tagListUrl).then((res) => {
				if (res.data.code === OK) {
					this.tagList = res.data.body.data
				}
			})
		},
		loveBlog(e) {
			ajax({
				method: 'post',
				url: BlogApis.loveBlogUrl,
				data: {
					blog_id: e.target.getAttribute('id'),
				},
			}).then((res) => {
				if (res.data.code === CREATED) {
					// const love = document.getElementById(e.target.getAttribute('id'))
					this.getBlogList()
				}
			})
		},
		searchContent() {
			ajax
				.get(BlogApis.blogListUrl, {
					params: {
						search: this.search,
					},
				})
				.then(
					(res) => {
						if (res.data.code === OK) {
							this.blogList = res.data.body.data
							this.search = ''
						}
					},
					(error) => {
						this.search = ''
					}
				)
		},
		searchByTag(e) {
			ajax({
				method: 'post',
				url: BlogApis.blogByTagUrl,
				data: {
					tag_id: e.target.getAttribute('data-id'),
				},
			}).then((res) => {
				if (res.data.code === CREATED) {
					this.blogList = res.data.body.data
					console.log(this.blogList)
				}
			})
		},
		queryCommentCount() {
			ajax.get(BlogApis.commentCountUrl).then((res) => {
				if (res.data.code === OK) {
					this.commentcount = res.data.body.comment_count
				}
			})
		},
		timeFormate(timeStamp) {
			let year = new Date(timeStamp).getFullYear()
			let month =
				new Date(timeStamp).getMonth() + 1 < 10
					? '0' + (new Date(timeStamp).getMonth() + 1)
					: new Date(timeStamp).getMonth() + 1
			let date =
				new Date(timeStamp).getDate() < 10
					? '0' + new Date(timeStamp).getDate()
					: new Date(timeStamp).getDate()
			var week = timeStamp ? new Date(timeStamp) : new Date()
			if (week.getDay() == 1) {
				this.nowWeek = 'Monday'
			} else if (week.getDay() == 2) {
				this.nowWeek = 'Tuesday'
			} else if (week.getDay() == 3) {
				this.nowWeek = 'Wednesday'
			} else if (week.getDay() == 4) {
				this.nowWeek = 'Thursday'
			} else if (week.getDay() == 5) {
				this.nowWeek = 'Friday'
			} else if (week.getDay() == 6) {
				this.nowWeek = 'Saturday'
			} else {
				this.nowWeek = 'Sunday'
			}
			let hh =
				new Date(timeStamp).getHours() < 10
					? '0' + new Date(timeStamp).getHours()
					: new Date(timeStamp).getHours()
			let mm =
				new Date(timeStamp).getMinutes() < 10
					? '0' + new Date(timeStamp).getMinutes()
					: new Date(timeStamp).getMinutes()
			let ss =
				new Date(timeStamp).getSeconds() < 10
					? '0' + new Date(timeStamp).getSeconds()
					: new Date(timeStamp).getSeconds()
			this.nowTime = year + '/' + month + '/' + date
			this.nowSecond = hh + ':' + mm + ':' + ss
			clearInterval(this.Times)
		},
		nowTimes() {
			this.timeFormate(new Date())
			this.Times = setInterval(this.nowTimes, 1000)
		},
	},
	created() {
		this.nowTimes()
		this.getHotList()
		this.getTagList()
		this.getBlogList()
		this.queryCommentCount()
		this.getBlogCount()
	},
	mounted() {
		this.show = true
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
		.content-notice {
			margin-bottom: 15px;
		}
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
		.author {
			border-radius: 5px;
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
				transition: all 0.15s linear;
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
				.split {
					line-height: 40px;
					font-weight: 400px;
					font-size: 20px;
				}
				font-weight: 400;
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
				padding: 5px 60px;
				justify-content: space-around;
				align-items: center;
				.el-avatar--small {
					background-color: rgb(255, 255, 255);
					cursor: pointer;
					margin-right: 4px;
				}
				.contant-author:hover {
					transform: scale(1.3, 1.3);
				}
			}
			.avatar {
				height: 85px;
				width: 85px;
			}
		}
		.clock {
			margin-top: 15px;
			background-color: #fff;
			font-size: 20px;
			color: #740d77;
			padding: 12px;
			font-weight: 600;
			.clock-second {
				font-size: 45px;
				font-weight: 800;
			}
		}
		.tag-list {
			margin-top: 15px;
		}
		.tag-top {
			font-size: 17px;
			border-bottom: 1px solid rgb(192, 196, 204);
			padding-bottom: 7px;
		}
		.tag-item {
			cursor: pointer;
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
					.not-title {
						color: inherit;
						text-decoration: none;
					}
					.not-title:hover {
						color: rgb(92, 118, 223);
					}
				}
				.blogpart {
					display: flex;
					flex-flow: row nowrap;
					margin-top: 5px;
					.blog-left {
					}
					.blog-right {
						padding: 0 15px;
					}
					.image-slot {
						background-color: #f5f7fa;
						height: 100%;
					}
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
		.pagination {
			.el-pagination {
				padding-top: 10px;
				padding-bottom: 5px;
				text-align: center;
			}
		}
	}
	.input-suffix {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		position: relative;
		i {
			cursor: pointer;
			font-size: 22px;
			position: absolute;
			right: 7px;
			color: #0c5297;
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
