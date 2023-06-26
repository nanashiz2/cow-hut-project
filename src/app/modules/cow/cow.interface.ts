import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICowLocations =
	| 'Dhaka'
	| 'Chattogram'
	| 'Barishal'
	| 'Rajshahi'
	| 'Sylhet'
	| 'Comilla'
	| 'Rangpur'
	| 'Mymensingh';

export type ICowBreed =
	| 'Brahman'
	| 'Nellore'
	| 'Sahiwal'
	| 'Gir'
	| 'Indigenous'
	| 'Tharparkar'
	| 'Kankrej';

export type ICowLabel = 'for sale' | 'sold out';
export type ICowCategory = 'Dairy' | 'Beef' | 'Dual Purpose';

export type ICow = {
    id: Types.ObjectId;
	name: string;
	age: number;
	price: number;
	location: ICowLocations;
	breed: ICowBreed;
	weight: number;
	label: ICowLabel;
	category: ICowCategory;
	seller: Types.ObjectId | IUser;
};

export type ICowFilters = {
	searchTerm?: string;
	location?: string;
	minPrice?: number;
	maxPrice?: number;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
