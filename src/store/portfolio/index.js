import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilePath } from '@/scripts';
import POST_addPortfolio from './POST_addPortfolio';
import DELETE_Portfolio from './DELETE_Portfolio';
import PUT_editPortfolio from './PUT_editPortfolio';


export const apiPortfolioAddItem = createAsyncThunk('portfolio/apiPortfolioAddItem', POST_addPortfolio);
export const apiPortfolioDeleteItem = createAsyncThunk('portfolio/apiPortfolioDeleteItem', DELETE_Portfolio);
export const apiPortfolioEditItem = createAsyncThunk('portfolio/apiPortfolioEditItem', PUT_editPortfolio);



const changeImagePath = el => ({ ...el, image: getFilePath(el?.image) });

const portfolio = createSlice({
	name: 'portfolio',
	initialState: {
		data: {
			en: [
			],
			ru: [
			]
		},
		status: null,
		error: null,
	},
	reducers: {
		setPortfolio(state, { payload }) {
			let result = {};
			for (const key in payload) {
				result[key] = payload[key].map(changeImagePath)
			}
			state.data = result;
		},
		addPortfolioItem(state, { payload }) {
			let lang = payload?.lang;
			if (!lang) return;
			let obj = {
				id: payload?.id,
				tags: payload?.tags,
				links: payload?.links,
				name: payload?.name,
				description: payload?.description,
				image: getFilePath(payload?.image)
			}

			state.data[lang].unshift(obj);
		},
		deletePortfolioItem(state, { payload }) {
			const { id, lang } = payload;
			if (!id || !lang) return;
			state.data[lang] = state.data[lang].filter(el => el?.id !== id)
		},
		editPortfolioItem(state, { payload }) {
			let lang = payload?.lang;
			if (!lang || !payload?.id) return;
			let obj = {
				id: payload?.id,
				tags: payload?.tags,
				links: payload?.links,
				name: payload?.name,
				description: payload?.description,
				image: getFilePath(payload?.image)
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

const { actions, reducer } = portfolio;


export const { setPortfolio, addPortfolioItem, deletePortfolioItem, editPortfolioItem } = actions;
export default reducer;