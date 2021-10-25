<template>
	<div class="home-banner-box">
		<el-row :gutter="20" type="flex" justify="space-around" style="margin-left:0;margin-right:0">
			<el-col :md="4" class="left">
				<div class="serach">
					<el-input
						placeholder="输入你想搜索的内容"
						v-model="input"
						clearable
						size="medium"
					></el-input>
					<el-button icon="el-icon-search" size="medium"></el-button>
				</div>
				<div class="card">
					<el-card class="box-card" shadow="always">
						<div slot="header" class="clearfix hot-recommoned">
							<i class="el-icon-star-off" style="color:rgb(231,35,74)"></i>
							<span class="recent-hot">近期热门</span>
						</div>
						<div v-for="i in hot" :key="i" class="item">
							{{ i }}
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :md="11" class="main">
				<div class="content">
					<div class="notice">
						<el-card>
							<div class="not" style="font-weight: bold;border-bottom: 1px solid rgb(192,196,204);">
								公告栏
							</div>
							<div class="not-content" style="margin-top:10px;line-height:30px">
								欢迎来到我的个人网站~<br>目前系统还在开发中,希望大家积极反馈bug。
							</div>
							<span class="time">
								<div style="color: #999;font-size:12px;margin-top:5px">
									<i class="el-icon-timer"></i>2021-10-15
								</div>
							</span>
						</el-card>
					</div>
				</div>
			</el-col>
			<el-col :md="4" class="right">
				开发中
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {debounce} from 'lodash'
export default {
	data() {
		return {
			input: '',
			hot: ['文章标题1', '文章标题2', '文章标题3', '文章标题4', '文章标题5'],
		}
	},
	methods: {
		support(){
			this.$message({
				dangerouslyUseHTMLString: true,
				message: '&nbsp;感谢您的支持，么么哒!',
				showClose: true,
				iconClass: 'el-icon-message-solid',
				customClass: 'background',
			})
		},
		unsupport() {
			this.$message({
				dangerouslyUseHTMLString: true,
				message: '&nbsp;若不爱，请别伤害!',
				showClose: true,
				iconClass: 'el-icon-message-solid',
				customClass: 'background-warning',
			})
		},
		openvx() {
			this.$notify({
				dangerouslyUseHTMLString: true,
				message: '<strong>微信号：Tsurol</strong>',
				position: 'bottom-left',
				customClass: 'background',
			})
		},
	},
}
</script>

<style lang="less">
.home-banner-box {
	font-family: "Consolas", "Microsoft JhengHei", "Apple LiGothic Medium,Microsoft YaHei", "微软雅黑", "Arial", sans-serif;
	margin-top: 15px;
	.left {
		.item {
			margin-bottom: 5px;
		}
		.hot-recommoned {
			border-radius: 8px;
		}
	}
	.el-main {
		margin-top: 5px;
	}
	.main {
		.not {
			font-size: 16px;
			padding: 8px 0;
		}
	}
	.serach {
		display: flex;
		input {
			border-top-left-radius: 30px;
			border-bottom-left-radius: 30px;
		}
		button {
			float: right;
			padding: 0 17px;
			border-top-right-radius: 30px;
			border-bottom-right-radius: 30px;
		}
		.el-icon-search {
			color: #475669;
		}
	}
	.card {
		margin-top: 10px;
		.recent-hot {
			color: rgb(136, 136, 136);
		}
	}
}
</style>
