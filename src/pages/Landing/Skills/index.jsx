import React, { useState } from 'react';
import scss from './style.module.scss';
import guitar from '@images/guitar.png';
import { SVG } from '@UI';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const Tags = ({ list }) => {


	return (<>
		{list.map((el, i) => (
			<div className={scss.tag} key={el.id}>
				<div className={scss.tag__icon}><img src={el.icon} />	</div>
				<div className={scss.tag__text}>{el.name}</div>
			</div>
		))}
	</>)
}


const Skills = (events) => {
	const { } = events;
	const { t } = useTranslation();
	const { language: lang } = useTranslation().i18n;
	const lng = t('secSkills', { returnObjects: true });
	const skillsData = useSelector(state => state.skills.data);

	return (<>
		<div className={scss.wrap}>
			<div className={`${scss.cont} container`}>
				<div className={scss.preview}>
					<h4 className='title'>{lng.title}</h4>
					<p className="text">{lng.text}</p>
				</div>
				<div className={scss.grid}>
					<div className={scss.imgBox}> <img src={guitar} /> </div>
					<ul className={scss.skills}>
						{skillsData[lang].map((el, i) => (
							<li key={el.id} className={scss.skills__row}>
								<h5 className='title'>{el.title}</h5>
								<div className={scss.skills__list}>
									<Tags list={el.skills} />
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	</>);
}


export default Skills;