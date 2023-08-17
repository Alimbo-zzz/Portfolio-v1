import React, { useState, useEffect } from 'react';
import scss from './style.module.scss';
import { SVG } from '@UI';
import { useMediaQuery } from 'react-responsive'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';




const Review = ({ data }) => {
	const { avatar, name, job, review } = data;

	return (<>
		<div className={scss.review}>
			<SVG icon='Quote' className={scss.review__decor} />
			<p className={scss.review__text}>{review}</p>
			<img src={avatar} className={scss.review__avatar} />
			<div className={scss.review__info}>
				<div className={scss.review__name}>{name}</div>
				<div className={scss.review__job}>{job}</div>
			</div>
		</div>
	</>)
}



const Reviews = (events) => {
	const { } = events;
	const { t } = useTranslation();
	const { language: lang } = useTranslation().i18n;
	const lng = t('secReviews', { returnObjects: true });
	const [swiper, setSwiper] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
	const reviewsData = useSelector(state => state.reviews.data);


	return (<>
		<div className={scss.wrap}>
			<div className="container">
				<div className={scss.head}>
					<h3 className='title'>{lng.title}</h3>
					<div className={scss.controllers}>
						<button
							className={scss.arrow}
							data-arrow='prev'
							onClick={() => swiper?.slidePrev()}
							disabled={swiper?.isBeginning}
						>
							<SVG icon='Short Arrow' />
						</button>
						<button
							className={scss.arrow}
							data-arrow='next'
							onClick={() => swiper?.slideNext()}
							disabled={activeIndex >= (reviewsData[lang].length - 1)}
						>
							<SVG icon='Short Arrow' />
						</button>
					</div>
				</div>
				<div className={scss.slider}>
					<Swiper
						slidesPerView={isTablet ? 1 : 2}
						slidesPerGroup={isTablet ? 1 : 2}
						spaceBetween={40}
						onSwiper={setSwiper}
						onSlideChange={e => setActiveIndex(e.activeIndex)}
					>
						{reviewsData[lang].map((el, i) => (
							<SwiperSlide key={i}>
								<Review data={el} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	</>);
}

export default Reviews;