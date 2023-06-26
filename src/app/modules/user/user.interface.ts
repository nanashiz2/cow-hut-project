import { Model, Types } from 'mongoose';
import { USER_ROLE } from "../../../enums/users";

export type IUser = {
	name: {
		firstName: string;
		lastName: string;
	};
	role: USER_ROLE;
	phoneNumber: number;
	password: string;
	address: string;
	budget: number;
	income: number;
	id: Types.ObjectId;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
