import { Request, RequestHandler, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';

const createUser: RequestHandler = catchAsync(
	async (req: Request, res: Response) => {
		const user = req.body;
		const result = await AuthService.createUser(user);

		sendReponse<IUser>(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'User created!',
			data: result,
		});
	}
);

export const AuthController = {
	createUser,
};
