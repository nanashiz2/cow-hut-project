import { USER_ROLE } from '../../../enums/users';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
	if (user.role === USER_ROLE.BUYER) {
		user.budget = 70000;
	}
	const createdUser = await User.create(user);

	if (!createUser) {
		throw new ApiError(400, 'Failed to create user');
	}
	return createdUser;
};

export const AuthService = {
	createUser,
};
