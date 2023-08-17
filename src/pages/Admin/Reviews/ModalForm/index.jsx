import React, { useState, useEffect, useRef } from 'react';
import scss from './style.module.scss';
import { SVG } from '@UI';
import { TextareaAutosize } from '@mui/base';
import { useTranslation } from 'react-i18next';
import { imageSetter, getFormData } from '@/scripts';
import { useActions } from '@hooks';

const ModalForm = ({ modalData, setModalData }) => {
	const { language } = useTranslation().i18n;
	const { isOpen, type = 1, itemData } = modalData;
	// type: 1 --- добавить работу | type: 2 --- редактировать работу;
	const [formAvatar, setFormAvatar] = useState(null);
	const { apiReviewsAdd, apiReviewsEdit } = useActions();
	const formRef = useRef(null);

	const closeModal = () => {
		setModalData(prev => ({ ...prev, isOpen: false }));
		resetForm();
	}
	const changeImage = (event) => imageSetter(event, setFormAvatar);

	useEffect(() => { (type === 2) && setFormAvatar(itemData?.avatar); }, [itemData])

	function submitForm(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.set('lang', language);
		(type === 2) && formData.set('id', itemData?.id);

		(type === 2) && apiReviewsEdit(formData);
		(type === 1) && apiReviewsAdd(formData);

		closeModal();
		resetForm();
	}

	function resetForm() {
		formRef.current?.reset();
		setFormAvatar(null);
	}

	return (<>
		<div className={scss.wrap} onClick={closeModal} data-active={isOpen}>
			<form
				onSubmit={submitForm}
				onReset={resetForm}
				ref={formRef}
				onClick={e => e.stopPropagation()}
				className={scss.form}
				autoComplete='off'
			>
				<div className={scss.form__container}>
					<div className={scss.form__head}>
						<h4 className={scss.modalTitle}>
							{type === 1 && 'Добавить отзыв'}
							{type === 2 && 'Редактировать отзыв'}
						</h4>
						<button type='button' className={scss.closeBtn} onClick={closeModal}><SVG icon='Cross' /></button>
					</div>
					<div className={scss.form__body}>
						<label data-label='avatar'>
							<input type="file" name="avatar" assets='image/*' onChange={changeImage} />
							<img src={formAvatar} />
							<p>Добавить фото</p>
						</label>
						<label data-label='name'>
							<p className='admin-form-placeholder'>Имя автора</p>
							<input autoComplete='off' defaultValue={type === 2 ? itemData?.name : ''} type="text" required name='name' minLength={2} maxLength={24} />
						</label>
						<label data-label='job'>
							<p className='admin-form-placeholder'>Титул автора</p>
							<input autoComplete='off' type="text" defaultValue={type === 2 ? itemData?.job : ''} required name='job' minLength={2} maxLength={30} />
						</label>
						<label data-label='review'>
							<p className='admin-form-placeholder'>Отзыв</p>
							<TextareaAutosize
								minRows={3}
								maxRows={6}
								maxLength={600}
								type="text"
								required
								defaultValue={type === 2 ? itemData?.review : ''}
								name='review' />
						</label>
					</div>
					<div className={scss.form__foot}>
						<button type='reset' className='admin-form-reset'>Сбросить</button>
						<button type='submit' className='admin-form-btn'>Отправить</button>
					</div>
				</div>
			</form>
		</div>
	</>);
}

export default ModalForm;