const apiHost = 'http://localhost:8080/api'

/**用户模块 */
const UserApis = {
	// 登录接口
	userLoginUrl: apiHost + '/auth/email/login/',
	// 注册接口
	userRegisterUrl: apiHost + '/auth/email/register/',
	// 发送验证码接口
	sendCodeUrl: apiHost + '/auth/email/code/',
	// 用户个人信息接口
	userInfoUrl: apiHost + '/auth/user/info/',
};

export { UserApis };