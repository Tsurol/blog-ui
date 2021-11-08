import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/Login'
import Register from '../views/user/Register'
import Forgot from '../views/user/Forgot'
import Project from '../views/Project'
import Blog from '../views/Blog'
import Message from '../views/Message'
import Leetcode from '../views/Leetcode'
import Mine from '../views/user/mine'

Vue.use(VueRouter)

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
		path: '/blog',
		name: 'Blog',
		component: Blog,
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
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
