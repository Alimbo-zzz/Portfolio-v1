import { getFormData, baseRequest } from '@/scripts';
import { addPortfolioItem } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const portfolioData = await baseRequest('portfolio/add/item', { method: 'POST', data }).then(res => res.data).catch(err => console.log(err))
		if (!portfolioData.success) throw new Error(portfolioData?.message);
		const body = getFormData(data);
		let newReview = { ...portfolioData.data, lang: body?.lang };
		dispatch(addPortfolioItem(newReview))
	} catch (error) {
		rejectWithValue(error.message)
	}
};