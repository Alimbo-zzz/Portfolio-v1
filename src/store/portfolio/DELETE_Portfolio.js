import { baseRequest } from '@/scripts';
import { deletePortfolioItem } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const portfolioData = await baseRequest('portfolio/delete/item', { method: 'DELETE', params: data }).then(res => res.data)
		if (!portfolioData.success) throw new Error(portfolioData?.message);
		dispatch(deletePortfolioItem(data))
	} catch (error) {
		rejectWithValue(error.message)
	}
};