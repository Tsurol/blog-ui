<template>
	<div class="page-login">
		<el-row>
			<el-col :span="8" :offset="8">
				<el-alert title="游客您好，欢迎登录！" type="success" center></el-alert>
				<div class="login-form">
					<el-tabs v-model="activeName">
						<el-tab-pane label="密码登录" name="username">
							<!-- 登陆头区域 -->
							<div class="login-header">
								<h2 class="title" style="margin:0">密码登录</h2>
							</div>
							<!-- //登陆头区域 -->
							<!-- 登录表单 -->
							<el-form
								:label-position="labelPosition"
								label-width="66px"
								:model="formLogin"
								:rules="rulesUsername"
								ref="formLogin"
							>
								<el-form-item label="用户名" size="small" prop="username">
									<el-input
										v-model="formLogin.username"
										placeholder="请输入用户名"
										clearable
										class="input"
										autocomplete="off"
									></el-input>
								</el-form-item>
								<el-form-item label="密码" size="small" prop="pwd">
									<el-input
										v-model="formLogin.pwd"
										placeholder="请输入密码"
										clearable
										show-password
										class="input"
										autocomplete="off"
									></el-input>
								</el-form-item>
								<div class="forget-pwd">
									<router-link
										:to="{ name: 'Forgot' }"
										class="rlf-forget"
										target="_blank"
										hidefocus="true"
										>忘记密码&nbsp;|&nbsp;</router-link
									>
									<el-button type="text" @click="dialogVisible = true" class="rlf-forget-btn"
										>遇到问题</el-button
									>
									<el-dialog :visible.sync="dialogVisible" width="30%" center>
										<span>如遇BUG，请积极联系作者反馈~</span>
										<span slot="footer" class="dialog-footer">
											<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
										</span>
									</el-dialog>
								</div>
								<el-button type="primary" @click="submitForm('formLogin')" class="btn-login"
									>立即登录</el-button
								>
							</el-form>
							<!-- //登录表单 -->
						</el-tab-pane>

						<el-tab-pane label="验证码登录" name="code">
							<!-- 登陆头区域 -->
							<div class="login-header">
								<h2 class="title" style="margin:0">验证码登录</h2>
							</div>
							<!-- //登陆头区域 -->
							<!-- 登录表单 -->
							<el-form
								:label-position="labelPosition"
								label-width="66px"
								:model="formCode"
								ref="formCode"
								:rules="rulesCode"
							>
								<el-form-item label="邮箱" size="small" prop="email">
									<el-input
										v-model="formCode.email"
										placeholder="请输入邮箱"
										clearable
										class="input"
									>
										<el-button
											slot="append"
											style="background-color:rgb(240,249,235)"
											@click.prevent="sendcode()"
											:disabled="isCodeSend"
											>{{ sendBtnText }}</el-button
										>
									</el-input>
								</el-form-item>
								<el-form-item label="验证码" size="small" prop="code">
									<el-input
										v-model="formCode.code"
										placeholder="请输入验证码"
										clearable
										class="input"
									>
									</el-input>
								</el-form-item>
								<el-button type="primary" @click="submitForm1('formCode')" class="btn-login"
									>立即登录</el-button
								>
							</el-form>
							<!-- //登录表单 -->
						</el-tab-pane>
					</el-tabs>

					<!-- 文字提示 -->
					<div class="tips">
						登录表示同意
						<a href="#" style="text-decoration:none; color:dodgerblue">用户使用协议</a>及<a
							>隐私条款</a
						>
						<div style="margin-top:5px">
							没有账号？
							<router-link :to="{ name: 'Register' }" style="text-decoration:none; color:dodgerblue"
								>点击注册></router-link
							>
						</div>
					</div>
					<!-- 页脚:相关信息 -->
					<div class="login-footer">
						<span href="#">京ICP 备10002670012号</span>
					</div>
					<!-- //页脚:相关信息 -->
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import { UserApis } from '@/utils/apis'
import { CREATED, BAD_REQUEST, NOT_FOUND, TWO_MANY_REQUESTS } from '@/utils/constants'

export default {
	data() {
		return {
			isCodeSend: false,
			sendBtnText: '发送验证码',
			counter: 60,
			timer: null,
			dialogVisible: false,
			activeName: 'username',
			labelPosition: 'left',
			formLogin: {
				username: '',
				pwd: '',
			},
			formCode: {
				email: '',
				code: '',
			},
			rulesUsername: {
				username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
				pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
			},
			rulesCode: {
				email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
				code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
			},
		}
	},
	methods: {
		// 倒计时函数
		countDown() {
			this.timer = setInterval(() => {
				this.sendBtnText = `(${this.counter}秒)后重新发送`
				this.counter--
				if (this.counter < 0) {
					this.reset()
				}
			}, 1000)
		},
		send_code() {
			ajax
				.post(UserApis.sendCodeUrl, {
					email: this.formCode.email,
				})
				.then(
					(res) => {
						if (res.data.code === CREATED) {
							this.$message.success('请查收验证码')
							this.code = res.data.body.verify_code
							console.log(this.code)
						}
					},
					(error) => {
						if (error.data.code === TWO_MANY_REQUESTS) {
							this.$message({
								showClose: true,
								message: '您点击太快啦，休息一下',
								type: 'error',
							})
						} else if (error.data.code === BAD_REQUEST) {
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
						this.formCode.email = ''
					}
				)
		},
		// 重置倒计时相关内容
		reset() {
			this.isCodeSend = false
			this.sendBtnText = '点击发送验证码'
			if (this.timer) {
				clearInterval(this.timer)
				this.counter = 60
				this.timer = null
			}
		},
		sendcode() {
			// 判断是否已输入邮箱
			if (!this.formCode.email) {
				// this.$notify('请输入邮箱')
				return false
			}
			this.isCodeSend = true
			// 调用接口，发送验证码
			this.send_code()
			// 开启倒计时，60s之后才能再次点击
			this.countDown()
		},
		Authication() {
			ajax
				.post(UserApis.userLoginUrl, {
					email: this.formLogin.username,
					password: this.formLogin.pwd,
				})
				.then(
					(res) => {
						if (res.data.code === CREATED) {
							window.localStorage.setItem('token', res.data.access)
							this.$store.commit('updateUserinfo', res.data)
							this.$router.push({ name: 'Home' })
						}
					},
					(error) => {
						if (error.data.code === NOT_FOUND) {
							this.$message({
								showClose: true,
								message: res.data.message,
								type: 'error',
							})
						} else if (error.data.code === BAD_REQUEST) {
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
						this.formLogin.username = ''
						this.formLogin.pwd = ''
					}
				)
		},
		Authication1() {
			ajax
				.post(UserApis.emailLoginUrl, {
					email: this.formCode.email,
					code: this.formCode.code,
				})
				.then(
					(res) => {
						if (res.data.code === CREATED) {
							window.localStorage.setItem('token', res.data.access)
							this.$store.commit('updateUserinfo', res.data)
							this.$router.push({ name: 'Home' })
						}
					},
					(error) => {
						if (res.data.code === BAD_REQUEST) {
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
						this.formLogin.username = ''
						this.formLogin.pwd = ''
					}
				)
		},
		submitForm(formLogin) {
			this.$refs[formLogin].validate((valid) => {
				if (valid) {
					this.Authication()
				} else {
					console.log('前端表单验证不通过')
					return false
				}
			})
		},
		submitForm1(formCode) {
			this.$refs[formCode].validate((valid) => {
				if (valid) {
					this.Authication1()
				} else {
					console.log('前端表单验证不通过')
					return false
				}
			})
		},
	},
}
</script>

<style lang="less">
.page-login {
	text-align: center;
	.login-form {
		margin-top: 40px;
		background-color: rgb(246, 248, 250);
		border-radius: 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 10px 30px;
	}
	.login-header {
		text-align: center;
		margin-bottom: 25px;
	}
	.login-header .title {
		color: dodgerblue;
		font-size: 25px;
	}
	.forget-pwd {
		text-align: right;
		.rlf-forget {
			text-decoration: none;
			color: #9199a1;
			font-size: 13.5px;
		}
		.rlf-forget-btn {
			color: #9199a1;
			padding: 0;
			font-size: 13.5px;
		}
		.rlf-forget:hover {
			color: #5e5e5e;
		}
		.rlf-forget-btn:hover {
			color: #5e5e5e;
		}
	}
	.tips {
		margin-top: 20px;
		font-size: 14px;
	}
	.btn-login {
		border-radius: 20px;
	}
	.el-form-item__content {
		margin-left: 0;
	}
	.login-footer {
		margin-top: 20px;
		color: gray;
		text-align: center;
	}
	.login-footer span {
		padding: 15px;
		font-size: 13px;
	}
}
</style>
