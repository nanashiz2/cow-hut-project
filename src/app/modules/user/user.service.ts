import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (): Promise<IUser[]> => {
	const result = await User.find({});
	if (result.length <= 0) {
		throw new ApiError(400, 'No users were found, maybe try adding some.');
	}
	return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
	const result = await User.findById(id);
	if (!result) {
		throw new ApiError(400, 'Failed find user');
	}

	return result;
};

const updateUser = async (
	id: string,
	payload: Partial<IUser>
): Promise<IUser | null> => {
	const userData = await User.findById(id);

	if (!userData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
	}

	const result = await User.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});

	return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
	const userData = await User.findById(id);

	if (!userData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
	}

	const result = await User.findByIdAndDelete(id);
	return result;
};

export const UserService = {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
};
