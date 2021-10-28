<template>
	<div class="page-home">
		<!-- 顶部导航 -->
		<Navbar />
		<!-- 轮播图 -->
		<Main />
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/home/navbar'
import Main from '@/components/home/main'

export default {
	name: 'Home',
	components: {
		// 顶部导航
		Navbar,
		Main,
		// Banner:()=>import("@/components/home/main")
	},
}
</script>

<style lang="less">
.page-home {
	background-color: rgb(245, 245, 245);
}
</style>