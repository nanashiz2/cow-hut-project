import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { cowSearchableFields } from './cow.constants';
import { SortOrder } from 'mongoose';

const createCow = async (cow: ICow): Promise<ICow | null> => {
	const createdCow = await Cow.create(cow);

	if (!createCow) {
		throw new ApiError(400, 'Failed to create cow');
	}
	return createdCow;
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
	const result = await Cow.findById(id);
	if (!result) {
		throw new ApiError(400, 'Failed find cow');
	}

	return result;
};

const getAllCows = async (
	filters: ICowFilters,
	paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
	const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelper.calculatePagination(paginationOptions);

	const andConditions = [];

	if (searchTerm) {
		andConditions.push({
			$or: cowSearchableFields.map(field => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	if (minPrice || maxPrice) {
		const priceCondition: { $gte?: number; $lte?: number } = {};
		if (minPrice) {
		  priceCondition.$gte = minPrice;
		}
		if (maxPrice) {
		  priceCondition.$lte = maxPrice;
		}
		andConditions.push({ price: priceCondition });
	  }

	if (Object.keys(filtersData).length) {
		andConditions.push({
			$and: Object.entries(filtersData).map(([field, value]) => ({
				[field]: value,
			})),
		});
	}

	const sortConditions: { [key: string]: SortOrder } = {};

	if (sortBy && sortOrder) {
		sortConditions[sortBy] = sortOrder;
	}

	const whereConditions =
		andConditions.length > 0 ? { $and: andConditions } : {};

	const result = await Cow.find(whereConditions)
		.sort(sortConditions)
		.skip(skip)
		.limit(limit);

	const total = await Cow.countDocuments(whereConditions);

	if (result.length <= 0) {
		throw new ApiError(400, 'No cows were found, maybe try adding some.');
	}
	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

const updateCow = async (
	id: string,
	payload: Partial<ICow>
): Promise<ICow | null> => {
	const cowData = await Cow.findById(id);

	if (!cowData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
	}

	const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});

	return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
	const cowData = await Cow.findById(id);

	if (!cowData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Cow does not exists');
	}

	const result = await Cow.findByIdAndDelete(id);
	return result;
};

export const CowService = {
	createCow,
	getAllCows,
	getSingleCow,
	updateCow,
	deleteCow,
};
