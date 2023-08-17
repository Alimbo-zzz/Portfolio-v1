import { getFormData, baseRequest } from '@/scripts';
import { editSkillGroup } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const body = getFormData(data);
		console.log(body)
		const skillData = await baseRequest('skills/edit/group', { method: 'PUT', data }).then(res => res.data)
		if (!skillData.success) throw new Error(skillData?.message);

		dispatch(editSkillGroup({ ...skillData.data, lang: body?.lang }))
	} catch (error) {
		rejectWithValue(error.message)
	}
};