import React from 'react';
import { useState } from 'react';
import scss from './styles.module.scss';
import {SVG} from '@UI';

const Socials = (events) => {
	const {style='base'} = events;

	const [socials, setSocials] = useState([
		{name: 'email', value: 'Envelope', url: 'mailto:sashakalaydr@gmail.com'},
		{name: 'telegram', value: 'Telegram', url: 'https://t.me/kalaydr'},
		{name: 'phone', value: 'Phone', url: 'tel:+79219014889'},
	])

	return (<>
		<ul className={scss.list} data-style={style}>
			{socials.map((el, i) => (
			<li className={scss.item} key={i}>
				<a className={scss.link} href={el.url} target='_blanck'>
					<SVG icon={el.value} className={scss.icon}/>
				</a>
			</li>
			))}
		</ul>
	</>);
}

export default Socials;