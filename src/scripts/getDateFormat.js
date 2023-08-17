export default (eventDate, type = 'base') => {
	let result = '';
	const a = new Date(eventDate);

	let year = String(a.getFullYear())
	let month = String(a.getMonth()).padStart(2, '0')
	let date = String(a.getDate()).padStart(2, '0')

	result = `${date}.${month} ${year}`;

	if (type === 'age') {
		var now = new Date(); //Текущя дата
		var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
		var dob = new Date(eventDate); //Дата рождения
		var dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
		var age; //Возраст

		//Возраст = текущий год - год рождения
		age = today.getFullYear() - dob.getFullYear();
		//Если ДР в этом году ещё предстоит, то вычитаем из age один год
		if (today < dobnow) {
			age = age - 1;
		}
		result = age;
	}

	return result;
};