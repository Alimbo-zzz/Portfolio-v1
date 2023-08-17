import React, { useEffect, useState } from 'react';
import scss from './styles.module.scss';
import { Header, Footer, Intro, AboutMe, Skills, Portfolio, Reviews, Connection } from './components.js';
import parallax_fix from '@images/parallax_fix.png';
import rockAndRoll from '@images/rock&roll.png';
import rockMusician from '@images/Rock Musician.jpg';
import './styles.scss';
import { GET_all } from '@/api';




const Landing = (events) => {
	const { } = events;


	useEffect(() => {
		GET_all();
	}, [])


	return (<>
		<div id='wrapper' className={scss.wrapper}>
			<header className={scss.header}><Header /></header>
			<main className={scss.main} id="main">
				<section id='intro'><Intro /></section>
				<section id='about-me'>
					<AboutMe />
					<img src={parallax_fix} className='parallax-fix' />
				</section>
				<section id='skills'>
					<img src={rockAndRoll} alt="rock and roll" />
					<Skills />
				</section>
				<section id='portfolio'><Portfolio /></section>
				<div className={scss.combine}>
					<img src={rockMusician} name="combine-bg" />
					<section id='reviews'><Reviews /></section>
					<section id='connection'><Connection /></section>
				</div>
			</main>
			<footer className={scss.footer}><Footer /></footer>
		</div>
	</>);
}

export default Landing;