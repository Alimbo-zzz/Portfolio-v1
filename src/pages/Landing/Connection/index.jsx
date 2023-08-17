import React from 'react';
import scss from './style.module.scss';
import { SVG } from '@UI';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextareaAutosize } from '@mui/base';

const Connection = (events) => {
	const { } = events;
	const { t } = useTranslation();
	const lng = t('secConnection', { returnObjects: true });
	const lng_btns = t('btns', { returnObjects: true });
	const { language } = useTranslation().i18n;



	return (<>
		<div className={scss.wrap}>
			<div className="container">
				<h3 className='title'>{lng.title}</h3>
				<form className={scss.form} autoComplete='off'>
					<label className={scss.form__box} data-box='user' >
						<SVG icon='Avatar' />
						<p className={scss.form__title}>{lng.form.name.placeholder}</p>
						<input required type="text" name="user" maxLength={30} minLength={2} />
						<span className={scss.form__line}></span>
					</label>
					<label className={scss.form__box} data-box='mail' >
						<SVG icon='Envelope' />
						<p className={scss.form__title}>{lng.form.mail.placeholder}</p>
						<input required type="email" name="mail" />
						<span className={scss.form__line}></span>
					</label>
					<label className={scss.form__box} data-box='message' >
						<SVG icon='Chat' />
						<p className={scss.form__title}>{lng.form.message.placeholder}</p>
						<TextareaAutosize minRows={3} maxRows={6} required name="message" maxLength={1000} minLength={10} />
						<span className={scss.form__line}></span>
					</label>

					<button type='submit' className='btn'>{lng_btns.send}</button>
				</form>
			</div>
		</div>
	</>);
}

export default Connection;