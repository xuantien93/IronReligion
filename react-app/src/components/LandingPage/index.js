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

    useEffect(() => {
        const ambitionSection = document.querySelector('.ambition-section');

        const handleScroll = () => {
            const scrollPosition = window.innerHeight * 0.8;

            // Check if the ambition-section is in the viewport
            if (ambitionSection.getBoundingClientRect().top < scrollPosition) {
                ambitionSection.classList.add('show');
            } else {
                ambitionSection.classList.remove('show');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        const sloganSection = document.querySelector('.slogan-section');
        const sloganWords = sloganSection.querySelectorAll('h2, p');

        const handleScroll = () => {
            const scrollPosition = window.innerHeight * 0.8;

            // Check if the slogan-section is in the viewport
            if (sloganSection.getBoundingClientRect().top < scrollPosition) {
                sloganSection.classList.add('show');
            } else {
                sloganSection.classList.remove('show');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='landing-page-container'>
            <div className='sub-landing-page'>
                <div className='landing-page-intro'>
                    <h1>Join The Iron Elite</h1>
                    <h3>Unleash your potential, redefine your limits, and sculpt the body of a warrior. With an unwavering dedication to excellence, we empower individuals to rise above and beyond, transforming both mind and body.</h3>
                    <button id="try-us-btn" onClick={(e) => history.push("/signup")}>Join the <span className="fading-text">culture</span></button>
                </div>
            </div>
            <div className='ambition-section-cover'>
                <div className='ambition-section'>
                    <h2>THE FORGE OF TRANSFORMATION</h2>
                    <p>Ignite the fire within, stoke the flames of change, and sculpt your physique to embody raw power. Our iron sanctuary provides the tools, the guidance, and the inspiration to craft your own destiny.</p>
                </div>
            </div>
            <div className='join-the-movement-cover'>
                <div className='join-the-movement-section'>
                    <h3>Join The Movement</h3>
                    <p>Become part of a community that shares your unwavering dedication, passion, and commitment. Together, we forge the path to greatness, supporting each other on this transformative journey. In the Iron Religion, we are bound by iron and united in purpose.</p>
                </div>
                <div className='slogan-section'>
                    <h2>RISE REDEFINE REIGN</h2>
                    <p>Dare to defy the ordinary.</p>
                </div>
            </div>
            <div className='pay-package-container'>
                <div className='pay-package'>
                    <h3>Packages</h3>
                </div>

                <div className='cards'>
                    <div className='card'>
                        <div className='day-pass'>
                            <h2>1 Day</h2>
                            <span>pass</span>
                            <div className='line'></div>
                            <h1 className='price'>
                                <span className='price-sign'>$ </span>
                                30
                            </h1>
                            <div className='detail-price-container'>
                                <ul>
                                    <li>Valid 24 hours</li>
                                    <li>Receipt needed for re-entry</li>
                                    <li>Online purchases time-stamp starts at front desk</li>
                                </ul>
                            </div>
                            <div className='line'></div>
                            <div className='shop-now-btn'>
                                <button onClick={() => alert("Feature Coming Soon")}>SHOP NOW</button>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='day-pass'>
                            <h2>7 Day</h2>
                            <span>punch card</span>
                            <div className='line'></div>
                            <h1 className='price'>
                                <span className='price-sign'>$ </span>
                                90
                            </h1>
                            <div className='detail-price-container'>
                                <ul>
                                    <li>Valid 24 hours</li>
                                    <li>Must show punch card for re-entry</li>
                                    <li>Online purchases time-stamp starts at front desk</li>
                                </ul>
                            </div>
                            <div className='line'></div>
                            <div className='shop-now-btn'>
                                <button onClick={() => alert("Feature Coming Soon")}>SHOP NOW</button>
                            </div>
                        </div>
                    </div>


                    <div className='card'>
                        <div className='day-pass'>
                            <h2>1 Month</h2>
                            <span>pass</span>
                            <div className='line'></div>
                            <h1 className='price'>
                                <span className='price-sign'>$ </span>
                                65
                            </h1>
                            <div className='detail-price-container'>
                                <ul>
                                    <li>Valid 24 hours</li>
                                    <li>Must show punch card for re-entry</li>
                                    <li>Online purchases time-stamp starts at front desk</li>
                                </ul>
                            </div>
                            <div className='line'></div>
                            <div className='shop-now-btn'>
                                <button onClick={() => alert("Feature Coming Soon")}>SHOP NOW</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='bottom-background'>
                <div className='hours-operation'>
                    <div className='address'>
                        Address: 1602 Industrial Dr, Dallas, TX 76107, United States
                        <div className='hours-day-time'>
                            Hours: 24/7
                        </div>
                    </div>
                </div>
                <div className='frequently-asked-questions'>
                    <h2>Frequently Asked Questions</h2>
                </div>
            </div>
        </div>

    )
}

export default LandingPage
