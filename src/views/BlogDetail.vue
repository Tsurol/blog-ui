<template>
	<div class="blog-detail">
		<Navbar id="nav" />
		<div class="container">
			<el-row type="flex" justify="center" :gutter="40" style="margin-left:0;margin-right:0">
				<el-col :md="12">
					<div class="header">
						<div class="tags">
							<span
								v-for="tag in tagList"
								:key="tag.id"
								class="tag-item"
								:style="{ backgroundColor: tag.bkc }"
							>
								{{ tag.name }}
							</span>
						</div>
						<h1 class="detail-title">{{ blogDetail.title }}</h1>
						<div class="blog-info">
							<div class="introduce">
								<img src="/static/original.png" alt="" />
							</div>
							<div style="color: #999;font-size:12.5px;" class="info">
								<div class="top">
									<span class="auth"
										><i class="el-icon-user">&nbsp;{{ blogDetail.user }}</i></span
									>
									<span class="created"
										><i class="el-icon-date">&nbsp;{{ blogDetail.created_at }}</i></span
									>
									<span class="view-count"><i class="el-icon-view">&nbsp;685</i></span>
								</div>
								<div class="bot">
									<span class="label"><i class="el-icon-folder">&nbsp;分类专栏：</i></span>
									<el-tag size="mini">数据结构与算法</el-tag>
								</div>
							</div>
						</div>
					</div>
					<div class="detail mavonEditor">
						<mavon-editor
							v-model="blogDetail.content"
							:subfield="prop.subfield"
							:defaultOpen="prop.defaultOpen"
							:toolbarsFlag="prop.toolbarsFlag"
							:editable="prop.editable"
							:scrollStyle="prop.scrollStyle"
							:boxShadow="prop.boxShadow"
							:previewBackground="prop.previewBackground"
							ref="md"
						/>
					</div>
					<div class="sep">
						<span>END</span>
					</div>
					<div class="comment-box">
						<div class="box-head">
							<div class="comment-title">评论区</div>
							<span>5条评论</span>
						</div>

						<div class="comment-ls">
							<div class="comment-item">
								<div class="comment-header">
									<div class="comment-user">
										<el-avatar
											:src="author"
											class="comment-avatar"
											style="box-shadow: 0px 0px 8px 2px rgb(193, 176, 224);border-radius: 5px;"
										></el-avatar>
										<strong class="nickname">张大炮</strong>
									</div>
									<div class="comment-time">3天前</div>
								</div>
								<div class="comment-body">
									<div class="comment-content">
										不能这么说，是他们的眼界让他们不能接受。现在中国做到的事是让他们世界观崩塌的事
									</div>
								</div>
								<div class="comment-footer">
									<span
										class="iconfont icon-dianzan_huaban"
										style="font-size:13px;margin-right:15px;"
										>&nbsp;342
									</span>
									<i class="el-icon-s-promotion reply-comment">&nbsp;回复</i>
									<!-- <i class="el-icon-s-flag reply-comment">&nbsp;举报</i> -->
								</div>
							</div>
							<div class="comment-item">
								<div class="comment-header">
									<div class="comment-user">
										<el-avatar
											:src="author"
											class="comment-avatar"
											style="box-shadow: 0px 0px 8px 2px rgb(193, 176, 224);border-radius: 5px;"
										></el-avatar>
										<strong class="nickname">张大炮</strong>
									</div>
									<div class="comment-time">3天前</div>
								</div>
								<div class="comment-body">
									<div class="comment-content">
										不能这么说，是他们的眼界让他们不能接受。现在中国做到的事是让他们世界观崩塌的事
									</div>
								</div>
								<div class="comment-footer">
									<span
										class="iconfont icon-dianzan_huaban"
										style="font-size:13px;margin-right:15px;"
										>&nbsp;342
									</span>
									<i class="el-icon-s-promotion reply-comment">&nbsp;回复</i>
									<!-- <i class="el-icon-s-flag reply-comment">&nbsp;举报</i> -->
								</div>
							</div>
						</div>

						<div class="commentor">
							<el-form ref="form" :model="form" label-width="auto">
								<el-form-item label="Your Name：">
									<el-input v-model="form.nickname" placeholder="请留下您的名称" size="medium"></el-input>
								</el-form-item>
								<el-form-item label="Your Message：">
									<el-input v-model="form.message" placeholder="说点什么吧..." size="medium"></el-input>
									<span class="message"><i class="el-icon-s-promotion"></i></span>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-col>
				<el-col :md="5">
					<div class="author">
						<div class="user-info">
							<el-avatar :src="author" class="avatar"></el-avatar>
							<div class="desc">
								<h3>作者昵称</h3>
								<p>作者座右铭</p>
							</div>
						</div>
						<div class="stats">
							<div>
								<span>博客</span>
								<strong>2</strong>
							</div>
							<div>
								<span>评论</span>
								<strong>2</strong>
							</div>
						</div>
						<div class="menu-ls">
							<el-button plain size="mini"><img :src="god" alt=""/></el-button>
							<el-button plain size="mini"><img :src="bad" alt=""/></el-button>
						</div>
					</div>
					<div class="rel-ques">
						<div class="title">最新评论</div>
						<div class="new-comment">
							<div class="new-comment-item">
								<a href="#" target="_blank" class="blog-titile">python爬虫学习</a>
								<p class="item">
									<span class="q">小张：</span>
									<span class="q-commen">哥，有源码嘛？</span>
								</p>
							</div>
							<div class="new-comment-item">
								<a href="#" target="_blank" class="blog-titile">python爬虫学习</a>
								<p class="item">
									<span class="q">小张：</span>
									<span class="q-commen">哥，有源码嘛？</span>
								</p>
							</div>
							<div class="new-comment-item">
								<a href="#" target="_blank" class="blog-titile">python爬虫学习</a>
								<p class="item">
									<span class="q">小张：</span>
									<span class="q-commen">哥，有源码嘛？</span>
								</p>
							</div>
						</div>
					</div>
					<div class="rel-ques">
						<div class="title">相关博客</div>
						<div class="rel-que-ls">
							<div>
								<a href="#" target="_blank">疫情过后，你会报复性消费吗？&nbsp;</a
								><span class="iconfont icon-dianzan_huaban" style="font-size:12px">30</span>
							</div>
							<div>
								<a href="#" target="_blank">疫情过后你最想去哪？和谁一起？&nbsp;</a
								><span class="iconfont icon-dianzan_huaban" style="font-size:12px">30</span>
							</div>
							<div>
								<a href="#" target="_blank">如果能熬过这波疫情，你最想做的事情是什么？&nbsp;</a
								><span class="iconfont icon-dianzan_huaban" style="font-size:12px">30</span>
							</div>
						</div>
					</div>
					<div class="right-footer">
						<a href="#">用户指南</a><span class="dot">·</span> <a href="#">用户使用协议</a
						><span class="dot">·</span>
						<a href="#">用户隐私权政策</a>
						<br />
						<a href="#">侵权举报</a><span class="dot">·</span>
						<a href="#">网上有害信息举报专区</a>
						<br />
						<a href="#">京ICP证 第19004865号</a>
						<br />
						<a href="#">京ICP备 第19004865号</a>
						<br />
						<a href="#">联系我们 &copy; 2021周梓凌</a>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import Navbar from '@/components/home/navbar'
import { ajax } from '@/utils/ajax'
import { BlogApis } from '@/utils/apis'
import { OK, CREATED } from '@/utils/constants'

export default {
	data() {
		return {
			value: '# test markdown',
			author: '/static/logo.png',
			god: '/static/god.png',
			bad: '/static/bad.png',
			id: '',
			tagList: [],
			blogDetail: {},
			form: {
				nickname: '',
				message: '',
			},
			commentList: [],
		}
	},
	components: {
		Navbar,
	},
	computed: {
		prop() {
			let data = {
				subfield: false, // 单双栏模式
				defaultOpen: 'preview', //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
				editable: false,
				toolbarsFlag: false,
				scrollStyle: false,
				boxShadow: false, //边框
				previewBackground: '#fff',
			}
			return data
		},
	},
	methods: {
		getCommentList() {
			ajax
				.get(BlogApis.blogCommentUrl, {
					params: {
						blog_id: this.blog_id,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.commentList = res.data.body.data
					}
				})
		},
		getTagList() {
			ajax
				.get(BlogApis.tagListUrl, {
					params: {
						blog_id: this.blog_id,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.tagList = res.data.body.data
					}
				})
		},
		getBlogDetail() {
			ajax
				.get(BlogApis.blogDetailUrl, {
					params: {
						blog_id: this.blog_id,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.blogDetail = res.data.body.data
					}
				})
		},
	},
	created() {
		this.blog_id = this.$route.params.id
		this.getTagList()
		this.getBlogDetail()
	},
}
</script>

<style lang="less">
.blog-detail {
	font-family: 'Consolas', 'Microsoft JhengHei', 'Apple LiGothic Medium,Microsoft YaHei', '微软雅黑',
		'Arial', sans-serif;
	background-color: #f5f5f5;
	.container {
		padding-top: 20px;
		.header {
			padding: 15px 20px 20px 20px;
			background-color: #fff;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			.tags {
				.tag-item {
					cursor: pointer;
					text-decoration: none;
					color: black;
					border-radius: 5px;
					padding: 0 2px;
					display: inline-block;
					margin-right: 5px;
					line-height: 25px;
					opacity: 0.6;
				}
			}
			h1 {
				margin: 0;
				margin-top: 5px;
				margin-bottom: 10px;
			}
			.blog-info {
				box-shadow: 0px 0px 20px 0px rgb(236, 236, 236);
				display: flex;
				align-items: unset;
				border-radius: 10px;
				//background-color: #f8f8f8;
				padding: 4px 0;
				.bot {
					padding-top: 3px;
				}
				.introduce {
					img {
						width: 36px;
						height: 32px;
					}
				}
				.info {
					margin-left: 10px;
				}
				.auth {
					margin-right: 15px;
				}
				.created {
					margin-right: 15px;
				}
			}
		}
		.detail {
			border-radius: 2px;
			background-color: rgb(251, 251, 251);
			// padding: 20px 20px;
			margin-top: 15px;
			// border: 1px solid black;
		}
		.sep {
			font-size: 30px;
			font-weight: bold;
			text-align: center;
			border-left: 200px solid rgb(228, 225, 228);
			border-right: 200px solid rgb(228, 225, 228);
			margin-top: 30px;
			margin-bottom: 30px;
			line-height: 8px;
		}
		.comment-box {
			background-color: #fff;
			padding: 15px 20px;
			.box-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				span {
					font-weight: bold;
				}
			}
			.comment-title {
				font-size: 30px;
				font-weight: bold;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			}
			.commentor {
				margin-top: 25px;
				.message {
					color: #0c0fa0;
					cursor: pointer;
					font-size: 17px;
					position: absolute;
					right: 15px;
				}
				.el-form-item__content {
					position: relative;
				}
				.el-form-item__label {
					font-weight: bold;
					padding: 0;
					font-size: 14px;
				}
			}
			.comment-ls {
				margin-top: 40px;
				.comment-item {
					margin-bottom: 30px;
					padding-bottom: 10px;
					border-bottom: 1px solid #dbdbdb;
					.comment-header {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.comment-user {
							display: flex;
							align-items: center;
							.comment-avatar {
								width: 25px;
								height: 25px;
							}
							.nickname {
								margin-left: 10px;
							}
						}
					}
					.comment-body {
						display: flex;
						align-items: center;
						.comment-content {
							margin-left: 35px;
							font-size: 15px;
							margin-top: 8px;
						}
					}
					.comment-footer {
						display: flex;
						align-items: center;
						margin-left: 35px;
						margin-top: 10px;
						cursor: pointer;
						color: #838080;
						font-size: 13px;
						i {
							margin-right: 20px;
						}
					}
				}
			}
		}

		// 右边
		.author {
			background-color: #fff;
			padding: 15px;
			.user-info {
				display: flex;
				flex-direction: row;
				.avatar {
					box-shadow: 0px 0px 8px 2px rgb(193, 176, 224);
				}
				.el-avatar--circle {
					border-radius: 5px;
				}
				.desc {
					padding-left: 10px;
					h3 {
						margin: 0;
					}
					p {
						color: #999595;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						margin: 0;
						font-size: 13px;
					}
				}
			}
			.stats {
				display: flex;
				margin-top: 10px;
				div {
					flex: 1;
					display: flex;
					flex-direction: column;
					text-align: center;
				}
			}
			.menu-ls {
				display: flex;
				margin-top: 10px;
				button {
					flex: 1;
					padding: 0;
					img {
						width: 27px;
					}
				}
			}
		}
		.rel-ques {
			background-color: #fff;
			padding: 15px;
			margin-top: 15px;
		}
		.rel-ques .title {
			font-weight: bold;
			font-size: 18px;
			margin-bottom: 5px;
		}
		.rel-ques .rel-que-ls > div {
			font-size: 12.5px;
			padding: 5px 0;
		}
		.rel-ques .rel-que-ls a {
			color: #175199;
			text-decoration: none;
		}
		.rel-ques .rel-que-ls span {
			color: #8590a6;
		}
		.new-comment-item {
			margin-bottom: 10px;
			border-bottom: 1px solid #dbdbdb;
			.blog-titile {
				text-decoration: none;
				line-height: 22px;
				margin-bottom: 2px;
				font-size: 14px;
				color: #999aaa;
				display: block;
			}
			.item {
				margin: 0;
				font-size: 13px;
			}
		}

		.right-footer {
			padding: 0 15px;
			margin-top: 15px;
		}
		.right-footer .dot {
			color: #8590a6;
		}
		.right-footer a {
			color: #8590a6;
			font-size: 12.5px;
			line-height: 2;
		}
		.right-footer a,
		.right-footer a:hover {
			text-decoration: none;
		}
	}
}
</style>
