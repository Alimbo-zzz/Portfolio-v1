import React, { useState } from 'react';
import scss from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getDateFormat } from '@/scripts';

const AboutMe = (events) => {
	const { } = events;
	const { t } = useTranslation();
	const lng = t('secAboutMe', { returnObjects: true });

	const userData = useSelector(state => state.user.data);
	const { language: lang } = useTranslation().i18n;
	const setInfoItem = (index) => {
		let result = '';
		let date = new Date(userData.born);

		let userBorn = getDateFormat(date);
		let userAge = `${getDateFormat(date, 'age')} ${lng.age}`;

		(index === 0) && (result = userData[lang].live);
		(index === 1) && (result = userAge);
		(index === 2) && (result = userBorn);

		return result;
	}



	return (<>
		<div id='about-me-content' className={`${scss.wrap} container`}>
			<div className={scss.grid}>
				<div className={scss.avatar}><img src={userData.avatar} /></div>
				<div className={scss.biography}>
					<p className="text">{lng.hi}</p>
					<h3 className='title'>{userData[lang].username}</h3>
					<p className="text">{userData[lang].mainText}</p>
				</div>
				<p className={`${scss.description} text`}>{userData[lang].description}</p>
				<div className={scss.info}>
					{lng.info.map((el, i) => (
						<div className={scss.info__box} key={i}>
							<div className={scss.info__key}>{el}:</div>
							<div className={scss.info__value}>{setInfoItem(i)}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	</>);
}

export default AboutMe;