import React, { useState } from 'react';
import scss from './style.module.scss';
import { useActions } from '@hooks';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LanguageSelect } from '@/components';
import { useTranslation } from 'react-i18next';

const Header = (events) => {
	const { logOut } = useActions();
	const userData = useSelector(state => state.user);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { language } = useTranslation().i18n;

	const [navList, setNavList] = useState([
		{ route: '/about_me', value: 'Обо мне' },
		{ route: '/skills', value: 'Скиллы' },
		{ route: '/portfolio', value: 'Портфолио' },
		{ route: '/reviews', value: 'Отзывы' },
	])




	return (<>
		<header className={scss.wrap}>
			<div className={scss.head}>
				<div className="container" data-name='container'>
					<div className={scss.user}>
						<img src={userData?.data?.avatar} className={scss.user__avatar} />
						<h5 className={scss.user__name}>{userData?.data[language].username}</h5>
						<p className={scss.user__placeholder}>Панель администрирования</p>
					</div>
					<LanguageSelect />
					<button className={`${scss.btnLogOut}`} onClick={e => { logOut(); navigate('/'); }}>Выйти</button>
				</div>
			</div>

			<div className={scss.foot}>
				<div className="container" data-name='container'>
					<nav className={scss.nav}>
						{navList.map((item, index) => (
							<NavLink
								className={scss.link}
								to={`/admin${item.route}`}
								key={index}
								data-active={pathname === `/admin${item.route}`}
							>{item.value}</NavLink>
						))}
					</nav>
				</div>
			</div>
		</header>
	</>);
}

export default Header;