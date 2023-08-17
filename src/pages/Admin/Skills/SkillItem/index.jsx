import React, { useState, useEffect, useRef } from 'react';
import scss from './style.module.scss';
import FileIcon from '../FileIcon';
import { SVG } from '@UI';
import { useTranslation } from 'react-i18next';
import { useActions } from "@hooks"

const SkillItem = ({ skill, category }) => {
	const [editMode, setEditMode] = useState(false);
	const { language } = useTranslation().i18n;
	const [icon, setIcon] = useState(skill?.icon);
	const { apiSkillsDeleteItem, apiSkillsEditItem } = useActions();
	const formRef = useRef(null);

	const makeEditMode = () => setEditMode(true);
	const removeEditMode = () => setEditMode(false);
	const resetForm = () => {
		formRef.current?.reset();
		setIcon(skill?.icon);
		removeEditMode();
	}
	const deleteItem = () => apiSkillsDeleteItem({ lang: language, ref: category?.id, id: skill?.id });


	function sendRequest(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.set('ref', category?.id);
		formData.set('lang', language);
		formData.set('id', skill?.id);

		apiSkillsEditItem(formData);

		removeEditMode();
	}



	useEffect(() => {
		setIcon(skill?.icon);
	}, [skill])


	return (<>
		<form ref={formRef} autoComplete='off' className={scss.skill} data-active={editMode} onSubmit={sendRequest}>
			<input required readOnly={!editMode} type="text" name='name' placeholder='Название навыка' minLength={2} maxLength={20} defaultValue={skill.name} />
			<FileIcon editMode={editMode} icon={icon} setIcon={setIcon} />
			<div className={scss.buttons}>
				{!editMode && (<>
					<button onClick={makeEditMode} data-btn='icon' type='edit'><SVG icon='Pencil' /></button>
					<button onClick={deleteItem} data-btn='icon' type='button'><SVG icon='Trash' /></button>
				</>)}
				{editMode && (<>
					<button data-btn='icon' type='submit'><SVG icon='Tick' /></button>
					<button onClick={resetForm} data-btn='icon' type='reset'><SVG icon='Cross' /></button>
				</>)}
			</div>
		</form>
	</>)
}

export default SkillItem;