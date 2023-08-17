import React, { useState, useEffect } from 'react';
import scss from './style.module.scss';
import { Socials, Navigation } from '@/components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Header = (events) => {
	const { } = events;
	const [menuOpened, setMenuOpened] = useState(false);
	const userData = useSelector(state => state.user.data);
	const { language: lang } = useTranslation().i18n;
	const logo = userData[lang].username.split(' ').map(el => el.substring(0, 1).toUpperCase());


	const closeMenu = () => setMenuOpened(false);

	useEffect(() => {
		document.addEventListener('click', closeMenu)
		return (e) => { document.removeEventListener('click', closeMenu) }
	}, [])

	return (<>
		<div className={` container`}>
			<div className={scss.wrap}>
				<div className={scss.logo}>{logo}</div>
				<div
					className={scss.nav}
					data-menu={menuOpened}
					onClick={e => e.stopPropagation()}
				>
					<Navigation closeMenu={closeMenu} />
				</div>
				<div className={scss.socials}><Socials /></div>
				<div
					className={scss.hamburger}
					data-menu={menuOpened}
					onClick={e => { e.stopPropagation(); setMenuOpened(prev => !prev) }}
				><span></span></div>
			</div>
		</div>
	</>);
}

export default Header;