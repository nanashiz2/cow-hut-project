import httpStatus from 'http-status';
import catchAsync from "../../../shared/catchAsync";
import sendReponse from "../../../shared/sendResponse";
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
	const result = await UserService.getAllUsers();

	sendReponse<IUser[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'All users listed successfully!',
		data: result,
	});
});

const getSingleUser = catchAsync(async (req, res) => {
	const id = req.params.id;

	const result = await UserService.getSingleUser(id);

	sendReponse<IUser>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User found!',
		data: result,
	});
});

const updateUser = catchAsync(async (req, res) => {
	const id = req.params.id;
	const updateData = req.body;

	const result = await UserService.updateUser(id, updateData);

	sendReponse<IUser>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User updated!',
		data: result,
	});
});

const deleteUser = catchAsync(async (req, res) => {
	const id = req.params.id;

	const result = await UserService.deleteUser(id);

	sendReponse<IUser>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User deleted!',
		data: result,
	});
});

export const UserController = {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
};
