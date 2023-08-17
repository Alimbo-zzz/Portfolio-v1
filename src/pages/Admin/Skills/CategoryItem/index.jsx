import React, { useState, useEffect, useRef } from 'react';
import scss from './style.module.scss';
import FileIcon from '../FileIcon';
import { SVG } from '@UI';
import { useActions } from '@hooks';
import { useTranslation } from 'react-i18next';

const CategoryItem = ({ category }) => {
	const [editMode, setEditMode] = useState(false);
	const makeEditMode = () => setEditMode(true);
	const removeEditMode = () => setEditMode(false);
	const { language } = useTranslation().i18n;
	const { apiSkillsDeleteGroup, apiSkillsEditteGroup } = useActions();
	const inpRef = useRef(null);
	const formRef = useRef(null);

	useEffect(() => {
		editMode && inpRef.current?.focus();
	}, [editMode])


	function sendRequest(e) {
		e.preventDefault();

		const formData = new FormData(e?.target);
		formData.set('lang', language);
		formData.set('id', category.id);

		apiSkillsEditteGroup(formData);
		removeEditMode();
	}

	function deleteCategory() {
		apiSkillsDeleteGroup({ id: category?.id, lang: language })
	}

	function resetForm() {
		removeEditMode();
		formRef.current?.reset();
	}


	return (<>
		<form ref={formRef} autoComplete='off' className={scss.category} data-active={editMode} onSubmit={sendRequest}>
			<input ref={inpRef} required readOnly={!editMode} type="text" placeholder='Название категории' name='title' maxLength={20} defaultValue={category.title} />
			<div className={scss.buttons}>
				{!editMode && (<>
					<button onClick={makeEditMode} data-btn='icon' type='edit'><SVG icon='Pencil' /></button>
					<button data-btn='icon' type='button' onClick={deleteCategory}><SVG icon='Trash' /></button>
				</>)}
				{editMode && (<>
					<button data-btn='icon' type='submit'><SVG icon='Tick' /></button>
					<button onClick={resetForm} data-btn='icon' type='reset'><SVG icon='Cross' /></button>
				</>)}
			</div>
		</form>
	</>)
}

export default CategoryItem;