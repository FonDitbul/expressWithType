import config from './config';
import express from 'express';

// 서버 시작하기
async function startServer(){
	const app = express();

	const test: number[] = [];
	if(test !== []) {
		console.log('what is ?');
	}

	await require('./loaders').default({ expressApp: app});

	app.listen(config.port || 3000, () => {
		console.log(`
	################################################
      	🛡️  Server listening on port: ${config.port} 🛡️
      	################################################`)
	}).on('error', err => {
		console.log(err);
	})
}
// conflict
startServer();