import React from 'react';
import "./Footer.css";
import { fa7, faBold } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-column">
                    <h3>Services</h3>
                    <ul>
                        <li>Freiwilligenangebote</li>
                        <li>Veranstaltungsorganisation</li>
                        <li>Schulungen und Workshops</li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>About</h3>
                    <ul>
                        <li>Mission und Vision</li>
                        <li>Unser Team</li>
                        <li>Partnerorganisationen</li>
                        <li>Erfolgsgeschichten</li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li>Datenschutz</li>
                        <li>Nutzungsbedingungen</li>
                        <li>Impressum</li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Information</h3>
                    <ul>
                        <li>Über uns</li>
                        <li>FAQs</li>
                        <li>Blog</li>
                        <li>Presse</li>
                    </ul>
                </div>
            </div>
            <p class="footer-copyright">© 2024 Four+One</p>
        </footer>
    );
}

export default Footer