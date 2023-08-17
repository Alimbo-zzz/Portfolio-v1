import React, { useEffect, useState, useRef } from 'react';
import scss from './style.module.scss';
import { useSelector } from 'react-redux';
import SkillItem from './SkillItem';
import CategoryItem from './CategoryItem';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import FormSkillItem from './FormSkillItem';





const Skills = (props) => {
	const { data, status, error } = useSelector(state => state.skills);
	const { language } = useTranslation().i18n;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const openModal = e => setModalIsOpen(true);


	return (<>
		<Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
		<div className={scss.wrap}>
			<div className="container">
				<div className={scss.head}>
					<h2 className='admin-block-title'>Скиллы</h2>
					<button className={scss.btnAdd} type='button' onClick={openModal}>Добавить Категорию</button>
				</div>

				<ul className={scss.list}>
					{data[language].map(category => (<li className={scss.item} key={category?.id}>
						<CategoryItem category={category} />
						<div className={scss.item__skills}>
							{category.skills.map(skill => (<SkillItem category={category} skill={skill} key={skill?.id} />))}
						</div>
						<FormSkillItem data={category} />
					</li>))}
				</ul>
			</div>
		</div>
	</>);
}

export default Skills;