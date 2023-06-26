import { ErrorRequestHandler } from 'express';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { IErrorMessage } from '../../interfaces/error';
import handleCastError from '../../errors/handleCastError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
	//console.log('GolbalErrorHandler ~', { error });

	let statusCode = 500;
	let message = 'Something went wrong';
	let errorMessages: IErrorMessage[] = [];

	if (error?.name === 'ValidationError') {
		const simplifiedError = handleValidationError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessage;
	} else if (error?.name === 'CastError') {
		const simplifiedError = handleCastError(error);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError?.errorMessages;
	} else if (error instanceof ApiError) {
		statusCode = error?.statusCode;
		message = error.message;
		errorMessages = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	} else if (error instanceof Error) {
		message = error?.message;
		errorMessages = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	}

	res.status(statusCode).json({
		success: false,
		message,
		errorMessages,
		stack: error?.stack,
	});
};

export default globalErrorHandler;
