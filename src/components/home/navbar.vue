<template>
	<div class="home-navbar-box">
		<el-row>
			<el-col :span="4" class="item">
				<el-avatar
					:src="logo1"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="{ name: 'Home' }" style="text-decoration:none;"><span>&nbsp;网站首页</span></router-link>
			</el-col>
			<el-col :span="4" class="item">
				<el-avatar :src="a" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<span>&nbsp;技术博客</span>
			</el-col>
			<el-col :span="4" class="item">
				<el-avatar :src="g" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<router-link :to="{ name: 'Project' }" style="text-decoration:none;"><span>&nbsp;个人项目</span></router-link>
			</el-col>
			<el-col :span="4" class="item">
				<el-avatar :src="l" size="small" style="background-color:rgb(255, 255, 255);"> </el-avatar>
				<span>&nbsp;留言版块</span>
			</el-col>
			<el-col :span="4" class="item">
				<el-avatar :src="z" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<span>&nbsp;关于作者</span>
			</el-col>
			<el-col :span="4" class="item">
				<el-avatar :src="p" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<el-dropdown>
					<span class="el-dropdown-link">
						&nbsp;个人中心
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown" show-timeout="timeout">
						<el-dropdown-item>注册</el-dropdown-item>
						<router-link :to="{ name: 'Login' }" style="text-decoration:none"
							><el-dropdown-item @click="centerDialogVisible = true"
								>登录</el-dropdown-item
							></router-link
						>
						<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
							<span>需要注意的是内容是默认不居中的</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="centerDialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
							</span>
						</el-dialog>
						<el-dropdown-item>个人资料</el-dropdown-item>
						<el-dropdown-item divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			centerDialogVisible: false,
			timeout: 150,
			p: '/static/p.png',
			a: '/static/apng.png',
			l: '/static/l.png',
			g: '/static/githubb.png',
			z: '/static/z.png',
			logo1: '/static/wbsite.jpg',
			activeName: 'second',
			invt: '',
		}
	},
	methods: {},
}
</script>

<style lang="less">
.home-navbar-box {
	font-family: "Consolas", "Microsoft JhengHei", "Apple LiGothic Medium,Microsoft YaHei", "微软雅黑", "Arial", sans-serif;
	// color: rgb(126, 122, 128);
	text-align: center;
	padding-bottom: 5px;
	background-color: #fff;
	font-size: 15px;
	.el-row {
		display: flex;
		.item {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.el-avatar--circle {
			border-radius: 0;
		}
	}
	.el-dropdown-link {
		cursor: pointer;
	}
	.el-dropdown {
		font-family: "Consolas", "Microsoft JhengHei", "Apple LiGothic Medium,Microsoft YaHei", "微软雅黑", "Arial", sans-serif;
		color: black;
	}
	.el-icon-arrow-down {
		font-size: 15px;
	}
	span {
		cursor: pointer;
	}
	span:hover {
		color: rgb(128, 179, 221);
	}
}
@media screen and (max-width: 768px) {
	.home-navbar-box {
		font-size: 15px;
		.el-row {
			flex-direction: column;
			align-items: center;
			.el-col-4 {
				justify-content: left;
				width: 110px;
				padding: 10px 0;
			}
		}
		.el-avatar--small {
			width: 40px;
		}
		.el-icon-arrow-down {
			display: none;
		}
		.el-dropdown {
			font-size: 15px;
			font-family: "Consolas", "Microsoft JhengHei", "Apple LiGothic Medium,Microsoft YaHei", "微软雅黑", "Arial", sans-serif;
			color: black;
		}
		.el-popper {
			margin-top: 5px;
		}
	}
}
</style>
