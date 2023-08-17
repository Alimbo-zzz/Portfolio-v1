import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const env = import.meta.env;

const passKeyLS = 'ALIMBO_portfolio-pass';
const userKeyLS = 'ALIMBO_portfolio-user';

const setAdminToLS = ({ password, login }) => {
	window.localStorage.setItem(passKeyLS, password);
	window.localStorage.setItem(userKeyLS, login);
}
const deleteAdminToLS = () => {
	window.localStorage.removeItem(passKeyLS);
	window.localStorage.removeItem(userKeyLS);
}

const checkLogin = ({ password = '', login = '' }) => {
	const { VITE_AUTH_PASS, VITE_AUTH_USER } = env;
	if (
		VITE_AUTH_USER === login.toLowerCase()
		&& VITE_AUTH_PASS === password.toLowerCase()
	) {
		setAdminToLS({ password, login });
		return true;
	} else {
		deleteAdminToLS();
		return false;
	}
}


const auth = createSlice({
	name: 'auth',
	initialState: {
		authorized: false,
		status: null,
		error: null,
	},
	reducers: {
		logIn(state, action) {
			const { password = '', login = '' } = action.payload;
			state.status = 'load';

			if (checkLogin({ login, password })) {
				state.status = 'resolved',
					state.authorized = true;
				state.error = null;
			}
			else {
				state.status = 'rejected',
					state.authorized = false;
				state.error = { message: 'Неверный логин или пароль' }
			}
		},
		logOut(state, action) {
			state.authorized = false;
			state.status = null;
			state.error = null;
			deleteAdminToLS();
		},
		autoLogin(state, action) {
			const passLS = window.localStorage.getItem(passKeyLS);
			const userLS = window.localStorage.getItem(userKeyLS);

			if (
				passLS && userLS &&
				checkLogin({ login: userLS, password: passLS })
			) {
				state.status = 'resolved',
					state.authorized = true;
				state.error = null;
			}
		}
	}
})

const { actions, reducer } = auth;


export const { logOut, logIn, autoLogin } = actions;
export default reducer;