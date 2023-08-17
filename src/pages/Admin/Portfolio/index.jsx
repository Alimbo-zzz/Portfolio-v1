import React, { useEffect, useState } from 'react';
import scss from './style.module.scss';
import { useSelector } from 'react-redux';
import PortfolioItem from './PortfolioItem';
import PortfolioModal from './PortfolioModal';
import { useTranslation } from 'react-i18next';
import { useActions } from '@hooks';

const Portfolio = (events) => {
	const { } = events;
	const { data, error, status } = useSelector(state => state.portfolio);
	const [modalData, setModalData] = useState({ isOpen: false });
	const { language } = useTranslation().i18n;
	const { apiPortfolioDeleteItem } = useActions();
	// type: 1 --- добавить работу | type: 2 --- редактировать работу;
	const startCreateItem = () => setModalData({ isOpen: true, type: 1, });
	const startEditItem = (itemData) => setModalData({ isOpen: true, type: 2, itemData });


	function editItem(itemData) {
		startEditItem(itemData)
	}

	function deleteItem({ id }) {
		apiPortfolioDeleteItem({ id, lang: language })
	}



	return (<>
		<div className={scss.wrap}>
			<PortfolioModal
				modalData={modalData}
				setModalData={setModalData}
			/>
			<div className="container">
				<h2 className='admin-block-title'>Портфолио</h2>
				<ul className={scss.list}>
					<div className={scss.addBtn} onClick={startCreateItem}>Добавить работу</div>

					{data[language].map((item, index) => (
						<li className={scss.item} key={index}>
							<PortfolioItem
								data={item}
								onEdit={() => editItem(item)}
								onDelete={() => deleteItem(item)}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	</>);
}

export default Portfolio;