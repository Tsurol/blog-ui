import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/user/Login'
import Register from '../views/user/Register'
import Forgot from '../views/user/Forgot'
import Project from '../views/Project'

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
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
