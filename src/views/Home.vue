<template>
	<div class="page-home">
		<!-- 顶部导航 -->
		<Navbar />
		<!-- 轮播图 -->
		<Banner />
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/home/navbar'
import Banner from '@/components/home/main'

export default {
	name: 'Home',
	components: {
		// 顶部导航
		Navbar,
		// 轮播图
		Banner,
	},
}
</script>

<style lang="less">
.page-home {
	background-color: rgb(245, 245, 245);
}
</style>