import React from 'react';
import scss from './style.module.scss';
import {Auth} from '../components';
import imgBG from '@images/Rock Fest.png';

const NotAuthorized = (events) => {
	const {} = events;
	
	return (<>
		<div className={scss.wrap}>
			<div className="container" data-name="container">
				<Auth/>
			</div>
			<img src={imgBG} className={scss.bg} />
		</div>
	</>);
}

export default NotAuthorized;