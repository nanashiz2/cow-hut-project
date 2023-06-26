import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { USER_ROLE } from '../../../enums/users';

const userSchema = new Schema<IUser>(
	{
		name: {
			firstName: {
				type: String,
				required: true,
			},
			lastName: {
				type: String,
				required: true,
			},
		},
		role: {
			type: String,
			required: true,
			enum: USER_ROLE,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		budget: {
			type: Number,
			required: true,
		},
		income: {
			type: Number,
			required: true,
		},
		id:{
			type: Schema.Types.ObjectId
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

export const User = model<IUser, UserModel>('User', userSchema);
