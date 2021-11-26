<template>
	<div class="blog-detail">
		<div style="width: 100%;height: 100%;">
			<el-backtop :bottom="60"></el-backtop>
		</div>
		<Navbar id="nav" class="nav" />
		<div class="container">
			<el-row type="flex" justify="center" :gutter="40" style="margin-left:0;margin-right:0">
				<el-col :span="12" :xs="24" :sm="16" :lg="12">
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
							<div class="introduce" v-if="blogDetail.is_origin">
								<img src="/static/original.png" alt="" />
							</div>
							<div class="introduce" v-else>
								<img src="/static/reprint.png" alt="" />
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
									<el-tag size="mini">{{ blogDetail.category }}</el-tag>
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
							:navigation="prop.navigation"
							:codeStyle="prop.codeStyle"
							:previewBackground="prop.previewBackground"
							:ishljs="prop.ishljs"
							:externalLink="externalLink"
							ref="md"
						/>
					</div>
					<div class="sep">
						<span>END</span>
					</div>
					<div class="comment-box">
						<div class="box-head">
							<div class="comment-title">评论区</div>
							<span>{{ comment_count || '0' }}条评论</span>
						</div>

						<div class="commentor">
							<el-form ref="form" :model="form" :rules="rulesComment">
								<el-form-item prop="username">
									<el-input
										v-model="form.nickname"
										placeholder="请留下您的名称"
										size="medium"
									></el-input>
								</el-form-item>
								<el-form-item prop="content">
									<el-input
										v-model="form.message"
										placeholder="说点什么吧..."
										size="medium"
										@keydown.enter.native="postCommentList"
									></el-input>
									<span class="message" @click="postCommentList"
										><i class="el-icon-s-promotion"></i
									></span>
								</el-form-item>
							</el-form>
						</div>

						<div class="comment-ls" v-if="commentList.length">
							<div
								class="comment-item"
								v-for="item in commentList"
								:key="item.id"
								:data-id="item.id"
							>
								<div class="comment-header">
									<div class="comment-user">
										<el-avatar
											v-if="item.temporary_nickname"
											:src="item.temporary_avatar"
											class="comment-avatar"
										></el-avatar>
										<el-avatar
											v-else
											:src="item.user.profile.avatar"
											class="comment-avatar"
										></el-avatar>
										<strong class="nickname" v-if="item.temporary_nickname">{{
											item.temporary_nickname
										}}</strong>
										<strong class="nickname" v-else>{{ item.user.profile.nickname }}</strong>
									</div>
									<div class="comment-time">{{ item.created_at }}</div>
								</div>
								<div class="comment-body">
									<div class="comment-content">
										{{ item.content }}
									</div>
								</div>
								<div class="comment-footer">
									<span
										@click="loveComment(item.id)"
										class="iconfont icon-dianzan_huaban"
										style="font-size:13px;margin-right:15px;"
										>{{ item.love_count }}
									</span>
									<i
										class="el-icon-s-promotion reply-comment"
										@click="showReplyBox($event)"
										:id="item.id"
										>回复</i
									>
									<!-- <i class="el-icon-s-flag reply-comment">举报</i> -->
								</div>
								<div class="commentor">
									<el-form ref="form1" :model="form1">
										<el-form-item>
											<el-input
												v-model="form1.nickname"
												placeholder="请留下您的名称"
												size="medium"
											></el-input>
										</el-form-item>
										<el-form-item>
											<el-input
												v-model="form1.message"
												placeholder="对他有话要说？"
												size="medium"
												@keydown.enter.native="postReplyList(item.id)"
											></el-input>
											<span class="message" @click="postReplyList(item.id)"
												><i class="el-icon-s-promotion"></i
											></span>
										</el-form-item>
									</el-form>
								</div>

								<div class="reply" v-for="replyitem in item.reply" :key="replyitem.id">
									<div class="comment-header">
										<div class="comment-user">
											<el-avatar :src="replyitem.avatar" class="comment-avatar"></el-avatar>
											<strong class="nickname">{{ replyitem.nickname }}</strong>
											<!-- <span class="pp">&nbsp;@{{ item.reply.to_user }}</span
											>： -->
										</div>
										<div class="comment-time">{{ replyitem.created_at }}</div>
									</div>
									<div class="comment-body">
										<div class="comment-content">
											{{ replyitem.content }}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div
							class="comment-ls"
							v-else
							style="margin-top:100px;padding-bottom:130px;color:grey;text-align:center;font-size:20px"
						>
							<span>来发表评论吧...</span>
						</div>
					</div>
				</el-col>
				<el-col :span="5" :xs="0" :sm="8" :lg="5">
					<div class="author">
						<div class="user-info">
							<el-avatar :src="user.avatar" class="avatar"></el-avatar>
							<div class="desc">
								<h3>{{ user.nickname }}</h3>
								<p>{{ user.words }}</p>
							</div>
						</div>
						<div class="stats">
							<div>
								<span>博客</span>
								<strong>{{ user.blog.blog_count }}</strong>
							</div>
							<div class="split">|</div>
							<div>
								<span>评论</span>
								<strong>{{ user.blog.comment_count }}</strong>
							</div>
						</div>
						<div class="menu-ls">
							<el-button plain size="mini" @click="loveBlog"><img :src="god" alt=""/></el-button>
							<el-button plain size="mini" @click="dislove"><img :src="bad" alt=""/></el-button>
						</div>
					</div>
					<div class="rel-ques">
						<div class="title">最新评论</div>
						<div class="new-comment">
							<div class="new-comment-item" v-for="item in NewcommentList" :key="item.id">
								<router-link
									:to="{ name: 'BlogDetail', params: { id: item.blog } }"
									target="_blank"
									class="blog-titile"
									>{{ item.blog_title }}</router-link
								>
								<p class="item">
									<span class="q" v-if="item.temporary_nickname"
										>{{ item.temporary_nickname }}：</span
									>
									<span class="q" v-else>{{ item.user.profile.nickname }}：</span>
									<span class="q-commen">{{ item.content }}</span>
								</p>
							</div>
						</div>
					</div>
					<div class="rel-ques">
						<div class="title">随机推送</div>
						<div class="rel-que-ls">
							<div v-for="item in randowBlogList" :key="item.id" class="random">
								<router-link
									:to="{ name: 'BlogDetail', params: { id: item.id } }"
									target="_blank"
									style="font-size:15px"
									>{{ item.title }}&nbsp;</router-link
								><span class="iconfont icon-dianzan_huaban" style="font-size:13px">{{
									item.love_count
								}}</span>
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
		<el-backtop target=".blog-detail"></el-backtop>
	</div>
</template>

<script>
import Navbar from '@/components/home/navbar'
import { ajax } from '@/utils/ajax'
import { BlogApis } from '@/utils/apis'
import { OK, CREATED } from '@/utils/constants'
import { Host } from '@/utils/constants'

export default {
	data() {
		return {
			rulesComment: {
				// username: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
				// content: [{ required: true, message: '评论内容不能为空', trigger: 'blur' }],
			},
			externalLink: {
				markdown_css: function() {
					// 这是你的markdown css文件路径
					return '/mavon-editor/markdown/github-markdown.min.css'
				},
				hljs_js: function() {
					// 这是你的hljs文件路径
					return '/mavon-editor/highlightjs/highlight.min.js'
				},
				hljs_css: function(css) {
					// 这是你的代码高亮配色文件路径
					return '/mavon-editor/highlightjs/styles/' + css + '.min.css'
				},
				hljs_lang: function(lang) {
					// 这是你的代码高亮语言解析路径
					return '/mavon-editor/highlightjs/languages/' + lang + '.min.js'
				},
				katex_css: function() {
					// 这是你的katex配色方案路径路径
					return '/mavon-editor/katex/katex.min.css'
				},
				katex_js: function() {
					// 这是你的katex.js路径
					return '/mavon-editor/katex/katex.min.js'
				},
			},
			user: {
				nickname: '',
				avatar: '',
				words: '',
				blog: {
					blog_count: '',
					comment_count: '',
				},
			},
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
			form1: {
				nickname: '',
				message: '',
			},
			commentList: [],
			NewcommentList: [],
			comment_count: '',
			is_login: true,
			open_reply_box: false,
			randowBlogList: [],
		}
	},
	components: {
		Navbar,
	},
	watch: {
		$route(to, from) {
			//重新获取数据
			this.blog_id = this.$route.params.id
			this.getTagList()
			this.getBlogDetail()
			this.getCommentList()
			this.getAuthorinfo()
			this.islogin()
			this.getNewCommentList()
		},
	},
	inject: ['reload'],
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
				navigation: false,
				codeStyle: '',
				ishljs: true,
			}
			return data
		},
	},
	methods: {
		getRandomBlog() {
			ajax.get(BlogApis.blogRandomUrl).then((res) => {
				if (res.data.code === OK) {
					this.randowBlogList = res.data.body.data
				}
			})
		},
		getNewCommentList() {
			ajax
				.get(BlogApis.blogCommentUrl, {
					params: {
						order: 1,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.NewcommentList = res.data.body.data
					}
				})
		},
		islogin() {
			const access = window.localStorage.getItem('access')
			if (access) {
				this.is_login = false
			} else {
				this.is_login = true
			}
		},
		loveComment(id) {
			ajax({
				method: 'post',
				url: BlogApis.loveBlogUrl,
				data: {
					// comment_id: e.target.getAttribute('id'),
					comment_id: id,
				},
			}).then((res) => {
				if (res.data.code === CREATED) {
					this.getCommentList()
				}
			})
		},
		showReplyBox(e) {
			let commentorBox, commentorBoxAttr, id
			id = e.target.getAttribute('id')
			commentorBoxAttr = document.getElementById(id)
			commentorBox = e.currentTarget.parentElement.nextElementSibling
			console.log(commentorBox)
			if (this.open_reply_box == false) {
				commentorBox.style.display = 'block'
				this.open_reply_box = true
			} else if (this.open_reply_box == true) {
				commentorBox.style.display = 'none'
				this.open_reply_box = false
			}
		},
		postReplyList(id) {
			// if (window.localStorage.getItem('access')) {
			// 	ajax
			// 		.post(BlogApis.blogCommentUrl, {
			// 			blog_id: this.blog_id,
			// 			content: this.form1.message,
			// 			reply_id: id,
			// 		})
			// 		.then((res) => {
			// 			if (res.data.code === CREATED) {
			// 				this.form1.message = ''
			// 				this.form1.nickname = ''
			// 				this.reload()
			// 			}
			// 		})
			// } else {
			ajax
				.post(BlogApis.blogCommentUrl, {
					temporary: this.form1.nickname,
					blog_id: this.blog_id,
					content: this.form1.message,
					reply_id: id,
				})
				.then((res) => {
					if (res.data.code === CREATED) {
						this.form1.message = ''
						this.form1.nickname = ''
						this.reload()
					}
				})
		},
		postCommentList() {
			ajax
				.post(BlogApis.blogCommentUrl, {
					temporary: this.form.nickname,
					blog_id: this.blog_id,
					content: this.form.message,
				})
				.then((res) => {
					if (res.data.code === CREATED) {
						this.form.message = ''
						this.form.nickname = ''
						this.reload()
					}
				})
		},
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
						this.comment_count = res.data.body.comment_count
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
		getAuthorinfo() {
			ajax
				.get(BlogApis.blogAuthorUrl, {
					params: {
						blog_id: this.blog_id,
					},
				})
				.then((res) => {
					if (res.data.code === OK) {
						this.user.nickname = res.data.body.nickname
						this.user.avatar = res.data.body.avatar
						this.user.words = res.data.body.words
						this.user.blog.blog_count = res.data.body.blog.blog_count
						this.user.blog.comment_count = res.data.body.blog.comment_count
					}
				})
		},
		loveBlog() {
			ajax({
				method: 'post',
				url: BlogApis.loveBlogUrl,
				data: {
					blog_id: this.blog_id,
				},
			}).then((res) => {
				if (res.data.code === CREATED) {
					this.getBlogDetail()
					this.$message({
						showClose: true,
						message: '作者已收到您的点赞',
						type: 'success',
					})
				}
			})
		},
		dislove() {
			this.$message({
				showClose: true,
				message: '作者已收到您的反馈',
				type: 'success',
			})
		},
	},
	created() {
		this.blog_id = this.$route.params.id
		this.getTagList()
		this.getBlogDetail()
		this.getCommentList()
		this.getAuthorinfo()
		this.islogin()
		this.getNewCommentList()
		this.getRandomBlog()
	},
	mounted() {
		this.prop.codeStyle = 'atom-one-dark'
	},
}
</script>

<style lang="less">
.markdown-body .highlight pre,
.markdown-body pre {
	padding: 0;
}
.blog-detail {
	padding-top: 40px;
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
					font-size: 21px;
					position: absolute;
					right: 12px;
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
					// margin-bottom: 30px;
					margin-top: 10px;
					padding-bottom: 5px;
					border-bottom: 1px solid #dbdbdb;
					.commentor {
						display: none;
						margin-top: 10px;
						.message {
							color: #0c0fa0;
							cursor: pointer;
							font-size: 21px;
							position: absolute;
							right: 12px;
						}
						.el-form-item {
							margin-bottom: 10px;
						}
						.el-form-item__label {
							font-weight: bold;
							padding: 0;
							font-size: 14px;
						}
					}
					.comment-header {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.comment-time {
							font-size: 13.5px;
							color: #7f8081;
						}
						.comment-user {
							display: flex;
							align-items: center;
							.comment-avatar {
								width: 25px;
								height: 25px;
							}
							.nickname {
								margin-left: 5px;
							}
						}
					}
					.comment-body {
						display: flex;
						align-items: center;
						.comment-content {
							margin-left: 35px;
							font-size: 15px;
							margin-top: 5px;
						}
					}
					.comment-footer {
						display: flex;
						align-items: center;
						margin-left: 35px;
						margin-top: 5px;
						cursor: pointer;
						color: #838080;
						font-size: 13px;
						i {
							margin-right: 20px;
						}
						i:hover {
							color: #1a65c0;
						}
						span:hover {
							color: #1a65c0;
						}
					}
					.reply {
						padding-left: 30px;
						margin-top: 10px;
						// padding-bottom: 5px;
						// border-bottom: 1px solid #dbdbdb;
						.comment-header {
							display: flex;
							align-items: center;
							justify-content: space-between;
							.comment-user {
								font-size: 14px;
								display: flex;
								align-items: center;
								.comment-avatar {
									width: 25px;
									height: 25px;
								}
								.nickname {
									margin-left: 5px;
								}
								.pp {
									color: blue;
								}
							}
						}
						.comment-body {
							display: flex;
							align-items: center;
							.comment-content {
								margin-left: 35px;
								font-size: 15px;
								margin-top: 5px;
							}
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
					box-shadow: 0px 0px 0px 2px rgb(213, 213, 216);
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
						margin-top: 2px;
					}
				}
			}
			.stats {
				justify-content: center;
				display: flex;
				margin-top: 10px;
				div {
					flex: 1;
					display: flex;
					flex-direction: column;
					text-align: center;
				}
				.split {
					font-size: 20px;
					line-height: 40px;
				}
			}
			.menu-ls {
				display: flex;
				margin-top: 10px;
				button {
					flex: 1;
					padding: 0;
					span {
						display: flex;
						justify-content: center;
						align-items: flex-end;
						img {
							width: 27px;
						}
						span {
							font-size: 15px;
						}
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
			font-size: 21px;
			margin-bottom: 5px;
		}
		.rel-ques .rel-que-ls > div {
			font-size: 12.5px;
			padding-top: 15px;
			padding-bottom: 0;
		}
		.rel-ques .rel-que-ls a {
			color: #4c2b88;
			text-decoration: none;
		}
		.rel-ques .rel-que-ls span {
			color: #8590a6;
		}
		.random {
			border-bottom: 1px solid #dddcdc;
		}
		.random:hover {
			background-color: #f9feff;
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
			.blog-titile:hover {
				color: rgb(119, 189, 168);
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
@media screen and (max-width: 767px) {
	.blog-detail {
		.container {
			.el-row {
				.header {
					.tags {
						.tag-item {
							font-size: 13px;
						}
					}
					.detail-title {
						font-size: 21px;
					}
					.blog-info {
						.info {
							.top {
								.view-count {
									display: none;
								}
							}
						}
					}
				}
				.sep {
					display: none;
				}
				.comment-box {
					.box-head {
						.comment-title {
							font-size: 24px;
						}
						span {
							font-size: 13px;
						}
					}
				}
			}
		}
	}
}
</style>
