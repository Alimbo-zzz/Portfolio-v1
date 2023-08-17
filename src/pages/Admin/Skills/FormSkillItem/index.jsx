import React, { useState, useEffect } from 'react';
import scss from './style.module.scss'
import FileIcon from '../FileIcon';
import { useActions } from '@hooks';
import { imageSetter, getFormData } from '@/scripts';
import { useTranslation } from 'react-i18next';


const FormSkillItem = ({ data }) => {
	const { language } = useTranslation().i18n;
	const [icon, setIcon] = useState('http://localhost:8080/static/star.svg');
	const { apiSkillsAddItem } = useActions();



	function sendRequest(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.set('lang', language);
		formData.set('ref', data?.id);

		e.target?.reset();
		setIcon('http://localhost:8080/static/star.svg');
		apiSkillsAddItem(formData);
	}



	return (<>
		<form autoComplete='off' className={scss.add} onSubmit={sendRequest}>
			<input required type="text" name='name' placeholder='Новый навык' maxLength={20} />
			<FileIcon editMode={true} icon={icon} a="as" b="ss" setIcon={setIcon} />
			<button data-btn='icon-add' type='submit' />
		</form>
	</>);
}

export default FormSkillItem;