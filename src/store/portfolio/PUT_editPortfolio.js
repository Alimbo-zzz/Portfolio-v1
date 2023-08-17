import { getFormData, baseRequest } from '@/scripts';
import { editPortfolioItem } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const portfolioData = await baseRequest('portfolio/edit/item', { method: 'PUT', data }).then(res => res.data).catch(err => console.log(err))
		if (!portfolioData.success) throw new Error(portfolioData?.message);
		const body = getFormData(data);

		dispatch(editPortfolioItem({ ...portfolioData.data, lang: body?.lang }))
	} catch (error) {
		rejectWithValue(error.message)
	}
};