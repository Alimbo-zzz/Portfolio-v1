import { getFormData, baseRequest } from '@/scripts';
import { addSkillItem } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const skillsData = await baseRequest('skills/add/skill', { method: 'POST', data }).then(res => res.data)
		if (!skillsData.success) throw new Error(skillsData?.message);
		const body = getFormData(data);
		let newReview = { ...skillsData.data, lang: body?.lang, ref: body?.ref };
		dispatch(addSkillItem(newReview))
	} catch (error) {
		rejectWithValue(error.message)
	}
};