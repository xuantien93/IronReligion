import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

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
						<NavLink to="/routines" className="topright-nav-create-text">Exercises</NavLink>
						<NavLink to="/" className="topright-nav-create-text">Apparel</NavLink>
						<NavLink to="/" className="topright-nav-create-text">Contact</NavLink>
						{isLoaded && (
							<div className='topright-nav'>
								<ProfileButton user={sessionUser} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>

	);
}

export default Navigation;
