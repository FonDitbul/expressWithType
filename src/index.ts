import express, {Request, Response, NextFunction} from 'express';
import userRouter from "./router/user";
class App{
	app: express.Application;
	constructor() {
		this.app = express();
	}
}

const app = new App().app;
app.use('/user', userRouter);

app.get('/', (req:Request, res:Response)=>{
	res.send('Hello');
})
app.listen(3000, () => {
	console.log('listen express server!');
})
