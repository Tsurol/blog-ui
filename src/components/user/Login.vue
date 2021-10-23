<template>
	<div class="page-login">
		<el-row>
			<el-col :span="8" :offset="8">
				<el-alert title="游客您好，欢迎登录！" type="success" center> </el-alert>
				<div class="login-form">
					<!-- 登陆头区域 -->
					<div class="login-header">
            <div class="logo">THIS IS MY LOGO</div>
						<h2 class="title" style="margin:0">用户登录</h2>
					</div>
					<!-- //登陆头区域 -->

					<!-- 登录表单 -->
					<el-form :label-position="labelPosition" label-width="70px" :model="formLabelAlign">
						<el-form-item label="邮箱" size="small">
							<el-input v-model="formLabelAlign.name"></el-input>
						</el-form-item>
						<el-form-item label="活动区域" size="small">
							<el-input v-model="formLabelAlign.region"></el-input>
						</el-form-item>
						<el-form-item label="密码" size="small">
							<el-input v-model="formLabelAlign.type"></el-input>
						</el-form-item>
					</el-form>
					<!-- //登录表单 -->

					<!-- 页脚:相关信息 -->
					<div class="login-footer">
						<span href="#">关于我们</span>
						<span href="#">联系我们</span>
						<span href="#">注册机构</span>
						<span href="#">专栏</span><br />
						<span href="#">京ICP 备10002670012号</span>
					</div>
					<!-- //页脚:相关信息 -->
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			labelPosition: 'left',
			formLabelAlign: {
				name: '',
				region: '',
				type: '',
			},
		}
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
		padding: 20px 80px;
	}
	.login-header {
		text-align: center;
		margin-bottom: 25px;
	}
	.login-header .title {
		color: dodgerblue;
		font-size: 30px;
	}
	.login-footer {
		margin-top: 20px;
		color: gray;
		text-align: center;
	}
	.login-footer span {
		padding: 15px;
	}
}
</style>
