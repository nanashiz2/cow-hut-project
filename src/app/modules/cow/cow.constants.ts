import {
	ICowBreed,
	ICowCategory,
	ICowLabel,
	ICowLocations,
} from './cow.interface';

export const cowLocations: ICowLocations[] = [
	'Barishal',
	'Chattogram',
	'Comilla',
	'Dhaka',
	'Mymensingh',
	'Rajshahi',
	'Rangpur',
	'Sylhet',
];

export const cowBreed: ICowBreed[] = [
	'Brahman',
	'Nellore',
	'Sahiwal',
	'Gir',
	'Indigenous',
	'Tharparkar',
	'Kankrej',
];

export const cowLabel: ICowLabel[] = ['for sale', 'sold out'];

export const cowCategory: ICowCategory[] = ['Beef', 'Dairy', 'Dual Purpose'];

export const cowSearchableFields = ['location', 'breed', 'category']

export const cowFilterableFields = [
	'searchTerm',
	'location',
	'minPrice',
	'maxPrice',
];
