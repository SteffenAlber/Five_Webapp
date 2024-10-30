import React, { useState, useEffect } from "react";
import Navigation from '../layout/Navigation';
import "./ProfileB2C.css";
import TimeSelectionGrid from "../B2C/TimeSelectionGrid";
import { doGetRequest, doPostRequest } from "../../backendInterface/BackendInterface";


const ProfileB2C = () => {
    //user state
    const [user, setUserData] = useState("");
    // State for interests and characteristics
    const [activeInterests, setActiveInterests] = useState([]);
    const [activeCharacteristics, setActiveCharacteristics] = useState([]);
    const [availability, setAvailability] = useState({
        Mo: [],
        Di: [],
        Mi: [],
        Do: [],
        Fr: [],
        Sa: [],
        So: []
    });


    // Define your interests and characteristics
    const interestsList = [
        "Soziale Arbeit und Unterstützung",
        "Kunst und Kultur",
        "Sport und Freizeit",
        "Katastrophen und Notfalldienste",
        "Bildung und Nachhilfe",
        "Gesundheit und Pflege",
        "Gemeinde- und Stadtentwicklung",
        "Umwelt- und Naturschutz",
    ];

    const characteristicsList = [
        "Notenfinger",
        "Mitsummer",
        "Spielstratege",
        "Grenzenreißer",
        "Kraftpaket",
        "Sportskanone",
        "Unterdiearmegreifer",
        "Computerfuzzi",
        "Gartenzwerg",
        "Frischeluftschnapper",
        "Naturliebhaber",
        "Labertasche",
        "Wortkünstler",
        "Stoffbändiger",
        "Hochstapler",
        "Muttersönchen",
        "Drahteselbändiger",
        "Genussoptimierer",
        "Kochlöffelschwinger",
        "Tütenschlepper",
        "Scheinwerfer",
        "Frohnatur",
        "Walkietalkie",
        "Rennfahrer",
        "Wellenschläger",
        "Granniesitter",
        "Mitfühler",
        "Mundaufmacher",
        "Schulterklopfer",
        "Lageüberplicker",
        "Chaosüberblicker",
    ];

    useEffect(() => {
        const storedInterests = JSON.parse(localStorage.getItem("profileInterests")) || [];
        const storedCharacteristics = JSON.parse(localStorage.getItem("profileCharacteristics")) || [];
        let storedAvailability = JSON.parse(localStorage.getItem("availability")) || {
            Mo: [],
            Di: [],
            Mi: [],
            Do: [],
            Fr: [],
            Sa: [],
            So: []
        };

        setActiveInterests(storedInterests);
        setActiveCharacteristics(storedCharacteristics);
        setAvailability(storedAvailability);

        const storedUserID = localStorage.getItem("userID");

        const fetchUserData = async () => {
            try {
                const response = await doGetRequest(`/users/${storedUserID}`);
                console.log("Fetched Engagements Response:", response); // Log entire response
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchUserData();
    }, []);


    // Handler to toggle interests
    const toggleInterest = (interest) => {
        setActiveInterests((prevInterests) => {
            let updatedInterests;
            if (prevInterests.includes(interest)) {
                updatedInterests = prevInterests.filter((i) => i !== interest);
            } else {
                updatedInterests = [...prevInterests, interest];
            }
            localStorage.setItem("profileInterests", JSON.stringify(updatedInterests));
            return updatedInterests;
        });
    };

    // Handler to toggle characteristics
    const toggleCharacteristic = (characteristic) => {
        setActiveCharacteristics((prevCharacteristics) => {
            let updatedCharacteristics;
            if (prevCharacteristics.includes(characteristic)) {
                updatedCharacteristics = prevCharacteristics.filter((c) => c !== characteristic);
            } else {
                updatedCharacteristics = [...prevCharacteristics, characteristic];
            }
            localStorage.setItem("profileCharacteristics", JSON.stringify(updatedCharacteristics));
            return updatedCharacteristics;
        });
    };

    return (
        <div>
            <Navigation />
            <div className="profile-container">
                <header className="header">
                    <h1>Benutzerprofil</h1>
                    <div className="header-underline"></div>
                </header>

                <div className="profile-content">
                    <div className="profile-info">

                        <h2>Über Dich </h2>
                        {/* TODO: values aus DB ziehen */}

                        <div className="info-item">
                            <span className="label">Benutzername</span>
                            <div className="line"></div>
                            <span className="value">{user.username}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Vorname, Name</span>
                            <div className="line"></div>
                            <span className="value">{user.firstName} {user.lastName}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Alter</span>
                            <div className="line"></div>
                            <span className="value">23 Jahre</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Stadt</span>
                            <div className="line"></div>
                            <span className="value">Reutlingen</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email</span>
                            <div className="line"></div>
                            <span className="value">{user.mailAddress}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Passwort</span>
                            <div className="line"></div>
                            <span className="value">************</span>
                        </div>
                        {/* Button container */}
                        <div className="button-container">
                            <button className="primaryButton">Bearbeiten</button>
                        </div>
                    </div>

                </div>


                {/* Interessen und Charakteristika Section */}
                <section className="interests-section">
                    <h2>Interessen und Charakteristika</h2>
                    <div className="selection-container">
                        <div className="selection-group">
                            <h3>Interessen</h3>
                            <div className="tags-container">
                                {interestsList.map((interest, index) => (
                                    <button
                                        key={index}
                                        className={`tagInterest ${activeInterests.includes(interest) ? "active" : ""}`}
                                        onClick={() => toggleInterest(interest)}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="selection-group">
                            <h3>Charakteristika</h3>
                            <div className="tags-container">
                                {characteristicsList.map((characteristic, index) => (
                                    <button
                                        key={index}
                                        className={`tagInterest ${activeCharacteristics.includes(characteristic) ? "active" : ""}`}
                                        onClick={() => toggleCharacteristic(characteristic)}
                                    >
                                        {characteristic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Verfügbarkeit Section */}
                <section className="availability-section">
                    <h2>Verfügbarkeit</h2>
                    <TimeSelectionGrid
                        availability={availability}
                        setAvailability={(newAvailability) => {
                            setAvailability(newAvailability);
                            localStorage.setItem("availability", JSON.stringify(newAvailability));
                        }}
                    />
                </section>
            </div>
        </div>
    );

};

export default ProfileB2C;
