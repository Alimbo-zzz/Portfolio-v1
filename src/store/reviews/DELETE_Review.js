import { baseRequest } from '@/scripts';
import { deleteReview } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const reviewData = await baseRequest('reviews/delete/item', { method: 'DELETE', params: data }).then(res => res.data)
		if (!reviewData.success) throw new Error(reviewData?.message);
		dispatch(deleteReview(data))
	} catch (error) {
		rejectWithValue(error.message)
	}
};