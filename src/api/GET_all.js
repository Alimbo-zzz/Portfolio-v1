import { baseRequest } from '@/scripts';
import * as store from '@/store';
const state = store.default.getState;
const dispatch = store.default.dispatch;
const { setData, setReviews, setPortfolio, setSkills } = store.actions;



export default async (data) => {


	try {
		let result = {};
		const userAPI = await baseRequest('user/data').then(res => res.data);
		const portfolioAPI = await baseRequest('portfolio/data').then(res => res.data);
		const reviewsAPI = await baseRequest('reviews/data').then(res => res.data);
		const skillsAPI = await baseRequest('skills/data').then(res => res.data);

		if (userAPI?.success) {
			(result.user = userAPI.data);
			dispatch(setData(result.user));
		}
		if (portfolioAPI?.success) {
			(result.portfolio = portfolioAPI.data);
			dispatch(setPortfolio(result.portfolio));
		}
		if (reviewsAPI?.success) {
			(result.reviews = reviewsAPI.data);
			dispatch(setReviews(result.reviews));
		}
		if (skillsAPI?.success) {
			(result.skills = skillsAPI.data);
			dispatch(setSkills(result.skills));
		}


		return result;

	} catch (error) {
		console.log(error)
	}

};