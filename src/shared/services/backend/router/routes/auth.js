import authController from '../../controllers/authController';

export default [
	{
		url: '/auth/login',
		method: 'POST',
		handler: authController.login,
	},
	{
		url: '/auth/register',
		method: 'POST',
		handler: authController.register,
	}
]