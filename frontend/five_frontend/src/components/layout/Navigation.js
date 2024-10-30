import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "./Navigation.css";
import profilepic_placeholder from "../../images/profilepic_placeholder.png";
import fourPlusOneLogo from "../../images/fpo_schwarz_weiss (1).svg";

const profilePic = "";

const Navigation = ({ pages }) => {
    const [isB2B, setIsB2B] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    let navigate = useNavigate();
    let location = useLocation();

    const navigateToLogin = () => {
        let path = isB2B ? `/b2b/login` : `/b2c/login`;
        navigate(path);
    };

    useEffect(() => {
        const isB2BPath = window.location.pathname.startsWith("/b2b");
        setIsB2B(isB2BPath);

        const storedOrganizationID = localStorage.getItem("organizationID")
        const storedUserID = localStorage.getItem("userID")
        if (storedOrganizationID || storedUserID) {
            setLoginStatus(true);
        }

        // Set active tab based on current path
        setActiveTab(location.pathname);
    }, [location]);

    const currentPage = pages;

    const getLinkClass = (path) => {
        return activeTab === path ? "nav-link active" : "nav-link";
    };

    if (currentPage === "homepage") {
        return (
            <div>
                <nav className="navbar">
                    <div className="logo">
                        <a href="/"><img src={fourPlusOneLogo} alt="Four+One Logo" className="logo-img" /></a>
                        <span>Four+One</span>
                    </div>
                    <div className="nav-links">
                        <a href="/" className={getLinkClass('/')}>Home</a>
                        <a href={isB2B ? "/b2b/dashboard" : "/b2c/angebote"} className={getLinkClass(isB2B ? '/b2b/dashboard' : '/b2c/angebote')}>{isB2B ? "Dashboard" : "Angebote"}</a>
                        <a href="/b2b/organisationen" className={getLinkClass('/b2b/organisationen')}>Für Unternehmen</a>
                        <a href="/contact" className={getLinkClass('/contact')}>Contact</a>
                    </div>
                    <div className="profile">
                        <button onClick={navigateToLogin} className="primaryButton">Get started</button>
                    </div>
                </nav>
            </div>
        );
    }

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <a href="/"><img src={fourPlusOneLogo} alt="Four+One Logo" className="logo-img" /></a>
                    <span>Four+One</span>
                </div>
                <div className="nav-links">
                    <a href="/" className={getLinkClass('/')}>Home</a>
                    <a href={isB2B ? "/b2b/dashboard" : "/b2c/angebote"} className={getLinkClass(isB2B ? '/b2b/dashboard' : '/b2c/angebote')}>{isB2B ? "Dashboard" : "Angebote"}</a>
                    {isB2B ? null : <a href="/b2c/zeitspende" className={getLinkClass('/b2c/zeitspende')}>Dashboard</a>}
                    <a href={isB2B ? "/b2b/postfach" : "/b2c/postfach"} className={getLinkClass(isB2B ? '/b2b/postfach' : '/b2c/postfach')}>Postfach</a>
                </div>
                <div className="profile">
                    <a href={isB2B ? "/b2b/profile" : "/b2c/profile"}>
                        <img src={profilePic ? profilePic : profilepic_placeholder} alt="profile pic" className="profile-img" />
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;