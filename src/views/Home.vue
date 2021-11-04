<template>
	<div class="page-home">
		<Navbar />
		<transition name="el-fade-in-linear">
			<Main v-show="show" />
		</transition>
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/home/navbar'
import Main from '@/components/home/main'

export default {
	name: 'Home',
	data: () => ({
		show: false,
	}),
	components: {
		Navbar,
		Main,
	},
	mounted() {
		this.show = true
	},
}
</script>

<style lang="less">
.page-home {
	background-color: rgb(245, 245, 245);
	background-image: url(/static/background.png);
	background-size: cover;
	background-position: center;
}
</style>
