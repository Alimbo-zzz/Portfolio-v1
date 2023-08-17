import { baseRequest } from '@/scripts';
import { deleteSkillGroup } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const skillData = await baseRequest('skills/delete/group', { method: 'DELETE', params: data }).then(res => res.data)
		if (!skillData.success) throw new Error(skillData?.message);
		dispatch(deleteSkillGroup(data))
	} catch (error) {
		rejectWithValue(error.message)
	}
};