export default (inputEvent, setter) => {
	try {
		let file = inputEvent.target.files[0];
		if (!file) return;
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => setter(reader.result);
		reader.onerror = error => console.log(error);
	} catch (error) {
		console.log(error)
	}
};


