import React, { useState, useEffect, useRef, useCallback } from 'react';
import scss from './style.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextareaAutosize } from '@mui/base';
import { SVG } from '@UI';
import { imageSetter, getDateFormat, getFormData } from '@/scripts';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { useActions } from '@hooks';


const AboutMe = (events) => {
	const userData = useSelector(state => state.user);
	const { language } = useTranslation().i18n;
	const form = useRef(null);
	const datepicker = useRef(null);
	const [born, setBorn] = useState(userData?.data?.born);
	const [avatar, setAvatar] = useState(userData?.data?.avatar);
	const [editMode, setEditMode] = useState(false);
	const { apiUserEdit } = useActions();

	useEffect(() => {
		setAvatar(userData?.data?.avatar);
		setBorn(userData?.data?.born);
	}, [userData])

	const removeEditMode = () => setEditMode(false);
	const startEditMode = () => setEditMode(true);
	const changeAvatar = e => imageSetter(e, setAvatar);

	const formReset = () => {
		setAvatar(userData?.data?.avatar);
		form.current?.reset();
		setBorn(userData?.data?.born);
		removeEditMode();
	}

	function sendRequest(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.set('born', new Date(born).getTime());
		formData.set('lang', language);

		apiUserEdit(formData);

		removeEditMode();
	}

	useEffect(() => {
		const input = datepicker.current;
		const picker = new AirDatepicker(input, {
			isMobile: true,
			dateFormat: 'dd MMMM yyyy',
			onSelect: ({ date }) => {
				setBorn(new Date(date))
				picker.hide();
			},
		})

		return () => picker.destroy();
	}, [])




	return (<>
		<form autoComplete='off' ref={form} className={scss.form} onSubmit={sendRequest} onReset={formReset} data-edit-mode={editMode}>
			<div className="container">
				<div className={scss.form__head}>
					<h2 className='admin-block-title'>Обо мне</h2>
					<div className={scss.form__buttons}>
						{!editMode && (<button className='icon-button' type='edit' onClick={startEditMode}><SVG icon='Pencil' />  <span>Редактировать</span>  </button>)}
						{editMode && (<>
							<button className='icon-button' type='submit'> <SVG icon='Tick' /> </button>
							<button className='icon-button' type='reset'> <SVG icon='Cross' /> </button>
						</>)}
					</div>
				</div>

				<div className={scss.form__grid}>
					<label data-label='avatar'>
						<input type="file" accept="image/*" name='avatar' onChange={changeAvatar} />
						<img src={avatar} />
						<p data-name='avatar-placeholder'>Выбрать аватар</p>
					</label>

					<label data-label='main-text'>
						<p className={'form-placeholder'}>Привет, меня зовут {userData.data[language].username}</p>
						<TextareaAutosize data-admin readOnly={!editMode} minRows={5} maxRows={5} name="mainText" defaultValue={userData.data[language].mainText} placeholder='Главная информация' maxLength={300} required />
					</label>
					<label data-label='description'>
						<p className={'form-placeholder'}>Дополнительная информация</p>
						<TextareaAutosize data-admin readOnly={!editMode} minRows={3} maxRows={6} name="description" defaultValue={userData.data[language].description} placeholder='Дополнительная информация' maxLength={300} required />
					</label>

					<label data-label='username'>
						<p className={'form-placeholder'}>Ваше имя</p>
						<input data-admin readOnly={!editMode} type="text" name='username' defaultValue={userData.data[language].username} placeholder='Введите ваше имя' minLength={2} maxLength={25} required />
					</label>
					<label data-label='live'>
						<p className={'form-placeholder'}>Проживаю</p>
						<input data-admin readOnly={!editMode} type="text" name='live' defaultValue={userData.data[language].live} placeholder='Введите город' minLength={2} maxLength={30} required />
					</label>
					<label data-label='born'>
						<p className={'form-placeholder'}>Родился</p>
						<input data-admin type="text" name="born" value={getDateFormat(born)} readOnly ref={datepicker} required />
					</label>
				</div>
			</div>
		</form>
	</>);
}

export default AboutMe;