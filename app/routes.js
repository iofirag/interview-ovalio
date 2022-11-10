async function validateUserToken(ctx, next) {
	try {
		let token = ctx.params.userToken || '';
		if (!lib.utils.validateToken(token)) {
			return ctx.body = { err: 'Invalid User Token' };
		}
		return next();
	} catch (e) {
		return ctx.body = { err: 'Invalid User Token' };
	}
}

module.exports = function (router){

	router.get('/getRandomNumber/:userToken', validateUserToken);

	router.get('/getRandomNumber/:userToken', async (ctx) => {
		ctx.set('Content-Type', 'application/json');

		try {
			let userToken = ctx.params.userToken;
			let valid = await lib.pacing.validatePacing(userToken);
			if (!valid) {
				return ctx.body = {
					message: 'You have reached your request limit. please wait before making another request'
				};
			}
		} catch (e) {
			return ctx.body = {
				err: 'Error occurred'
			};
		}

		ctx.body = {
			number: lib.utils.generateRandomNumber()
		};

	});
}
