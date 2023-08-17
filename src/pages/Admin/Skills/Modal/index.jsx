import React, { useState, useEffect, useRef } from 'react';
import cls from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { getFormData } from '@/scripts';
import { useActions } from '@hooks';

const Modal = ({ isOpen, setIsOpen }) => {
	const formRef = useRef(null);
	const inpRef = useRef(null);
	const { language } = useTranslation().i18n;
	const { apiSkillsAddGroup } = useActions();

	const closeModal = e => setIsOpen(false);
	const resetModal = e => formRef.current?.reset();


	useEffect(() => {
		isOpen && inpRef.current.focus();
	}, [isOpen])

	function send(e) {

		const formData = new FormData(e.target);
		formData.set('lang', language);

		apiSkillsAddGroup(formData);

		e.preventDefault();
		closeModal();
		resetModal();
	}

	return (<>
		<div className={cls.modal} data-open={isOpen} onMouseDown={closeModal}>
			<form ref={formRef} autoComplete='off' onSubmit={send} className={cls.modal__form} onMouseDown={e => e.stopPropagation()}>
				<div className={cls.modal__content}>
					<input ref={inpRef} autoComplete='off' required maxLength={32} minLength={2} type="text" name='title' />

					<button type='reset' onClick={closeModal}>Сбросить</button>
					<button type='submit'>Создать</button>
				</div>
			</form>
		</div>
	</>);
}

export default Modal;