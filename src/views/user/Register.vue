<template>
	<div class="page-register">
		<el-row>
			<el-col :span="8" :offset="8">
				<el-alert title="游客您好，欢迎注册！" type="success" center></el-alert>
				<div class="login-form">
					<!-- 登陆头区域 -->
					<div class="login-header">
						<h2 class="title" style="margin:0">用户注册</h2>
					</div>
					<!-- //登陆头区域 -->
					<!-- 登录表单 -->
					<el-form
						:label-position="labelPosition"
						label-width="66px"
						:model="formRegister"
						:rules="rulesRegister"
						ref="formRegister"
					>
						<el-form-item label="用户名" size="small" prop="username">
							<el-input
								v-model="formRegister.username"
								placeholder="请输入用户名（3~10位英文）"
								clearable
								class="input"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item label="邮箱" size="small" prop="email">
							<el-input
								v-model="formRegister.email"
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
								v-model="formRegister.code"
								placeholder="请输入验证码"
								clearable
								class="input"
							>
							</el-input>
						</el-form-item>
						<el-form-item label="密码" size="small" prop="pwd">
							<el-input
								v-model="formRegister.pwd"
								placeholder="请输入密码"
								clearable
								show-password
								class="input"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-button type="primary" @click="submitForm('formRegister')" class="btn-login"
							>立即注册</el-button
						>
					</el-form>
					<!-- //登录表单 -->

					<!-- 文字提示 -->
					<div class="tips">
						登录表示同意
						<a href="#" style="text-decoration:none; color:dodgerblue">用户使用协议</a>及<a
							>隐私条款</a
						>
						<div style="margin-top:5px">
							已有账号？
							<router-link :to="{ name: 'Login' }" style="text-decoration:none; color:dodgerblue"
								>点击登录></router-link
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
import { CREATED, TWO_MANY_REQUESTS } from '@/utils/constants'

export default {
	data() {
		var checkEmail = (rule, value, callback) => {
			const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
			if (!value) {
				return callback(new Error('邮箱不能为空'))
			}
			setTimeout(() => {
				if (mailReg.test(value)) {
					callback()
				} else {
					callback(new Error('请输入正确的邮箱格式'))
				}
			}, 100)
		}
		var checkUname = (rule, value, callback) => {
			const mailReg = /^[a-zA-Z]{3,10}$/
			if (!value) {
				return callback(new Error('用户名不能为空'))
			}
			setTimeout(() => {
				if (mailReg.test(value)) {
					callback()
				} else {
					callback(new Error('请输入正确的用户名格式(3~10位英文)'))
				}
			}, 100)
		}
		return {
			isCodeSend: false,
			sendBtnText: '发送验证码',
			counter: 60,
			timer: null,
			labelPosition: 'left',
			formRegister: {
				username: '',
				email: '',
				code: '',
				pwd: '',
			},
			rulesRegister: {
				username: [
					{ validator: checkUname, trigger: 'blur' },
					{ required: true, message: '用户名不能为空', trigger: 'blur' },
					{ min: 3, max: 10, message: '用户名长度在3~10个字符', trigger: 'blur' },
				],
				email: [
					{ validator: checkEmail, trigger: 'blur' },
					{ required: true, message: '用户名不能为空', trigger: 'blur' },
				],
				code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
				pwd: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{ min: 4, max: 17, message: '密码长度在4~17个字符', trigger: 'blur' },
				],
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
					email: this.formRegister.email,
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
						}
						this.formRegister.email = ''
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
			if (!this.formRegister.email) {
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
				.post(UserApis.userRegisterUrl, {
					username: this.formRegister.username,
					email: this.formRegister.email,
					verify_code: this.formRegister.code,
					password: this.formRegister.pwd,
				})
				.then(
					(res) => {
						if (res.data.code === CREATED) {
							console.log(res.data.body.access)
							window.localStorage.setItem('access', 'Bearer ' + res.data.body.access)
							this.$message.success('注册成功，已为您自动登录')
							// this.$store.commit('updateUserinfo', res.data)
							this.$router.push({ name: 'Home' })
						}
					},
					(error) => {
						this.formRegister.username = ''
						this.formRegister.email = ''
						this.formRegister.code = ''
						this.formRegister.pwd = ''
					}
				)
		},
		submitForm(formRegister) {
			this.$refs[formRegister].validate((valid) => {
				if (valid) {
					this.Authication()
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
.page-register {
	text-align: center;
	.el-col {
		overflow-y: hidden;
	}
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
		color: rgb(150, 143, 143);
		text-align: center;
	}
	.login-footer span {
		padding: 15px;
		font-size: 12px;
	}
}
</style>
