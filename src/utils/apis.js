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
	// 忘记密码接口
	resetPwdUrl: apiHost + '/auth/email/reset/'
}

/**博客模块 */
const BlogApis = {
	// 博客列表接口
	blogListUrl: apiHost + '/blog/blogsite/list/',
	// 标签列表接口
	tagListUrl: apiHost + '/blog/tag/list/',
	// 点赞博客(评论)接口
	loveBlogUrl: apiHost + '/blog/blogsite/love/',
	// 通过标签查询博客接口
	blogByTagUrl: apiHost + '/blog/tag/blog/list/',
	// 查询博客总评论数
	commentCountUrl: apiHost + '/blog/comment/count/',
	// 博客详情
	blogDetailUrl: apiHost + '/blog/blogsite/detail/',
	// 查询（发送）博客的评论(回复)
	blogCommentUrl: apiHost + '/blog/blogsite/comment/',
	// 查询博客的作者信息
	blogAuthorUrl: apiHost + '/blog/author/info/',
	// 随机推送
	blogRandomUrl: apiHost + '/blog/random/blog/',
	// 用户反馈
	UserAdviceUrl: apiHost + '/blog/advice/',
	// 创建博客
	CreateBlogUrl: apiHost + '/blog/create/blog/'
}

export { UserApis, BlogApis }
