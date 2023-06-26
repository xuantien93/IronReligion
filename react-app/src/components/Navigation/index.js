import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	function scrollToSection(event, sectionId) {
		event.preventDefault();

		const targetElement = document.getElementById(sectionId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}

		if (window.location.pathname !== '/') {
			history.push(`/?section=${sectionId}`);
		}
	}

	return (
		<div className='nav-container'>
			<div className='top-container'>
				<div className='logo-and-name' >
					<div className='ironreligion-logo'>
						<NavLink exact to="/"><img id="ironreligionimage" src="https://i.imgur.com/hL3YORh.png" alt='page logo'></img></NavLink>
					</div>
				</div>
				<div className='menu-links-container'>
					<div className='menu-links'>
						<NavLink to="/trainers">Coaches</NavLink>
						<NavLink to="/classes">Classes</NavLink>
						<NavLink to="/routines" >Exercises</NavLink>
						<a href="/" onClick={(e) => { e.preventDefault(); alert("Feature Coming Soon"); }}>Apparel</a>
						<a href="/" onClick={(event) => scrollToSection(event, 'hours-operation')}>
							Contact
						</a>
						{isLoaded && (
							<div className='topright-nav'>
								<ProfileButton user={sessionUser} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div >

	);
}

export default Navigation;
