import React, { useState } from 'react';
import scss from './styles.module.scss';
import {useTranslation} from 'react-i18next';

const Navigation = (events) => {
	const {closeMenu} = events;
	const {t} = useTranslation();
  const lng = t('navigation', {returnObjects:true});
	const [navs, setNavs] = useState([
		'main',
		'about-me',
		'skills',
		'portfolio',
		'reviews',
		'connection',
	]);
	
	return (<>
		<nav className={scss.nav}>
			{navs.map((el, i) => (
				<a 
					href={`#${el}`} 
					key={i} className={scss.link}
					onClick={closeMenu}
				>{lng[el]}</a>
			))}
		</nav>
	</>);
}

export default Navigation;