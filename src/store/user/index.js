import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilePath } from '@/scripts';
import PUT_edit from './PUT_edit';

export const apiUserEdit = createAsyncThunk('user/apiUserEdit', PUT_edit)

const setError = (state, { payload }) => { state.status = 'rejected'; state.error = payload; }
const setPending = (state) => { state.status = 'loading'; state.error = null; }


const auth = createSlice({
	name: 'user',
	initialState: {
		data: {
			avatar: null,
			born: new Date().getTime(),
			en: {
				username: '',
				mainText: '',
				description: '',
				live: '',
			},
			ru: {
				username: '',
				mainText: '',
				description: '',
				live: '',
			}
		},
		status: null,
		error: null,
	},
	reducers: {
		setData(state, { payload }) {
			let avatar = getFilePath(payload?.avatar);
			state.data = { ...payload, avatar };
		}
	},
	extraReducers: {
		[apiUserEdit.rejected]: setError,
		[apiUserEdit.pending]: setPending,
	}
})

const { actions, reducer } = auth;


export const { setData } = actions;
export default reducer;