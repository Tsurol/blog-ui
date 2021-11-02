<template>
	<div class="page-home">
		<Navbar />
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
		Navbar,
		Main,
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
