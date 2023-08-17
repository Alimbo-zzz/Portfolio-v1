import { baseRequest } from '@/scripts';
import { deleteSkillItem } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const skillData = await baseRequest('skills/delete/skill', { method: 'DELETE', params: data }).then(res => res.data)
		if (!skillData.success) throw new Error(skillData?.message);
		dispatch(deleteSkillItem(data))
	} catch (error) {
		rejectWithValue(error.message)
	}
};