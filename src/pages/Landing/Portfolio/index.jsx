import React, { useState, useRef, useEffect } from 'react';
import scss from './style.module.scss';
import { SVG } from '@UI';
import imgPreview from '@images/portfolio/1.jpg';
import { useMediaQuery } from 'react-responsive';
import { useGallery } from '@hooks';

const images_portfolio = import.meta.globEager('@images/**/*');

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './slider-styles.scss';

import { FreeMode, Navigation, Thumbs } from "swiper";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const Portfolio = (events) => {
	const { } = events;
	const { t } = useTranslation();
	const { language: lang } = useTranslation().i18n;
	const lng = t('secPortfolio', { returnObjects: true });
	const [swiper, setSwiper] = useState(null);
	const [swiper2, setSwiper2] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
	const portfolioData = useSelector(state => state.portfolio.data);



	return (<>
		<div className={scss.wrap}>
			<div className={`container`}>
				<h3 className='title' data-name='title'>{lng.title}</h3>
				{
					portfolioData[lang].length && (
						<div className={scss.slider}>
							<div className={scss.sliderPreview}>
								<Swiper
									onSwiper={setSwiper2}
									className={scss.sliderSlides}
									onSlideChange={e => setActiveIndex(e.activeIndex)}
									thumbs={{ swiper: swiper }}
									modules={[FreeMode, Navigation, Thumbs]}
								>
									{portfolioData[lang].map((slide, i) => (
										<SwiperSlide key={i}>	<img src={slide.image} /> </SwiperSlide>
									))}
								</Swiper>
								<div className={scss.sliderIndex}>{activeIndex + 1}</div>
								<div className={scss.sliderPagination}>
									<Swiper
										className={scss.sliderSlides}
										data-slider="pagination"
										data-slides={portfolioData[lang].length}
										onSwiper={setSwiper}
										slidesPerView={isTablet ? 3 : 4}
										modules={[FreeMode, Navigation, Thumbs]}
									>
										{portfolioData[lang].map((slide, i) => (
											<SwiperSlide key={i}>	<img src={slide.image} /> </SwiperSlide>
										))}
									</Swiper>
									<div className={scss.sliderControllers}>
										<button
											className={scss.sliderArrow}
											data-arrow="next"
											onClick={e => swiper2.slideNext()}
											disabled={swiper2?.isEnd}
										>
											<SVG icon='Short Arrow' />
										</button>
										<button
											className={scss.sliderArrow}
											data-arrow="prev"
											onClick={e => swiper2.slidePrev()}
											disabled={swiper2?.isBeginning}
										>
											<SVG icon='Short Arrow' />
										</button>
									</div>
								</div>
							</div>
							<div className={scss.sliderInfo}>
								<div className={scss.sliderInfo__cont}>
									<ul className={scss.sliderInfo__tags}>
										{portfolioData[lang][activeIndex].tags.map((tag, i) => (
											<li key={i} className={scss.sliderInfo__tag}>{tag}</li>
										))}
									</ul>
									<h4 className='title' data-name="title">{portfolioData[lang][activeIndex].title}</h4>
									<p className="text" data-name="text" data-no-links={portfolioData[lang][activeIndex].links.length === 0}>{portfolioData[lang][activeIndex].description}</p>
									<div className={scss.sliderInfo__links}>
										{portfolioData[lang][activeIndex].links.map(({ url, value }, i) => (
											<a key={i} href={url} className={scss.sliderInfo__link}>
												<SVG icon='Link' />	{value}
											</a>
										))}
									</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	</>);
}

export default Portfolio;