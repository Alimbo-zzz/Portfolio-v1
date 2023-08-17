import React from 'react';
import scss from './style.module.scss';
import { SVG } from '@UI';
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import parallax from '@images/Rock Fest.png';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '@/components';
import { useSelector } from 'react-redux';

const Intro = (events) => {
	const { } = events;
	const { t, i18n } = useTranslation();
	const userData = useSelector(state => state.user.data);
	const { language: lang } = useTranslation().i18n;
	const lng_skroll = t('btns.skroll', { returnObjects: true });



	return (<>
		<div className={scss.wrap}>
			<MouseParallaxContainer
				globalFactorX={0.3}
				globalFactorY={0.3}
				className={scss.parallax}
				resetOnLeave
			>
				<MouseParallaxChild factorX={0.1} factorY={0.1} className={scss.parallax__bg}>
					<div className={scss.parallax__img}><img src={parallax} /></div>
				</MouseParallaxChild>
				<div className={`container ${scss.container}`}>
					<div className={`${scss.intro}`}>
						<MouseParallaxChild factorX={0.3} factorY={0.5}>
							<h1 className={`title ${scss.title}`}>{userData[lang].username}</h1>
						</MouseParallaxChild>
						<div className={scss.language}> <LanguageSelect /> </div>
						<a href="#about-me-content" className={scss.scroll}>{lng_skroll} <SVG icon="Scroll" /></a>
					</div>
				</div>
			</MouseParallaxContainer>
		</div>
	</>);
}

export default Intro;