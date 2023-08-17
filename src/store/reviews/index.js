import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import POST_addReview from './POST_addReview';
import DELETE_Review from './DELETE_Review';
import PUT_editReview from './PUT_editReview';
import { getFilePath } from '@/scripts';

export const apiReviewsAdd = createAsyncThunk('reviews/apiReviewsAdd', POST_addReview)
export const apiReviewsDelete = createAsyncThunk('reviews/apiReviewsDelete', DELETE_Review)
export const apiReviewsEdit = createAsyncThunk('reviews/apiReviewsEdit', PUT_editReview)

const changeImagePath = el => ({ ...el, avatar: getFilePath(el?.avatar) });

const reviews = createSlice({
	name: 'reviews',
	initialState: {
		data: {
			en: [],
			ru: []
		},
		status: null,
		error: null,
	},
	reducers: {
		setReviews(state, { payload }) {
			let result = {};
			for (const key in payload) {
				result[key] = payload[key].map(changeImagePath)
			}
			state.data = result;
		},
		addReview(state, { payload }) {
			let lang = payload?.lang;
			if (!lang) return;
			let obj = {
				id: payload?.id,
				job: payload?.job,
				name: payload?.name,
				review: payload?.review,
				avatar: getFilePath(payload?.avatar)
			}

			state.data[lang].unshift(obj);
		},
		deleteReview(state, { payload }) {
			const { id, lang } = payload;
			if (!id || !lang) return;
			state.data[lang] = state.data[lang].filter(el => el?.id !== id)
		},
		editReview(state, { payload }) {
			let lang = payload?.lang;
			if (!lang || !payload?.id) return;
			let obj = {
				id: payload?.id,
				job: payload?.job,
				name: payload?.name,
				review: payload?.review,
				avatar: getFilePath(payload?.avatar)
			}

			const newArray = state.data[lang].map(el => {
				if (el.id === obj.id) return obj;
				else return el;
			});

			state.data[lang] = newArray;

		}
	},
	extraReducers: {

	}
})

const { actions, reducer } = reviews;


export const { addReview, setReviews, deleteReview, editReview } = actions;
export default reducer;