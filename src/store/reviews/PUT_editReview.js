import { getFormData, baseRequest } from '@/scripts';
import { editReview } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const reviewData = await baseRequest('reviews/edit/item', { method: 'PUT', data }).then(res => res.data)
		if (!reviewData.success) throw new Error(reviewData?.message);
		const body = getFormData(data);

		dispatch(editReview({ ...reviewData.data, lang: body?.lang }))
	} catch (error) {
		rejectWithValue(error.message)
	}
};