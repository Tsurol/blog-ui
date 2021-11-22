<template>
	<div id="app">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<style lang="less">
#app {
}
</style>

<script>
export default {
	name: 'App',
	data() {
		return {
			isRouterAlive: true,
		}
	},
	provide() {
		return {
			reload: this.reload,
		}
	},
	methods: {
		reload() {
			this.isRouterAlive = false
			this.$nextTick(function() {
				this.isRouterAlive = true
			})
		},
	},
}
</script>
