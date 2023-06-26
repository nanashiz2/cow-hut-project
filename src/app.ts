import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import routes from './app/routes'

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', routes)
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(httpStatus.NOT_FOUND).json({
		success: false,
		message: 'Not found',
		errorMessages: [
			{
				path: req.originalUrl,
				message: 'API not found',
			},
		],
	});
	next()
});

export default app;
