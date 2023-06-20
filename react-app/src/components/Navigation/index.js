import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='top-container'>
			<div className='logo-and-name' >
				<div className='ironreligion-logo'>
					<NavLink exact to="/"><img id="ironreligionimage" src="https://i.imgur.com/hL3YORh.png" alt='page logo'></img></NavLink>
				</div>
			</div>
			{isLoaded && (
				<div className='topright-nav'>
					{sessionUser &&
						<NavLink to="/routines" className="topright-nav-create-text">
							<button id="dumbell-button" title="Routines"><i className="fa-solid fa-dumbbell"></i></button>
						</NavLink>}
					<NavLink to="/classes">Classes</NavLink>
					<NavLink to="/bookings">My bookings</NavLink>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>

	);
}

export default Navigation;
