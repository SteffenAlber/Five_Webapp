import React, { useState, useEffect } from "react";
import Navigation from '../layout/Navigation';
import "./ProfileB2C.css";
import { doGetRequest } from "../../backendInterface/BackendInterface";
import DRKLogo from "../../images/DRKLogo.png"; 

const ProfileB2B = () => {
    const [organization, setOrganizationData] = useState(null); 
    const [useMock, setUseMock] = useState(false);

    const organizationMock = {
        organizationName: "Deutsches Rotes Kreuz Stuttgart",
        street: "Am Helioshof 3",
        zipCode: "70176",
        city: "Stuttgart",
        phoneNumber: "+49 711 123456",
        mailAddress: "kontakt@drk-stuttgart.de",
      };

    useEffect(() => {
        const storedOrganizationID = localStorage.getItem("organizationID");
        console.log("Org ID :", storedOrganizationID);

        const fetchOrganizationData = async () => {
            try {
                console.log("Fetching organization data for ID:", storedOrganizationID);
                const response = await doGetRequest(`/organizations/${storedOrganizationID}`);
                console.log("Fetched organization Response:", response.data);
                setOrganizationData(response.data);
            } catch (error) {
                console.error("Error fetching organization:", error);
                setOrganizationData(organizationMock);
                setUseMock(true); 
            }
        };

        if (storedOrganizationID) {
            fetchOrganizationData();
        } else {
            console.warn("No organizationID found in localStorage. Using mock data.");
            setOrganizationData(organizationMock);
            setUseMock(true);
        }
    }, []);

    // Handler to toggle between live data and mock data
    const handleToggle = () => {
        if (useMock) {
            // Attempt to refetch live data
            const storedOrganizationID = localStorage.getItem("organizationID");
            const fetchOrganizationData = async () => {
                try {
                    const response = await doGetRequest(`/organizations/${storedOrganizationID}`);
                    setOrganizationData(response.data);
                    setUseMock(false); // Switch to live data
                } catch (error) {
                    console.error("Error fetching organization:", error);
                    // Keep using mock data
                }
            };
            fetchOrganizationData();
        } else {
            // Switch to mock data
            setOrganizationData(organizationMock);
            setUseMock(true);
        }
    };

    // If organization data is not yet loaded, show a loading state
    if (!organization) {
        return (
            <div>
                <Navigation />
                <div className="profile-container">
                    <header className="header">
                        <h1>Organisationsprofile</h1>
                        <div className="header-underline"></div>
                    </header>
                    <div className="profile-content">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navigation />
            <div className="profile-container">
                <header className="header">
                    <h1>Organisationsprofil</h1>
                    <div className="header-underline"></div>
                </header>

                <div className="profile-content">
                    <div className="profile-info">
                        {/* Display organization data */}
                        <div className="info-item">
                            <span className="label">Organisation</span>
                            <div className="line"></div>
                            <span className="value">{organization.organizationName}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Standort</span>
                            <div className="line"></div>
                            <span className="value">
                                {organization.street} {organization.zipCode}, {organization.city}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="label">Telefon</span>
                            <div className="line"></div>
                            <span className="value">{organization.phoneNumber}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email</span>
                            <div className="line"></div>
                            <span className="value">{organization.mailAddress}</span>
                        </div>
                    </div>
                    <div className="profile-picture">
                        <img
                            src={DRKLogo}
                            alt="DRK Stuttgart Logo"
                            className="organization-logo"
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button className="primaryButton">Bearbeiten</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileB2B;
