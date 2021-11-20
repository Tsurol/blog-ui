<template>
	<div class="contribution">
		<div style="width: 100%;height: 100%;">
			<el-backtop :bottom="60"></el-backtop>
		</div>
		<div class="top">
			<i class="el-icon-arrow-left back" @click="goback">返回</i>
			<div class="input-box">
				<input maxlength="30" placeholder="请输入文章标题" class="text-input" v-model="title" />
			</div>
			<button class="btn btn-publish" @click="postBlog">发布文章</button>
		</div>
		<el-row type="flex" justify="center">
			<el-col :span="18">
				<el-form ref="form" :model="form" label-width="80px" class="form-blog">
					<el-form-item label="封面图片">
						<input type="file" @change="getImageFile" id="img" />
					</el-form-item>
					<el-form-item label="博客简述">
						<el-input v-model="form.desc" placeholder="简述" class="desc-blog"></el-input>
					</el-form-item>
					<el-form-item label="分类专栏">
						<el-select v-model="form.type" placeholder="请选择分类专栏">
							<el-option label="技术博客" value="1"></el-option>
							<el-option label="学习笔记" value="2"></el-option>
							<el-option label="项目总结" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否原创">
						<el-switch v-model="form.isOrigin"></el-switch>
					</el-form-item>
					<el-form-item label="博客标签">
						<el-checkbox-group v-model="form.tag">
							<el-checkbox v-for="item in tagList" :key="item.id" :label="item.name"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-row type="flex" justify="center">
			<el-col :span="18">
				<mavon-editor
					v-model="content"
					id="markdown"
					:previewBackground="prop.previewBackground"
					:fontSize="prop.fontSize"
					:boxShadow="prop.boxShadow"
					:placeholder="prop.placeholder"
				/>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { ajax } from '@/utils/ajax'
import { BlogApis } from '@/utils/apis'
import { Message } from 'element-ui'
import { OK, CREATED } from '@/utils/constants'

export default {
	data() {
		return {
			fileList: [],
			action: 'http://127.0.0.1:8000/api/blog/upload/',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('access'),
			},
			form: {
				type: '',
				tag: [],
				desc: '',
				isOrigin: false,
				img: '',
			},
			content: '',
			title: '',
			tagList: [],
			drag: false,
		}
	},
	computed: {
		prop() {
			let data = {
				boxShadow: true, //边框
				previewBackground: '#fff',
				fontSize: '16px',
				placeholder: '开始编写博客正文吧...',
			}
			return data
		},
	},
	methods: {
		getImageFile: function(e) {
			let file = e.target.files[0]
			this.form.img = file
		},
		onBeforeUpload(file) {
			// 上传文件之前，进行文件大小、类型的判断
			console.log(file)
		},
		onUploadSuccess(res, file) {
			// 上传文件成功之后
			console.log(res)
			console.log(file)
		},
		handleOutCount(files, fileList) {
			Message({
				message: '封面仅一张即可哟',
				type: 'error',
				duration: 5000,
				showClose: true,
			})
		},
		goback() {
			this.$router.go(-1)
		},
		postBlog() {
			console.log(this.form.isOrigin)
			let formData = new FormData()
			formData.append('desc', this.form.desc)
			formData.append('category', this.form.type)
			formData.append('origin', this.form.isOrigin)
			formData.append('tags', this.form.tag)
			formData.append('content', this.content)
			formData.append('file', this.form.img)
			formData.append('title', this.title)
			ajax
				.post(BlogApis.CreateBlogUrl, formData)
				.then((res) => {
					if (res.data.code === CREATED) {
						this.$message({
							showClose: true,
							message: '发布成功，请耐心等待作者审核',
							type: 'success',
						})
						this.$router.push({ name: 'Home' })
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		getTagList() {
			ajax.get(BlogApis.tagListUrl).then((res) => {
				if (res.data.code === OK) {
					this.tagList = res.data.body.data
				}
			})
		},
	},
	created() {
		this.getTagList()
	},
}
</script>

<style lang="less">
.contribution {
	width: 100%;
	background-color: #f5f5f5;
	.top {
		// border-bottom: 1px solid silver;
		display: flex;
		align-items: center;
		// justify-content: center;
		// position: relative;
		.back {
			margin-left: 20px;
			flex: 1;
			cursor: pointer;
			// position: absolute;
			// left: 10px;
			font-size: 17px;
			color: rgb(104, 99, 99);
		}
		.back:hover {
			color: rgb(17, 17, 17);
		}
	}
	.form-blog {
		// border: 1px solid rgb(161, 161, 161);
		background-color: #fff;
		padding: 20px 10px;
		.upload {
			margin-left: 12px;
			margin-bottom: 22px;
		}
		.desc-blog {
		}
	}
	#markdown {
		height: 100%;
	}
	.input-box {
		flex: 12;
		display: flex;
		width: 80%;
		border: 1px solid #ccc;
		border-radius: 21px;
		background-color: #fff;
		margin: 8px 16px 8px 8px;
		.text-input:focus {
			outline: none;
		}
		.text-input {
			width: 80%;
			margin-left: 4px;
			border-radius: 18px;
			padding: 8px;
			padding-right: 88px;
			font-size: 18px;
			line-height: 24px;
			background-color: #fff;
			border: 0;
		}
	}
	.btn {
		margin-right: 25px;
		flex: 1;
		cursor: pointer;
		padding: 10px 14px;
		font-size: 16px;
		color: #fff;
		border: none;
		border-radius: 18px;
		white-space: nowrap;
		background: #fc5531;
	}
	.btn:hover {
		background-color: #d62d07;
	}
}
</style>
