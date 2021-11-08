<template>
	<div class="home-navbar-box">
		<el-row type="flex" justify="center" :gutter="35" style="margin-left:0;margin-right:0;">
			<el-col :span="5" class="item">
				<el-avatar
					src="/static/logo1.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>

				<router-link :to="{ name: 'Home' }" style="text-decoration:none;color:black;"
					><span class="logo">周梓凌的个人网站</span></router-link
				>
			</el-col>
			<el-col :span="3" class="item">
				<el-avatar
					src="/static/apng.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Blog' }" style="text-decoration:none;color:black;"
					><span>技术博客</span></router-link
				>
			</el-col>
			<el-col :span="3" class="item">
				<el-avatar
					src="/static/githubb.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Project' }" style="text-decoration:none;color:black;"
					><span>个人项目</span></router-link
				>
			</el-col>
			<el-col :span="3" class="item">
				<el-avatar
					src="/static/l.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Message' }" style="text-decoration:none;color:black;"
					><span>留言板块</span></router-link
				>
			</el-col>
			<el-col :span="3" class="item">
				<el-avatar
					src="/static/z.png"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Leetcode' }" style="text-decoration:none;color:black;"
					><span>每日壹题</span>
				</router-link>
			</el-col>

			<el-col :span="4" class="item" v-if="access">
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
							<el-form :model="form">
								<el-form-item label="您的姓名" :label-width="formLabelWidth">
									<el-input v-model="form.name" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="联系方式" :label-width="formLabelWidth">
									<el-input v-model="form.phone" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="您的意见" :label-width="formLabelWidth">
									<el-input type="textarea" v-model="form.content" autocomplete="off" :rows="5"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
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
				<span class="upload">投稿</span>
			</el-col>

			<el-col :span="4" class="item" v-else>
				<el-avatar :src="p" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<router-link :to="{ name: 'Login' }" style="text-decoration:none;color:black;">
					<span>登录/注册&nbsp;</span>
				</router-link>
				<span class="upload">投稿</span>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import { UserApis } from '@/utils/apis'
import { OK, CREATED } from '@/utils/constants'
import { Message } from 'element-ui'

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
		return {
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
	position: sticky;
	z-index: 999;
	top: 0;
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
		.upload {
			background-color: #fb7299;
			text-align: center;
			padding: 0 10px;
			color: #fff;
			margin-left: 20px;
			font-size: 15px;
			line-height: 32px;
			font-weight: 500;
			border-radius: 2px;
			text-align: center;
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
</style>
