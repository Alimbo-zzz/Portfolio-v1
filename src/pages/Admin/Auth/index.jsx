import React from 'react';
import scss from './style.module.scss';
import {SVG} from '@UI';
// import {useSelector} from 'react-redux';
import {useActions} from '@hooks';
import { Link } from 'react-router-dom';
const env = import.meta.env; 

const Auth = (props) => {
	const {logIn} = useActions();


	function sendLogin(e){
		e.preventDefault();
		const {VITE_AUTH_USER, VITE_AUTH_PASS} = env;
		const data = new FormData(e.target);
		const login = data.get('login');
		const password = data.get('password');

		if(
			login && password
			&& login.toLowerCase() === VITE_AUTH_USER 
			&& password.toLowerCase() === VITE_AUTH_PASS
		){
			logIn({password, login});
		}
		else{
			alert('Неверный логин или пароль');
		}
	}


	
	return (<>
		<form className={scss.form} autoComplete='off' onSubmit={sendLogin}>
			<Link className={scss.remove} to='/'>✕</Link>
			<h4 className={scss.title}>Авторизация</h4>
			<label className={scss.box}>
				<p className={scss.placeholder}>Логин</p>
				<SVG icon='User'/>
				<input 
					type="text" 
					name="login" 
					required
				/>
			</label>
			<label className={scss.box}>
				<p className={scss.placeholder}>Пароль</p>
				<SVG icon='Key'/>
				<input 
					type="password" 
					name="password" 
					required
					autoComplete={'new-password'}
				/>
			</label>
			<button className={scss.btn} type='submit'>оправить</button>
		</form>
	</>);
}

export default Auth;