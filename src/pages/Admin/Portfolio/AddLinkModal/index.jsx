import React, { useState } from 'react';
import scss from './style.module.scss';
import { v4 as setId } from 'uuid';

const AddLinkModal = ({ modalLinkIsOpen, setModalLinkIsOpen, setInpLinks }) => {

	function submitForm(params) {
		params.preventDefault();

		const formData = new FormData(params.target);

		let newLink = { id: setId() };

		for (const iterator of formData) {
			newLink[iterator[0]] = iterator[1];
		}

		if (!newLink?.value && !newLink?.url) return;

		setInpLinks(prev => ([...prev, newLink]))
		resetForm(params);
	}

	function resetForm(params) {
		params.target.reset();
		setModalLinkIsOpen(false);
	}

	return (<>
		<div className={scss.wrap} data-active={modalLinkIsOpen} onClick={() => setModalLinkIsOpen(false)}>
			<form
				className={scss.form}
				autoComplete='off'
				onSubmit={submitForm}
				onReset={resetForm}
				onClick={e => e.stopPropagation()}
			>
				<label data-label='url'>
					<p className="admin-form-placeholder">Ссылка</p>
					<input required maxLength={300} type="url" name="url" />
				</label>
				<label data-label='value'>
					<p className="admin-form-placeholder">Название кнопки</p>
					<input required minLength={2} maxLength={24} type="text" name="value" />
				</label>

				<div className={scss.form__btns}>
					<button type='reset' className='admin-form-reset'>Назад</button>
					<button type='submit' className='admin-form-btn' >Создать</button>
				</div>
			</form>
		</div>
	</>);
}

export default AddLinkModal;