import { IErrorMessage } from './error';

export type IGenericResponse<T> = {
	meta: {
		page: number;
		limit: number;
		total: number;
	};
	data: T;
};

export type IErrorResponse = {
	statusCode: number;
	message: string;
	errorMessage: IErrorMessage[];
};
