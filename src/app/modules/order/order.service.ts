// import mongoose from 'mongoose';
// import { ICow } from '../cow/cow.interface';
// import { IUser } from '../user/user.interface';
// import { IOrder } from './order.interface';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';
// import { Order } from './order.model';
// import { Cow } from '../cow/cow.model';

// const createOrder = async (
// 	order: IOrder,
// 	cow: ICow,
// 	buyer: IUser
// ): Promise<IOrder | null> => {
// 	let newOrder = null;
// 	const session = await mongoose.startSession();
// 	try {
// 		session.startTransaction();

// 		await Cow.findByIdAndUpdate(
// 			cow.id,
// 			{ label: 'sold out' },
// 			{ session, new: true }
// 		);

// 		newOrder = await Order.create([order], {session});

// 		await session.commitTransaction();
// 		await session.endSession();
// 	} catch (err) {
// 		await session.abortTransaction();
// 		await session.endSession();
// 		throw new ApiError(httpStatus.BAD_REQUEST, 'Some error occured');
// 	}

// 	return newOrder;
// };

// export const OrderService = {
// 	createOrder,
// };
