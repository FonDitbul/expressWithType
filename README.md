# expressWithType

express With TypeScript

견고한 Typescript Express 만들기 

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

## 설치 순서

1. npm 설치
```bash
npm i @types/express @types/node exress typescript nodemon ts-node
```
2. tsconfig.json 생성
``` bash
npx tsc --init
```
3. tsconfig.json
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
4. express 코드 작성
src/index.ts

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
5. packages.json 파일 수정
```
"scripts": {
"dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/index.ts",
"build": "tsc -p .",
"start": "node dist/index.js",
"test": "echo \"Error: no test specified\" && exit 1"
},
```
6. 실행 
```bash
npm run dev
```

견고한 Express 프로젝트 설계하기

https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0
