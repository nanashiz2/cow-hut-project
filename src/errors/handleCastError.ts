import mongoose from 'mongoose';
import { IErrorMessage } from '../interfaces/error';
import httpStatus from 'http-status';

const handleCastError = (error: mongoose.Error.CastError) => {
	const errors: IErrorMessage[] = [
		{
			path: error.path,
			message: 'Invalid ID',
		},
	];

	const statusCode = httpStatus.BAD_REQUEST;

	return {
		statusCode,
		message: 'Cast Error',
		errorMessages: errors,
	};
};

export default handleCastError;
