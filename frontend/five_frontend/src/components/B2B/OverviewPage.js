import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../layout/Layout';
import "../../styles/OverviewB2B.css";
import paper_icon from "../../images/paper_icon.png";
import head_icon from "../../images/head_questionmark_icon.png";
import support_icon from "../../images/support_icon.png";

const OverviewPage = () => {
    let navigate = useNavigate();

    const navigateToLogin = () => {
        const path = `/b2b/login`;
        navigate(path);
    };

    const navigateToRegister = () => {
        const path = `/b2b/register`;
        navigate(path);
    };

    return (
        <Layout>
            <div className="social-organization-page">
                <div className="container">
                    <h1>Soziale Organisation?</h1>
                    <p>Du möchtest deine soziale Organisation bei Four+One anmelden? Na dann bist du hier genau richtig! Werde ein Teil der Familie und erhalte Unterstützung. Biete dein Angebot ratz fatz an ohne Schwierigkeiten! Und hast du doch Probleme, dann rufe unsere Beratungsnummer an. Na, haben wir euch überzeugt?</p>
                    <div className="button-container">
                        <button onClick={navigateToLogin} className="primaryButton">Login</button>
                        <button onClick={navigateToRegister} className="secondaryButton">Neu dabei? Registrieren!</button>
                    </div>
                    <h2>Eure Benefits</h2>
                    <div className="benefits">
                        <div className="benefit">
                            <div className="benefit-icon">
                                <img src={paper_icon} alt="paper icon" />
                            </div>
                            <div className="benefit-content">
                                <div className="benefit-title">Keine Papierkram mehr</div>
                                <div className="benefit-subtext">Krieg die wichtigsten Daten über deinen Freiwilligen bequem hier zugesandt</div>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-icon">
                                <img src={support_icon} alt="support icon" />
                            </div>
                            <div className="benefit-content">
                                <div className="benefit-title">Support 24/7</div>
                                <div className="benefit-subtext">Keine Ahnung von Technik? Wir schon! Ruf jederzeit an und wir helfen euch.</div>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-icon">
                                <img src={head_icon} alt="head icon" />
                            </div>
                            <div className="benefit-content">
                                <div className="benefit-title">Engagierte Freiwillige</div>
                                <div className="benefit-subtext">Durch das anonyme Feedback können wir bereits schon feststellen wer zu euch passt. Keine unangenehmen Überraschungen mehr.</div>
                            </div>
                        </div>
                    </div>
                    <div className="cta">
                        <p>Noch nicht überzeugt? Macht nichts! Schnupper einfach rein.</p>
                        <button onClick={navigateToRegister} className="primaryButton">Get started</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OverviewPage;