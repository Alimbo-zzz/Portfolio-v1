import { getFormData, baseRequest } from '@/scripts';
import { editSkillItem } from './index.js';

export default async (data, { rejectWithValue, dispatch }) => {

	try {
		const body = getFormData(data);
		const skillData = await baseRequest('skills/edit/skill', { method: 'PUT', data }).then(res => res.data)
		if (!skillData.success) throw new Error(skillData?.message);

		dispatch(editSkillItem({ ...skillData.data, lang: body?.lang, ref: body?.ref }))
	} catch (error) {
		rejectWithValue(error.message)
	}
};