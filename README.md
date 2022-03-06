# expressWithType

express With TypeScript

예시 템플릿
## 설치 순서

### 1. npm 설치
```bash
npm i @types/express @types/node exress typescript nodemon ts-node
```
### 2. tsconfig.json 생성
``` bash
npx tsc --init
```
### 3. tsconfig.json
```json
{
  "compilerOptions": {
  "target": "es6", // 어떤 버전으로 컴파일할지 작성
  "module": "commonjs", //어떤 모듈 방식으로 컴파일할지 설정
  "outDir": "./dist",  //컴파일 후 js 파일들이 생성되는 곳
  "rootDir": ".",  //루트 폴더
  "strict": true,  //strict 옵션 활성화
}
```
### 4. express 코드 작성
src/app.ts

import express, {Request, Response, NextFunction} from 'express';
```javascript
class App{
app: express.Application;
  constructor() {
  this.app = express();
  }
}
const app = new App().app;
app.get('/', (req:Request, res:Response)=>{
  res.send('Hello');
})
app.listen(3000, () => {
  console.log('listen express server!');
})
```
### 5. packages.json 파일 수정
```
"scripts": {
    "dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/app.ts",
    "build": "tsc -p .",
    "start": "node dist/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
### 6. 실행 
```bash
npm run dev
```

# 견고한 Typescript Express 만들기

## 프로젝트 구조
```
src
│   app.ts          # App entry point
└───controller(router) # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configuration related stuff
└───jobs            # Jobs definitions for agenda.ts
└───loaders         # Split the startup process into modules
└───models          # Database models
└───services        # All the business logic is here
└───subscribers     # Event handlers for async task
└───types           # Type declaration files (d.ts) for Typescript
```
## Setup
### app.ts
서버 실행 함수 작성
``` typescript
import config from './config';
import express from 'express';

// 서버 시작하기
async function startServer(){
	const app = express();

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

startServer();
```
### config
```typescript
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
	// This error should crash whole process
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
	port: process.env.PORT,
	// databaseURL: process.env.MONGODB_URI,
};
```
### loaders
Express, DB 등 loader 정의
```typescript
//loaders/index.ts
import expressLoader from './express';

// loader 정의 (ex: Express, DB)
export default async ({ expressApp }) =>{
	await expressLoader({ app: expressApp });
	console.log('✌️ Express loaded');
}
```
``` typescript
//loaders/express.ts
import express, {Request, Response, NextFunction} from 'express';
// import cors from 'cors';

import config from '../config';
import userRouter from '../router/user.router'

export default ({ app }: { app: express.Application }) => {
	// ##### Load API routes
	app.use('/user', userRouter);

	/// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		next(err);
	});
	/// error handlers
	app.use((err:any, req:Request, res: Response, next: NextFunction) => {
		if (err.name === 'UnauthorizedError') {
			return res
				.status(err.status)
				.send({ message: err.message })
				.end();
		}
		return next(err);
	});
	app.use((err:any, req:Request, res: Response, next: NextFunction) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
			},
		});
	});
};
```
### router
예시 router 정의, Req, Res 에 집중하는 Contorller(router) 부분 
```typescript
//router/user.router.ts
import express, {Request, Response, NextFunction} from 'express';
import {getAllUser, getUser} from '../service/user.service'

const router = express.Router();


router.get("/", (req: Request, res: Response, next: NextFunction)=>{
	res.send("All user");
})

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
	console.log(getUser(123))
	res.send('hi')
})


export default router;
```
### service
router 에서 비즈니스 로직을 담당하는 부분 
```typescript
// 비즈니스 로직
const getAllUser = (): any => {
	return 'hgi all user'
}
const getUser = ( id: number): any => {
	return id;
}
export {
	getAllUser,
	getUser
}
```
### models
모델 스키마, 관계 등 설정 


견고한 Express 프로젝트 설계하기

https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0
