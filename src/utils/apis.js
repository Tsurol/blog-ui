const apiHost = 'http://localhost:8080/api'
// const apiHost = '/api'

/**用户模块 */
const UserApis = {
	// 登录接口
	userLoginUrl: apiHost + '/auth/username/login/',
	// 验证码登录接口
	emailLoginUrl: apiHost + '/auth/code/login/',
	// 注册接口
	userRegisterUrl: apiHost + '/auth/email/register/',
	// 发送验证码接口
	sendCodeUrl: apiHost + '/auth/email/code/',
	// 用户个人信息接口
	userInfoUrl: apiHost + '/auth/user/info/',
};

/**博客模块 */
const BlogApis = {
	// 博客列表接口
	blogListUrl: apiHost + '/blog/blogsite/list/',
	// 标签列表接口
	tagListUrl: apiHost + '/blog/tag/list/',
	// 点赞博客接口
	loveBlogUrl: apiHost + '/blog/blogsite/love/',
	// 通过标签查询博客接口
	blogByTagUrl: apiHost + '/blog/tag/blog/list/',
	// 查询博客总评论数
	commentCountUrl: apiHost + '/blog/comment/count/',
}


export { UserApis, BlogApis };