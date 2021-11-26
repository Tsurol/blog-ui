<template>
	<div class="page-fotgot">
		<el-row type="flex" justify="space-around">
			<el-col :md="12" :xs="23" :sm="14" :lg="8" :xl="8">
				<el-alert title="游客您好！" type="success" center></el-alert>
				<div class="forgotForm">
					<!-- 登陆头区域 -->
					<div class="reset-header">
						<i class="el-icon-arrow-left back" @click="goback">返回</i>
						<h2 class="title" style="margin:0;padding:5px 0 15px 0">找回密码</h2>
					</div>
					<!-- //登陆头区域 -->
					<!-- 登录表单 -->
					<el-form
						:label-position="labelPosition"
						label-width="79px"
						:model="formReset"
						ref="formReset"
						:rules="formResetRules"
					>
						<el-form-item label="邮箱" size="small" prop="email">
							<el-input v-model="formReset.email" placeholder="请输入邮箱" clearable class="input">
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
							<el-input v-model="formReset.code" placeholder="请输入验证码" clearable class="input">
							</el-input>
						</el-form-item>
						<el-form-item label="新密码" size="small" prop="code">
							<el-input
								v-model="formReset.pwd"
								placeholder="请输入新密码"
								clearable
								show-password
								class="input"
							>
							</el-input>
						</el-form-item>
						<el-form-item label="确认密码" size="small" prop="code">
							<el-input
								v-model="formReset.repeat"
								placeholder="请确认您的新密码"
								clearable
								show-password
								class="input"
							>
							</el-input>
						</el-form-item>
						<el-button type="primary" @click="submitForm('formReset')" class="btn-reset"
							>立即找回</el-button
						>
					</el-form>
					<!-- //登录表单 -->
					<!-- 页脚:相关信息 -->
					<div class="reset-footer">
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
import { Message } from 'element-ui'

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
		var validateRepeat = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请确认您的新密码'))
			} else if (value !== this.formReset.pwd) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			isCodeSend: false,
			sendBtnText: '发送验证码',
			counter: 60,
			timer: null,
			labelPosition: 'left',
			formReset: {
				email: '',
				code: '',
				pwd: '',
				repeat: '',
			},
			formResetRules: {
				email: [
					{ validator: checkEmail, trigger: 'blur' },
					{ required: true, message: '邮箱不能为空', trigger: 'blur' },
				],
				code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
				pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
				repeat: [
					{ validator: validateRepeat, trigger: 'blur' },
					{ required: true, message: '请确认您的新密码', trigger: 'blur' },
				],
			},
		}
	},
	methods: {
		goback() {
			this.$router.go(-1)
		},
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
					email: this.formReset.email,
				})
				.then(
					(res) => {
						if (res.data.code === CREATED) {
							this.$message.success('请查收验证码')
							this.code = res.data.body.verify_code
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
						this.formReset.email = ''
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
			if (!this.formReset.email) {
				return false
			}
			this.isCodeSend = true
			// 调用接口，发送验证码
			this.send_code()
			// 开启倒计时，60s之后才能再次点击
			this.countDown()
		},
		ResetPwd() {
			ajax
				.post(UserApis.resetPwdUrl, {
					email: this.formReset.email,
					verify_code: this.formReset.code,
					password: this.formReset.pwd,
					repeat: this.formReset.repeat,
				})
				.then(
					(res) => {
						if (res.data.code === CREATED) {
							Message({
								message: '密码已重置，请登录',
								type: 'success',
								duration: 5000,
								showClose: true,
							})
							this.$router.push({ name: 'Login' })
						}
					},
					(error) => {
						if (error.response.status === 404) {
							Message({
								message: error.response.data.message,
								type: 'error',
								duration: 5000,
								showClose: true,
							})
						}
						this.formReset.email = ''
						this.formReset.code = ''
						this.formReset.pwd = ''
						this.formReset.repeat = ''
					}
				)
		},
		submitForm(formReset) {
			this.$refs[formReset].validate((valid) => {
				if (valid) {
					this.ResetPwd()
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
.page-fotgot {
	text-align: center;
	.el-col {
		overflow-y: hidden;
	}
	.forgotForm {
		margin-top: 40px;
		background-color: rgb(246, 248, 250);
		border-radius: 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 10px 30px;
	}
	.reset-header {
		text-align: center;
		margin-bottom: 25px;
		position: relative;
		.back {
			position: absolute;
			left: 0;
			top: 15px;
			cursor: pointer;
			font-size: 16px;
			color: rgb(64, 158, 255);
		}
		.back:hover {
			color: rgb(6, 116, 226);
		}
	}
	.reset-header .title {
		color: dodgerblue;
		font-size: 25px;
	}
	.btn-reset {
		border-radius: 20px;
	}
	.reset-footer {
		margin-top: 20px;
		color: rgb(150, 143, 143);
		text-align: center;
	}
	.reset-footer span {
		padding: 15px;
		font-size: 12px;
	}
}
</style>
