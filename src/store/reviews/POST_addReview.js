import { getFormData, baseRequest } from '@/scripts';
import { addReview } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const reviewData = await baseRequest('reviews/add/item', { method: 'POST', data }).then(res => res.data)
		if (!reviewData.success) throw new Error(reviewData?.message);
		const body = getFormData(data);
		let newReview = { ...reviewData.data, lang: body?.lang };
		dispatch(addReview(newReview))
	} catch (error) {
		rejectWithValue(error.message)
	}
};