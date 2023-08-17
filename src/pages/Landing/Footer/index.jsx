import React from 'react';
import scss from './style.module.scss';
import { Navigation, Socials } from '@/components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Footer = (events) => {
	const { } = events;
	const { t } = useTranslation();
	const { language: lang } = useTranslation().i18n;
	const lng = t('footer', { returnObjects: true });
	const userData = useSelector(state => state.user.data);

	return (<>
		<div className={`${scss.wrap} container`}>
			<div className={scss.created}>Ⓒ 2023</div>
			<h4 className={`title ${scss.name}`}>{userData[lang].username}</h4>
			<div className={scss.nav}><Navigation /></div>
			<div className={`${scss.box_1} ${scss.box}`}>
				<p className={`text`}>{lng.text}</p>
				<div className={scss.socials}><Socials style="circle" /></div>
			</div>
			<div className={`${scss.box_2} ${scss.box}`}>
				<p className={`text`}>{lng.quote.value}</p>
				<p className={`text`}>{lng.quote.author}</p>
			</div>
		</div>
	</>);
}

export default Footer;