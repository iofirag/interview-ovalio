const PORT = 3000;
const
	Router = require('koa-router'),
	router = Router(),
	Koa = require('koa');
const app = new Koa();

global.lib = {};
lib.utils = require('./app/lib/utils');
lib.pacing = require('./app/lib/pacing');

require('./app/routes')(router);
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, async function () {

	await lib.pacing.init();
	console.log('listening on', PORT);

	let exampleUsers = Array.from({length: 10}).map((u) => ({
		name: lib.utils.generateRandomName(),
		url: `http://localhost:${PORT}/getRandomNumber/${lib.utils.generateToken()}`
	}));

	console.table(exampleUsers);

});
