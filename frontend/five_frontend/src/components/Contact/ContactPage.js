import React from 'react';
import "../../styles/Contact.css";
import instaIcon from '../../images/Instagram_icon_png.png'
import "../layout/Layout";
import Layout from '../layout/Layout';

const ContactPage = () => {
    return (
        <Layout>
            <div className="contact">
                {/* <header className="contact__header">
                    <div className="contact__container">
                        <h1 className="contact__title">Contact Us</h1>
                    </div>
                </header> */}

                <div className="contact__container">
                    <div className="contact__form-container">
                        <h2 className="contact__subtitle">Sende uns eine Nachricht</h2>
                        <form className="contact__form">
                            <div className="contact__form-group">
                                <label className="contact__label" htmlFor="name">Name:</label>
                                <input className="input" type="text" id="name" name="name" />
                            </div>
                            <div className="contact__form-group">
                                <label className="contact__label" htmlFor="subject">Email:</label>
                                <input className="input" type="text" id="email" name="email" required />
                            </div>
                            <div className="contact__form-group">
                                <label className="contact__label" htmlFor="message">Nachricht:</label>
                                <textarea className="contact__textarea" id="message" name="message" required></textarea>
                            </div>
                            <button className="primaryButton" type="submit">Nachricht absenden</button>
                        </form>
                    </div>

                    <div className="contact__info">
                        <h2 className="contact__subtitle">Kontaktinformationen</h2>
                        <p className="textbold">Falls du uns lieber direkt kontaktieren möchtest:</p>
                        <p>Email: Platzhalter@platzhalter.com</p>
                        <div className="insta">
                            <img src={instaIcon} alt="insta icon" className="icon-img" />
                            <a className='links' href="https://www.instagram.com/_four_plus_one_/">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default ContactPage;