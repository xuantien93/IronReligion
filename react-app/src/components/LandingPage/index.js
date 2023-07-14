import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import './LandingPage.css'
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const fadingTextElement = document.querySelector('.fading-text');
        const words = ['culture', 'movement', 'gym'];
        let currentIndex = 0;
        if (!user) {
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
        }
    }, [user]);

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

    const toggleCollapse = (event) => {
        let faqContent = event.currentTarget;
        let collapseDiv = faqContent.querySelector(".faq-collapse");
        let xButton = faqContent.querySelector(".x-btn");

        collapseDiv.classList.toggle("collapsed");
        xButton.classList.toggle("rotate-225");
        faqContent.classList.toggle("bounce-animation");
    };

    // const blurDivs = document.querySelectorAll(".blur-load")
    // blurDivs.forEach(div => {
    //     const img = div.querySelector("img")
    //     function loaded() {
    //         div.classList.add("loaded")
    //     }
    //     if (img.complete) {
    //         loaded()
    //     } else {
    //         img.addEventListener("load", loaded)
    //     }
    // })


    return (
        <div className='landing-page-container'>
            <div className='sub-landing-page'>
                <div className='landing-page-intro'>
                    <h1>Join The Iron Elite</h1>
                    <h3>Unleash your potential, redefine your limits, and forge a formidable physique. With an unwavering dedication to excellence, we empower individuals to rise above and beyond, transforming both mind and body.</h3>
                    {user ? <button id="try-us-btn2">Welcome {user.username}</button> : <button id="try-us-btn" onClick={(e) => history.push("/signup")}>Join the <span className="fading-text">culture</span></button>}
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
            <div className='gallery-container'>
                <div className='each-gallery' >
                    <div className='gallery-name'>Outdoor gym</div>

                    <img src="https://i.imgur.com/rDwKpS5.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery'>
                    <div className='gallery-name'>Equipments</div>

                    <img src="https://i.imgur.com/7z6JV9s.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Indoor gym</div>

                    <img src="https://i.imgur.com/st7LZ3X.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Indoor gym</div>

                    <img src="https://i.imgur.com/C7J7zbq.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>PowerLifting Equipments</div>

                    <img src="https://i.imgur.com/9G04UdE.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Private Studio</div>

                    <img src="https://i.imgur.com/EeTcbRU.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Boxing Room</div>

                    <img src="https://i.imgur.com/N9uaI7T.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Patio</div>

                    <img src="https://i.imgur.com/U97x53B.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Locker-room</div>
                    <img src="https://i.imgur.com/Vn2Fp2I.jpg" loading='lazy'></img>
                </div>
                <div className='each-gallery' >
                    <div className='gallery-name'>Towel Service</div>
                    <img src="https://i.imgur.com/OuMwefr.jpg" loading='lazy'></img>
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
                                    <br />
                                    <br />
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
                                    <br />
                                    <br />
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
                                    <li>Month-to-Month - No commitment</li>
                                    <li style={{ fontWeight: "bold" }}>Initiation fees: $100</li>
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
                <div className='frequently-asked-questions'>
                    <h2>Frequently Asked Questions</h2>
                    <div className='frequent-image'>
                        <div className='faq-content-container'>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>How old do I have to be to workout at Iron Religion? </h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span id="first-answer">15 and Over.</span>
                                        <span><span className='bold-words'>-16 and 17 Years Old:</span> Parent or legal guardian needs to sign Liability Waiver, after that is signed, individual can come in on their own every visit thereafter.</span>
                                        <span>*if legal guardian is signing we need proof of guardianship.</span>
                                        <span><span className='bold-words'>-15 Years Old:</span> Parent or legal guardian needs to sign waiver and remain on premises while individual works out.</span>
                                        <span><span className='bold-words'>-14 Years Old and under:</span> Parent or legal guardian needs to sign waiver and remain on premises while individual works out.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>Where do I park?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>Our main lot is located at: 1602 Industrial Dr, Dallas, TX 76107, United States</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>Can I tour the facility?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>You are welcome to tour the facility alongside a sales representative who is more than happy to discuss the different options we have available.</span>
                                        <span>Our sales representatives are available in person from 8am-9pm Monday through Friday, and 8am-6pm Saturdays and
                                            Sundays! If you have any questions please email sales@ironreligion.com for our membership options!</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>Do you guys allow filming in your facility?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>Yes we allow filming! Make sure your filming is courteous to other's space and not blocking any walkways or emergency exits. If you are requiring additional lighting, stands, etc please speak to a manager about setting up an appointment.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>Do you have online waivers I could sign and either email or print out upon arrival?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>Unfortunately no, to insure the validity of the signed liability waiver, we will need a parent/legal guardian to physically sign the liability waiver.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>Could my friend sign the waiver for me if I'm under 18?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>No, it would have to be a parent or legal guardian to sign the liability waiver</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>If I purchase my day pass online, will the time expire after 24 hours?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>If you purchase a single, 3, or 7-day pass online, your time window doesn't start until you come to see us at our front desk! One of our associates will have you build a profile, sign our liability waiver, and appropriate day pass waiver. For 3 and 7-day passes a profile a photo is required and you will receive a key-tag upon purchase that you will use to scan-in at our front desk for each of your visits during your pass.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>How long are the Day Passes good for?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>- Our Single Day Pass is valid for 24 hours after time of purchase, the copy of the receipt is your ticket back for re-entry during that timeframe.</span>
                                        <span>- 3-day pass is valid for 72 hours after purchase. You will receive unlimited access for 72 hours. The profile photo is needed and a key-tag is given upon purchase that you will scan in at our front desk for all your check-ins during your visits. No partial refunds for days not utilized for pass purchase.</span>
                                        <span> *for online purchases your time-stamp doesn't start until you
                                            Finish checking in at our front desk.</span>
                                        <span>- Our new 7-day pass is valid for 168 hours after purchase. You will receive unlimited access for 168 hours. The profile photo is needed and a key-tag is given upon purchase that you will scan in at our front desk for all your check-ins during your visits. No partial refunds for days not utilized for pass purchase</span>
                                        <span>*for online purchases, your time-stamp doesn't start until you finish checking in at our front desk.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>What are your hours?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>24/7</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>How can I cancel my membership?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>We handle cancellations via email! the website cancellation link located at the bottom of the page directly sends a ticket to our inbox! </span>
                                        <span>-You can also email <span className="bold-words">memberships@ironreligion.com</span>if you have any questions regarding your cancellation.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='faq-content' onClick={toggleCollapse} >
                                <div className='faq-title' >
                                    <h3>Can I pose in the Studio?</h3>
                                    <button className='x-btn'>+</button>
                                </div>
                                <div className="faq-collapse" id="faq-collapse">
                                    <div className='line2'></div>
                                    <div className='faq-answers'>
                                        <span>Yes! We require appropriate attire to be worn during posing. If you are posing in bikini, please reserve your spot at the Front Desk with one of our associates.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='faq-images'>
                            <img src="https://i.imgur.com/es3Yui4.jpg"></img>
                            <img src="https://i.imgur.com/SPvnPZA.jpg"></img>
                        </div>
                    </div>
                </div>
                <div id="hours-operation" className='hours-operation'>
                    <div className='address'>
                        <span id="address">Address:</span>
                        <br />
                        <span id="address2"> 1602 Industrial Dr, Dallas, TX 76107, United States </span>
                        <div className='hours-day-time'>
                            Hours: 24/7
                        </div>
                        <span id="address2">Phone: 469-555-3366 </span>
                        <br />
                        <span id="address2">Email: <span id="email2">memberships@ironreligion.com</span></span>
                    </div>
                </div>
                <div className="footer">


                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="python" />


                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="flask" />


                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" />


                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux" />


                    <a href="https://www.instagram.com/muytien/">
                        <img src="https://i.imgur.com/nD6MYTx.jpg" alt="iglink" />
                    </a>


                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="postgresql" />



                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy" />


                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" />



                </div>
                <div className='footer-about'>
                    <span style={{ fontSize: "15px" }}>© 2023 | Muytien LLC | All Rights Reserved</span>
                    <br />
                    <span style={{ fontWeight: "bold" }}>UNLEASH YOUR POTENTIAL | EMBRACE AMBITION | DEFINE SUCCESS</span>
                    <br />
                    <span>PRIVACY POLICY | TERMS OF SERVICE | CCPA</span>
                </div>
            </div>
        </div >

    )
}

export default LandingPage
