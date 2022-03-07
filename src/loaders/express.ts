import express, {Request, Response, NextFunction} from 'express';
// import cors from 'cors';

import config from '../config';
import userRouter from '../router/user.router'

export default ({ app }: { app: express.Application }) => {
	app.get('/status', (req: Request, res: Response) => {
		res.status(200).end();
	});
	app.head('/status', (req: Request, res: Response) => {
		res.status(200).end();
	});
	app.enable('trust proxy');
	// app.use(cors());
	app.use(express.json());

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