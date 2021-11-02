<template>
	<div class="home-navbar-box">
		<el-row>
			<el-col v-for="item in allel" :key="item.id" :span="4" class="item">
				<el-avatar
					:src="item.icon"
					size="small"
					style="background-color:rgb(255, 255, 255)"
				></el-avatar>
				<router-link :to="item.link" style="text-decoration:none;color:black;"
					><span>&nbsp;{{ item.title }}</span></router-link
				>
			</el-col>
			<el-col :span="4" class="item">
				<el-avatar :src="p" size="small" style="background-color:rgb(255, 255, 255)"> </el-avatar>
				<el-dropdown>
					<span class="el-dropdown-link">
						&nbsp;个人中心
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown" show-timeout="timeout">
						<router-link
							v-for="dropdown in dropdownList"
							:key="dropdown.id"
							:to="dropdown.link"
							style="text-decoration:none"
						>
							<el-dropdown-item>{{ dropdown.title }}</el-dropdown-item>
						</router-link>
						<router-link style="text-decoration:none" :to="{ name: 'Login' }">
							<el-dropdown-item divided>退出登录</el-dropdown-item>
						</router-link>
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
			allel: [
				{ id: 1, title: '网站首页', link: { name: 'Home' }, icon: '/static/wbsite.jpg' },
				{ id: 2, title: '技术博客', link: { name: 'Home' }, icon: '/static/apng.png' },
				{ id: 3, title: '个人项目', link: { name: 'Project' }, icon: '/static/githubb.png' },
				{ id: 4, title: '留言板块', link: { name: 'Home' }, icon: '/static/l.png' },
				{ id: 5, title: '每日壹题', link: { name: 'Home' }, icon: '/static/z.png' },
			],
			dropdownList: [
				{ id: 1, title: '注册', link: { name: 'Register' } },
				{ id: 2, title: '登录', link: { name: 'Login' } },
			],
			centerDialogVisible: false,
			timeout: 150,
			p: '/static/p.png',
			activeName: 'second',
			invt: '',
		}
	},
	methods: {},
}
</script>

<style lang="less">
.home-navbar-box {
	font-family: 'Consolas', 'Microsoft JhengHei', 'Apple LiGothic Medium,Microsoft YaHei', '微软雅黑',
		'Arial', sans-serif;
	padding: 5px 0;
	position: sticky;
	z-index: 999;
	top: 0;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	text-align: center;
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
		color: rgb(128, 179, 221);
	}
}
</style>
