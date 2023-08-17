import React, {useEffect} from 'react';
import scss from './style.module.scss';
import {Header, AboutMe, Reviews, Portfolio, Skills} from '../components';
import {Error} from '@/pages';
import { Route, Routes, Navigate } from 'react-router-dom';


const Authorized = (events) => {

	
	return (<>
		<div className={scss.wrap}>
			<Header/>
			<main className={scss.main}>
				<Routes>
					<Route element={<Navigate to='/admin/about_me'/>} path='/'/>
					<Route element={<AboutMe/>} path='/about_me'/>
					<Route element={<Skills/>} path='/skills'/>
					<Route element={<Portfolio/>} path='/portfolio'/>
					<Route element={<Reviews/>} path='/reviews'/>
					<Route element={<Error/>} path='/*'/>
				</Routes>
			</main>
		</div>
	</>);
}

export default Authorized;