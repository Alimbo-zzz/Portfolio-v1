import React, { useState } from 'react';
import scss from './style.module.scss';
import { useSelector } from 'react-redux';
import { SVG } from '@UI';
import ModalForm from './ModalForm';
import { useTranslation } from 'react-i18next';
import { useActions } from '@hooks';


const Reviews = (props) => {
	const { data, status, error } = useSelector(state => state.reviews);
	const { language } = useTranslation().i18n;
	const [modalData, setModalData] = useState({ isOpen: false });
	// type: 1 --- добавить работу | type: 2 --- редактировать работу;
	const { apiReviewsDelete } = useActions();
	const createItem = () => setModalData({ isOpen: true, type: 1 });
	const editItem = (itemData) => setModalData({ isOpen: true, type: 2, itemData });




	return (<>
		<ModalForm modalData={modalData} setModalData={setModalData} />
		<div className={scss.wrap}>
			<div className="container">
				<h2 className='admin-block-title'>Отзывы</h2>
				<ul className={scss.list}>
					<li className={scss.addBtn} onClick={createItem}>Добавить отзыв</li>
					{data[language].map((item, index) => (
						<li key={index} className={scss.item}>
							<div className={scss.item__head}>
								<img src={item.avatar} />
								<h4 className={scss.item__name}>{item.name}</h4>
								<p className={scss.item__job}>{item.job}</p>
							</div>
							<div className={scss.item__body}>
								{item.review}
							</div>
							<div className={scss.item__foot}>
								<button data-btn='edit' onClick={() => editItem(item)}>Править <SVG icon='Pencil' /></button>
								<button data-btn='delete' onClick={() => apiReviewsDelete({ id: item.id, lang: language })}>Удалить <SVG icon='Cross' /></button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	</>);
}

export default Reviews;