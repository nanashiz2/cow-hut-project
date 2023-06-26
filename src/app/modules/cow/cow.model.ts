import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { cowBreed, cowCategory, cowLabel, cowLocations } from './cow.constants';

const cowSchema = new Schema<ICow>(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		location: {
			type: String,
			enum: cowLocations,
			required: true,
		},
		breed: {
			type: String,
			enum: cowBreed,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
		label: {
			type: String,
			enum: cowLabel,
			default: 'for sale',
		},
		category: {
			type: String,
			enum: cowCategory,
			required: true,
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		id: {
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

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
