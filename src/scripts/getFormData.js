export default (formData) => {
	let result = {};

	for (let [name, value] of formData) {
		result[name] = value;
	}

	return result;
};