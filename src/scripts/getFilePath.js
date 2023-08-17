const { VITE_BASE_URL } = import.meta.env;

export default (path = '') => {
	let result = '';
	let arr = path?.split("\\");
	let filename = arr?.pop();
	let folder = arr?.pop();

	(folder && filename) && (result = `${VITE_BASE_URL}/${folder}/${filename}`);

	return result;
};