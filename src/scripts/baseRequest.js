import axios from 'axios';
const { VITE_BASE_URL, VITE_AUTH_USER, VITE_AUTH_PASS } = import.meta.env;

export default axios.create({
	baseURL: `${VITE_BASE_URL}/v1/api`,
	headers: {
		'Content-Type': 'multipart/form-data',
		'Authorization': `{"user": "${VITE_AUTH_USER}",  "pass": "${VITE_AUTH_PASS}" }`
	}
});