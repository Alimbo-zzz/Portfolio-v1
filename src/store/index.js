import { configureStore } from '@reduxjs/toolkit';

// slices
import * as auth from './auth';
import * as user from './user';
import * as skills from './skills';
import * as portfolio from './portfolio';
import * as reviews from './reviews';


const reducers = {
	auth: auth.default,
	user: user.default,
	skills: skills.default,
	portfolio: portfolio.default,
	reviews: reviews.default,
};

const actions = {
	...auth,
	...user,
	...skills,
	...portfolio,
	...reviews,
	default: ''
};





export default configureStore({
	reducer: { ...reducers }
})

export {
	reducers,
	actions
};