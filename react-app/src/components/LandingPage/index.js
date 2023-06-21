import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import './LandingPage.css'
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory()

    useEffect(() => {
        const fadingTextElement = document.querySelector('.fading-text');
        const words = ['culture', 'movement', 'gym'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            fadingTextElement.classList.remove('show-gym', 'show-movement');
            fadingTextElement.classList.add('fade-to-movement');
            setTimeout(() => showNextWord(fadingTextElement), 500);
        }, 3000);

        const showNextWord = (element) => {
            const nextWord = words[currentIndex];
            element.textContent = nextWord;
            element.classList.remove('fade-to-movement');
            element.classList.add(`show-${nextWord}`);
            currentIndex = (currentIndex + 1) % words.length;
        };

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='landing-page-container'>
            <div className='sub-landing-page'>
                <div className='landing-page-intro'>
                    <h1>Join The Iron Elite</h1>
                    <h3>Unleash your potential, redefine your limits, and sculpt the body of a warrior. With an unwavering dedication to excellence, we empower individuals to rise above and beyond, transforming both mind and body.</h3>
                    <button id="try-us-btn" onClick={() => history.push("/signup")}>Join the <span className="fading-text">culture</span></button>
                </div>
                <div className='ambition-section'>
                    <h2>THE FORGE OF TRANSFORMATION</h2>
                    <p>Ignite the fire within, stoke the flames of change, and sculpt your physique to embody raw power. Our iron sanctuary provides the tools, the guidance, and the inspiration to craft your own destiny.</p>
                </div>
            </div>
            <div className='join-the-moment-section'>
                <h3>Join The Movement</h3>
                <p>Become part of a community that shares your unwavering dedication, passion, and commitment. Together, we forge the path to greatness, supporting each other on this transformative journey. In the Iron Religion, we are bound by iron and united in purpose.</p>
            </div>
            <div className='slogan-section'>
                <h2>RISE. REDEFINE. REIGN.</h2>
                <p>Dare to defy the ordinary and become an icon of strength in the Iron Religion.</p>
            </div>
            <div className='address'>
                Address: 1602 Industrial Dr, Dallas, TX 76107, United States
            </div>
            <div className='hours-operation'>
                <div className='hours-day-time'>
                    Hours: 24/7
                </div>
            </div>
            <div className='pay-package'>
                <h3>Packages</h3>
            </div>
            <div className='frequently-asked-questions'>
                <h2>Frequently Asked Questions</h2>
            </div>
        </div>

    )
}

export default LandingPage
