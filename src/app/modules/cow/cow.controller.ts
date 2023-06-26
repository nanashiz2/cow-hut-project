import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CowService } from './cow.service';
import sendReponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import httpStatus from 'http-status';
import { cowFilterableFields } from './cow.constants';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';

const createCow: RequestHandler = catchAsync(async (req, res) => {
	const cow = req.body;
	const result = await CowService.createCow(cow);

	sendReponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Cow created!',
		data: result,
	});
});

const getAllCows = catchAsync(async (req, res) => {
	const filters = pick(req.query, cowFilterableFields);
	const paginationOptions = pick(req.query, paginationFields);

	const result = await CowService.getAllCows(filters, paginationOptions);

	sendReponse<ICow[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'All cows listed successfully!',
		meta: result.meta,
		data: result.data,
	});
});

const getSinglCow = catchAsync(async (req, res) => {
	const id = req.params.id;

	const result = await CowService.getSingleCow(id);

	sendReponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Cow found!',
		data: result,
	});
});

const updateCow = catchAsync(async (req, res) => {
	const id = req.params.id;
	const updateData = req.body;

	const result = await CowService.updateCow(id, updateData);

	sendReponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Cow updated!',
		data: result,
	});
});

const deleteCow = catchAsync(async (req, res) => {
	const id = req.params.id;

	const result = await CowService.deleteCow(id);

	sendReponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Cow deleted!',
		data: result,
	});
});

export const CowController = {
	createCow,
	getAllCows,
	getSinglCow,
	updateCow,
	deleteCow,
};
