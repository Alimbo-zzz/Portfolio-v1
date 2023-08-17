import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '@hooks';
import { NotAuthorized, Authorized } from './components';
import scss from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { GET_all } from '@/api';
import './formInputs.scss';

const Admin = (props) => {
	const authState = useSelector(state => state.auth);
	const { autoLogin } = useActions();
	const translation = useTranslation();

	useEffect(() => {
		GET_all();
		autoLogin()
	}, [])



	return (<>
		<div className={scss.wrap}>
			{
				authState.authorized ? <Authorized translation={translation} /> : <NotAuthorized />
			}
		</div>
	</>);
}

export default Admin;