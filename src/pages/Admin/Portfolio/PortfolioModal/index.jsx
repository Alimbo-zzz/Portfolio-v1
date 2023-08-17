import React, { useState, useEffect, useRef } from 'react';
import scss from './style.module.scss';
import { TextareaAutosize } from '@mui/base';
import { SVG } from '@UI';
import AddLinkModal from '../AddLinkModal';
import { useActions } from '@hooks';
import { imageSetter, getFormData } from '@/scripts';
import { useTranslation } from 'react-i18next';




const PortfolioModal = ({ modalData, setModalData }) => {
	const { isOpen, type, itemData } = modalData;
	// type: 1 --- добавить работу | type: 2 --- редактировать работу;
	const [inpTags, setInpTags] = useState('');
	const [inpLinks, setInpLinks] = useState([])
	const [imagePreview, setImagePreview] = useState(null);
	const { apiPortfolioAddItem, apiPortfolioEditItem } = useActions();
	const { language } = useTranslation().i18n;

	const [modalLinkIsOpen, setModalLinkIsOpen] = useState(false);
	const modalLinkData = { modalLinkIsOpen, setModalLinkIsOpen, setInpLinks }
	const formRef = useRef(null);

	useEffect(() => {
		if (!itemData || type !== 2) return;
		setInpTags(type === 2 ? itemData?.tags.join(', ') : '');
		setInpLinks(type === 2 ? itemData?.links : []);
		setImagePreview(type === 2 ? itemData?.image : null);
	}, [itemData])

	const closeModal = () => {
		setModalData(prev => ({ ...prev, isOpen: false }));
		resetForm();
	}
	const removeLink = (link) => {
		const filterLinks = inpLinks.filter(item => item.id !== link.id);
		setInpLinks(filterLinks);
	}

	const addLink = () => setModalLinkIsOpen(true);
	const changePreview = e => imageSetter(e, setImagePreview);


	function sendRequest(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const arrTags = inpTags.split(',');
		formData.set('links', JSON.stringify(inpLinks));
		formData.set('tags', JSON.stringify(arrTags));
		formData.set('lang', language);
		(type === 2) && formData.set('id', itemData?.id);

		(type === 2) && apiPortfolioEditItem(formData);
		(type === 1) && apiPortfolioAddItem(formData);

		closeModal();
	}

	function resetForm() {
		formRef.current?.reset();
		setInpLinks([]);
		setInpTags('');
	}


	return (<>
		<AddLinkModal {...modalLinkData} />
		<div onReset={resetForm} onSubmit={sendRequest} className={scss.wrap} data-active={isOpen} onClick={closeModal}>
			<form
				autoComplete='off'
				className={scss.form}
				onClick={e => e.stopPropagation()}
				ref={formRef}
			>
				<div className={scss.form__container}>
					<div className={scss.form__head}>
						<h4 className={scss.modalTitle}>
							{type === 1 && 'Добавить работу'}
							{type === 2 && 'Редактировать работу'}
						</h4>
						<button className={scss.closeBtn} type='button' onClick={closeModal}><SVG icon='Cross' /></button>
					</div>

					<div className={scss.form__body}>
						<label data-label='preview'>
							<input type="file" assets='image/*' name='image' required={type === 1} onChange={changePreview} />
							<p className='admin-form-placeholder'>Перетащите или загрузите изображение</p>
							<p className='admin-form-btn'>загрузить</p>
							{imagePreview && <img src={imagePreview} />}
						</label>
						<label data-label='name'>
							<p className='admin-form-placeholder' >Название</p>
							<input autoComplete='off' type="text" defaultValue={type === 2 ? itemData?.name : ''} required maxLength={40} name='name' />
						</label>
						<label data-label='description'>
							<p className='admin-form-placeholder'>Описание</p>
							<TextareaAutosize autoComplete='off' name='description' defaultValue={type === 2 ? itemData?.description : ''} required minRows={2} maxRows={6} maxLength={600} />
						</label>

						<div className={scss.links}>
							<div className={scss.links__head}>
								<p className="admin-form-placeholder">Ссылки</p>
								<button type='button' data-btn='add-link' onClick={addLink}>Добавить ссылку</button>
							</div>
							<ul className={scss.links__list}>
								{inpLinks.map((link, index) => (
									<li className={scss.links__item} key={index}>
										<a target='_blanck' href={link.url} >{link.value}</a>
										<SVG icon='Cross' onClick={() => removeLink(link)} />
									</li>
								))}
							</ul>
						</div>

						<div className={scss.tags}>
							<p className='admin-form-placeholder'>Добавление тега</p>
							<input type="text" maxLength={60} value={inpTags} onChange={e => setInpTags(e.target.value)} />
							<div className={scss.tags__track}>
								<ul className={scss.tags__list}>
									{inpTags.split(',')?.map((tag, index) => (
										<li className={scss.tags__item} key={index}>{tag}</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className={scss.form__foot}>
						<button type='reset' className='admin-form-reset'>Сбросить</button>
						<button type='submit' className='admin-form-btn'>Отправить</button>
					</div>
				</div>
			</form>
		</div>

	</>);
}

export default PortfolioModal;