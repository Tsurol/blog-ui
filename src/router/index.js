import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/Login'
import Register from '../views/user/Register'
import Forgot from '../views/user/Forgot'
import Project from '../views/Project'
import Message from '../views/Message'
import BlogDetail from '../views/BlogDetail'
import Leetcode from '../views/Leetcode'
import Mine from '../views/user/mine'
import Contribution from '../views/Contribution'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/project',
		name: 'Project',
		component: Project,
	},
	{
		path: '/user/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/user/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/user/set/newpwd',
		name: 'Forgot',
		component: Forgot,
	},
	{
		path: '/user/mine',
		name: 'Mine',
		component: Mine,
	},
	{
		path: '/message',
		name: 'Message',
		component: Message,
	},
	{
		path: '/leetcode',
		name: 'Leetcode',
		component: Leetcode,
	},
	{
		path: '/blog/:id',
		name: 'BlogDetail',
		component: BlogDetail,
	},
	{
		path: '/Contribution',
		name: 'Contribution',
		component: Contribution,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
