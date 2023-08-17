import React from 'react';
import scss from './style.module.scss';
import { SVG } from '@UI';


const PortfolioItem = ({ data, onEdit, onDelete }) => {
	const { image, tags, title, description, links } = data;




	return (<>
		<div className={scss.wrap}>
			<div className={scss.preview}>
				<img src={image} className={scss.preview__img} />
				<ul className={scss.preview__tags}>
					{tags.map((tag, index) => <span key={index} className={scss.tag}>{tag}</span>)}
				</ul>
			</div>
			<div className={scss.content}>
				<h3 className={scss.content__title}>{title}</h3>
				<p className={scss.content__description}>{description}</p>
				<ul className={scss.content__links}>
					{links.map((link, index) => <a href={link.url} target='_blank' key={index}>{link.value}</a>)}
				</ul>
				<div className={scss.content__btns}>
					<button data-btn='edit' onClick={onEdit}>Изменить <SVG icon='Pencil' /></button>
					<button data-btn='delete' onClick={onDelete}>Удалить <SVG icon='Cross' /></button>
				</div>
			</div>
		</div>
	</>);
}

export default PortfolioItem;