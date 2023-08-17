import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilePath } from '@/scripts';
import POST_skillAddGroup from './POST_skillAddGroup';
import DELETE_skillDeleteGroup from './DELETE_skillGroup';
import PUT_skillEditGroup from './PUT_skillEditGroup';

import POST_skillAddItem from './POST_skillAddItem';
import DELETE_skillDeleteItem from './DELETE_skillItem';
import PUT_skillEditItem from './PUT_skillEditItem';

export const apiSkillsAddGroup = createAsyncThunk('skills/apiSkillsAddGroup', POST_skillAddGroup)
export const apiSkillsDeleteGroup = createAsyncThunk('skills/apiSkillsDeleteGroup', DELETE_skillDeleteGroup)
export const apiSkillsEditteGroup = createAsyncThunk('skills/apiSkillsEditGroup', PUT_skillEditGroup)

export const apiSkillsAddItem = createAsyncThunk('skills/apiSkillsAddItem', POST_skillAddItem)
export const apiSkillsDeleteItem = createAsyncThunk('skills/apiSkillsDeleteItem', DELETE_skillDeleteItem)
export const apiSkillsEditItem = createAsyncThunk('skills/apiSkillsEditItem', PUT_skillEditItem)


const changeImagePathArr = arr => arr.map(el => ({ ...el, icon: getFilePath(el?.icon) }));
const changeImagePath = icon => getFilePath(icon);


const skills = createSlice({
	name: 'skills',
	initialState: {
		data: {
			en: [],
			ru: []
		},
		status: null,
		error: null,
	},
	reducers: {
		setSkills(state, { payload }) {
			let result = {};
			for (const key in payload) {
				result[key] = payload[key].map(el => (
					{ ...el, skills: changeImagePathArr(el.skills) }
				))
			}
			state.data = result;
		},
		addSkillGroup(state, { payload }) {
			let lang = payload?.lang;
			if (!lang) return;
			let obj = {
				id: payload?.id,
				title: payload?.title,
				skills: payload?.skills || [],
			}

			state.data[lang].unshift(obj);
		},
		deleteSkillGroup(state, { payload }) {
			let id = payload?.id;
			let lang = payload?.lang;
			if (!lang || !id) return;
			const filtered = state.data[lang].filter(el => el.id !== payload.id);
			state.data[lang] = filtered;
		},
		editSkillGroup(state, { payload }) {
			let id = payload?.id;
			let lang = payload?.lang;
			let title = payload?.title;
			let skills = payload?.skills || [];
			if (!id || !lang || !title) return;
			let obj = {
				id, lang, title, skills
			}

			const newArr = state.data[lang].map(el => {
				if (el.id === id) return obj;
				else return el;
			});
			state.data[lang] = newArr;
		},
		addSkillItem(state, { payload }) {
			let lang = payload?.lang;
			let ref = payload?.ref;
			if (!lang || !ref) return;
			let obj = {
				id: payload?.id,
				name: payload?.name,
				icon: changeImagePath(payload?.icon)
			}

			const findItem = state.data[lang].find(el => el.id === ref);
			findItem.skills.push(obj);
		},
		deleteSkillItem(state, { payload }) {
			let lang = payload?.lang;
			let id = payload?.id;
			let ref = payload?.ref;
			if (!lang || !id || !ref) return;
			const findItem = state.data[lang].find(el => el.id === ref);
			let filtered = findItem.skills.filter(el => el.id !== id);
			findItem.skills = filtered;
		},
		editSkillItem(state, { payload }) {
			let lang = payload?.lang;
			let ref = payload?.ref;
			let id = payload?.id;
			if (!lang || !ref || !id) return;
			let findItem = state.data[lang].find(el => el.id === ref);
			let findSkill = findItem.skills.find(el => el.id === id);

			findSkill.icon = changeImagePath(payload?.icon);
			findSkill.name = payload?.name;
		}
	},
	extraReducers: {

	}
})

const { actions, reducer } = skills;


export const { setSkills, addSkillGroup, deleteSkillGroup, editSkillGroup, addSkillItem, deleteSkillItem, editSkillItem } = actions;
export default reducer;