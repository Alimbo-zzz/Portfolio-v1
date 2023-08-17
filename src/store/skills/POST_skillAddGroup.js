import { getFormData, baseRequest } from '@/scripts';
import { addSkillGroup } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const skillsData = await baseRequest('skills/add/group', { method: 'POST', data }).then(res => res.data)
		if (!skillsData.success) throw new Error(skillsData?.message);
		const body = getFormData(data);
		let newReview = { ...skillsData.data, lang: body?.lang };
		dispatch(addSkillGroup(newReview))
	} catch (error) {
		rejectWithValue(error.message)
	}
};