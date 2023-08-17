import { getFormData, baseRequest } from '@/scripts';
import { setData } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const userData = await baseRequest('user/edit', { method: 'PUT', data }).then(res => res.data)
		if (!userData.success) throw new Error(userData?.message);
		dispatch(setData(userData.data))
	} catch (error) {
		rejectWithValue(error.message)
	}
};