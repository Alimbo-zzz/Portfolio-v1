import React, { useEffect, useState } from 'react';
import scss from './style.module.scss';
import {useTranslation} from 'react-i18next';
import svg_ru from '@images/ru.svg';
import svg_en from '@images/en.svg';

const LanguageSelect = (props) => {
	const {i18n} = useTranslation();
	const [language, setLanguage] = useState(i18n.language);
	const [selectIsOpen, setSelectIsOpen] = useState(false);


	useEffect(()=>{
		i18n.changeLanguage(language);
		setSelectIsOpen(false);
		const closeSelect = () => setSelectIsOpen(false);

		document.addEventListener('click', closeSelect)

		return ()=>{			
			document.removeEventListener('click', closeSelect)
		}
	},[language])

	

	return (<>
		<div className={scss.selectLanguage} data-open={selectIsOpen} onClick={e => e.stopPropagation()}>
			<div 
				className={scss.selectLanguage__preview} 
				onClick={e => setSelectIsOpen(prev => !prev)}>
				{language} <img src={language === 'en'? svg_en : svg_ru} /> 
			</div>
			<div className={scss.selectLanguage__btns}>
				<button 
					className={scss.languageBtn} 
					data-active={language === 'ru'} 
					onClick={e => setLanguage('ru')}
				>
					ru <img src={svg_ru}/>
				</button>
				<button 
					className={scss.languageBtn} 
					data-active={language === 'en'} 
					onClick={e => setLanguage('en')}
				>
					en <img src={svg_en}/>
				</button>
			</div>
		</div>
	</>);
}

export default LanguageSelect;