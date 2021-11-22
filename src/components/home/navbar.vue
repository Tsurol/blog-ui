<template>
	<div class="home-navbar-box">
		<el-row type="flex" justify="center">
			<el-col :span="5" :md="5" :xs="12" :sm="7" class="item show">
				<el-avatar
					src="/static/logo1.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>

				<!-- <router-link :to="{ name: 'Home' }" style="text-decoration:none;color:black;"
					><span class="logo">周梓凌的个人网站</span></router-link
				> -->
				<span class="logo" @click="reloadHome">周梓凌的个人网站</span>
			</el-col>
			<el-col :span="3" :md="3" :xs="0" :sm="0" class="item not-show hidden-sm-only">
				<el-avatar
					src="/static/apng.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Home' }" style="text-decoration:none;color:black;"
					><span>技术博客</span></router-link
				>
			</el-col>
			<el-col :span="3" :md="3" :xs="0" :sm="0" class="item not-show hidden-sm-only">
				<el-avatar
					src="/static/githubb.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Project' }" style="text-decoration:none;color:black;"
					><span>个人项目</span></router-link
				>
			</el-col>
			<el-col :span="3" :md="3" :xs="0" :sm="4" class="item not-show">
				<el-avatar
					src="/static/l.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Message' }" style="text-decoration:none;color:black;"
					><span>留言板块</span></router-link
				>
			</el-col>
			<el-col :span="3" :md="3" :xs="0" :sm="4" class="item not-show">
				<el-avatar
					src="/static/z.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Leetcode' }" style="text-decoration:none;color:black;"
					><span>每日壹题</span>
				</router-link>
			</el-col>

			<el-col :span="4" :md="4" :xs="8" :sm="7" class="item show" v-if="access">
				<el-dropdown :show-timeout="10" :hide-timeout="50" placement="bottom">
					<el-avatar
						class="avatar"
						:src="user.avatar"
						size="small"
						style="background-color:rgb(255, 255, 255);border-radius: 90%"
					>
					</el-avatar>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item
							><i class="el-icon-coin"></i>鲨币<span style="color:goldenrod;">{{
								this.user.coins | numFilter
							}}</span></el-dropdown-item
						>
						<el-dropdown-item
							><router-link :to="{ name: 'Mine' }" style="text-decoration: none;color:inherit"
								><i class="el-icon-user"></i>个人中心</router-link
							></el-dropdown-item
						>
						<el-dropdown-item
							><span @click="dialogFormVisible = true"><i class="el-icon-user"></i>意见反馈</span>
						</el-dropdown-item>

						<el-dialog title="意见反馈" :append-to-body="true" :visible.sync="dialogFormVisible">
							<el-form :model="form" :rules="adviceRules" status-icon>
								<el-form-item label="您的姓名" :label-width="formLabelWidth" prop="name">
									<el-input v-model="form.name" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
									<el-input v-model="form.phone" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="您的意见" :label-width="formLabelWidth" prop="content">
									<el-input
										type="textarea"
										v-model="form.content"
										autocomplete="off"
										:rows="5"
									></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="AdviceSubmit">提 交</el-button>
							</div>
						</el-dialog>
						<el-dropdown-item
							><span @click="logout"
								><i class="el-icon-switch-button"></i>退出登录</span
							></el-dropdown-item
						>
					</el-dropdown-menu>
				</el-dropdown>
				<router-link :to="{ name: 'Mine' }" style="text-decoration:none;color:black;">
					<span>{{ user.nickname }}</span>
				</router-link>
				<!-- <span class="upload">投稿</span> -->
				<el-button type="danger" @click="Contribution" class="not-show-btn">投稿</el-button>
			</el-col>

			<el-col :span="4" :md="4" :xs="8" :sm="7" class="item show" v-else>
				<el-avatar :src="p" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<router-link :to="{ name: 'Login' }" style="text-decoration:none;color:black;">
					<span>登录/注册&nbsp;</span>
				</router-link>
				<!-- <span class="upload">投稿</span> -->
				<el-button type="danger" @click="Contribution" class="not-show-btn">投稿</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import { UserApis } from '@/utils/apis'
import { OK, CREATED } from '@/utils/constants'
import { Message } from 'element-ui'
import { BlogApis } from '@/utils/apis'

export default {
	inject: ['reload'],
	filters: {
		numFilter(value) {
			// 截取当前数据到小数点后两位
			let realVal = parseFloat(value).toFixed(1)
			return realVal
		},
	},
	data() {
		var validatePhone = (rule, value, callback) => {
			const reg = /^[1][3,4,5,7,8][0-9]{9}$/
			if (this.form.phone == '' || this.form.phone == undefined || this.form.phone == null) {
				callback()
			} else {
				if (!reg.test(this.form.phone) && this.form.phone != '') {
					callback(new Error('请输入正确的电话号码'))
				} else {
					callback()
				}
			}
		}
		return {
			adviceRules: {
				name: [
					{ required: true, message: '姓名不能为空', trigger: 'blur' },
					{ min: 2, max: 8, message: '长度应在 2~8 个字符', trigger: 'blur' },
				],
				phone: [
					{ validator: validatePhone, trigger: 'blur' },
					{ required: true, message: '内容不能为空', trigger: 'blur' },
				],
				content: [
					{ required: true, message: '内容不能为空', trigger: 'blur' },
					{ min: 5, message: '长度应在5个字符以上', trigger: 'blur' },
				],
			},
			formLabelWidth: '100px',
			dialogFormVisible: false,
			centerDialogVisible: false,
			form: {
				name: '',
				phone: '',
				content: '',
			},
			timeout: 150,
			p: '/static/p.png',
			// defaultAvatar: '/static/default_avatar.jpg',
			activeName: 'second',
			invt: '',
			access: '',
			user: {
				nickname: '',
				avatar: '',
				coins: 0,
			},
		}
	},
	methods: {
		reloadHome() {
			this.reload()
			this.$router.push({ name: 'Home' })
		},
		Contribution() {
			if (window.localStorage.getItem('access')) {
				this.$router.push({ name: 'Contribution' })
			} else {
				Message({
					message: '请登录后再操作',
					type: 'error',
					duration: 3000,
					showClose: true,
				})
			}
		},
		AdviceSubmit() {
			this.dialogFormVisible = false
			ajax({
				method: 'post',
				url: BlogApis.UserAdviceUrl,
				data: {
					name: this.form.name,
					mobile: this.form.phone,
					advice: this.form.content,
				},
			}).then((res) => {
				if (res.data.code === CREATED) {
					this.form.name = ''
					this.form.phone = ''
					this.form.content = ''
					Message({
						message: '作者已收到您的意见反馈',
						type: 'success',
						duration: 5000,
						showClose: true,
					})
				}
			})
		},
		logout() {
			if (window.localStorage.getItem('access')) {
				window.localStorage.removeItem('access')
				Message({
					message: '已为您安全地退出登录',
					type: 'success',
					duration: 5000,
					showClose: true,
				})
				this.reload()
			}
		},
		getUserinfo() {
			ajax.get(UserApis.userInfoUrl).then((res) => {
				if (res.data.code === OK) {
					this.user.nickname = res.data.body.nickname
					this.user.avatar = res.data.body.avatar
					this.user.coins = res.data.body.coins
				}
			})
		},
	},
	mounted() {
		this.access = window.localStorage.getItem('access')
		if (this.access) {
			this.getUserinfo()
		}
	},
}
</script>

<style lang="less">
.home-navbar-box {
	font-family: 'Consolas', 'Microsoft JhengHei', 'Apple LiGothic Medium,Microsoft YaHei', '微软雅黑',
		'Arial', sans-serif;
	padding: 2px 0;
	z-index: 1600;
	top: 0;
	position: fixed;
	width: 100%;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	text-align: center;
	background-color: #fff;
	font-size: 15px;
	.el-row {
		.item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.el-avatar--circle {
			border-radius: 0;
		}
		.el-avatar--small {
			width: 30px;
			height: 30px;
		}
		.avatar:hover {
			transform: scale(1.1, 1.1);
		}
		.el-button--danger {
			background-color: #fb7299;
			margin-left: 30px;
		}
		.el-button--danger span:hover {
			color: rgb(94, 2, 2);
		}
		.el-button {
			padding: 10px 12px;
		}
		.logo {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
				'Open Sans', 'Helvetica Neue', sans-serif;
			font-size: 17px;
			color: #0e5336;
			font-weight: 555;
		}
	}
	.el-dropdown-link {
		cursor: pointer;
	}
	.el-dropdown {
		font-family: 'Consolas', 'Microsoft JhengHei', 'Apple LiGothic Medium,Microsoft YaHei',
			'微软雅黑', 'Arial', sans-serif;
		color: black;
	}
	.el-icon-arrow-down {
		font-size: 15px;
	}
	span {
		cursor: pointer;
	}
	span:hover {
		color: rgb(59, 83, 192);
	}
}
.el-dialog {
	width: 35%;
}

@media screen and (min-width: 1200px) {
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
}

@media screen and (min-width: 768px) and (max-width: 991px) {
}
@media screen and (max-width: 767px) {
	.home-navbar-box {
		.el-row {
			.not-show {
				display: none;
			}
			.show {
				.not-show-btn {
					display: none;
				}
			}
		}
	}
}
</style>
