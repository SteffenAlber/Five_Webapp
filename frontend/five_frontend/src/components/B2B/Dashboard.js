import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Engagements.css";
import Navbar from "../layout/Layout";
import { doGetRequest } from "../../backendInterface/BackendInterface";

const Dashboard = () => {
  const [engagements, setEngagements] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchEngagements = async () => {
      try {
        const response = await doGetRequest("/engagements/");
        console.log("Fetched Engagements Response:", response); // Log entire response
        console.log("Engagements Data:", response.data.engagements); // Log engagements array
        setEngagements(response.data.engagements);
      } catch (error) {
        console.error("Error fetching engagements:", error);
        setError("Failed to load engagements. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEngagements();
  }, []);

  const renderEngagement = (engagement) => {
    // Safely access nested properties using optional chaining
    const organizerName = engagement.organizer?.organizationName || "Unbekannter Organisator";
    const street = engagement.location?.street || "Straße fehlt";
    const number = engagement.location?.number || "";
    const city = engagement.location?.city || "Stadt fehlt";
    const zipCode = engagement.location?.zipCode || "PLZ fehlt";
    const slotsTaken = engagement.volunteers?.acceptedVolunteers?.length || 0;
    const totalSlots = engagement.volunteers?.numberOfVolunteers || 0;

    // Extract date and time from startTime and endTime
    const startDate = engagement.startTime
      ? new Date(engagement.startTime).toLocaleDateString("de-DE")
      : "Datum fehlt";
    const startTime = engagement.startTime
      ? new Date(engagement.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : "Startzeit fehlt";
    const endTime = engagement.endTime
      ? new Date(engagement.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : "Endzeit fehlt";

    return (
      <Link key={engagement.id} to={`/b2b/engagement/${engagement.id}`}>
        <div className="engagement-card">
          <div className="engagement-header">
            <h3>{engagement.title || "Titel fehlt"}</h3>
            <div className="engagement-date-time">
              <p>{startDate} {startTime} - {endTime}</p>
            </div>
            <p>Organisator: {organizerName}</p>
            <p>
              Standort: {street} {number}, {city} {zipCode}
            </p>
          </div>
          <div className="engagement-footer">
            <span>
              Anmeldungen {slotsTaken}/{totalSlots}
            </span>
            <button className="secondaryButton">Bearbeiten</button>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="dashboard">
      <Navbar>
        <div className="dashboard-header">
          <h1>Tätigkeiten Dashboard</h1>
          <Link to="/b2b/create">
            <button className="primaryButton">Neue Tätigkeit erstellen</button>
          </Link>
        </div>

        {/* Aktive Tätigkeiten (Active Engagements) */}
        <div className="section">
          <h2>Aktive Tätigkeiten</h2>
          <div className="engagements-list">
            {isLoading ? (
              <div>Loading engagements...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : engagements.filter((eng) => !eng.tags.includes('inPlanung')).length > 0 ? (
              engagements
                .filter((eng) => !eng.tags.includes('inPlanung'))
                .map(renderEngagement)
            ) : (
              <div className="empty-box">Keine aktiven Tätigkeiten vorhanden.</div>
            )}
          </div>
        </div>

        {/* Tätigkeiten in Planung (Planned Engagements) */}
        <div className="section">
          <h2>Tätigkeiten in Planung</h2>
          <div className="engagements-list">
            {isLoading ? (
              <div>Loading engagements...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : engagements.filter((eng) => eng.tags.includes('inPlanung')).length > 0 ? (
              engagements
                .filter((eng) => eng.tags.includes('inPlanung'))
                .map(renderEngagement)
            ) : (
              <div className="empty-box">Keine Tätigkeiten in Planung vorhanden.</div>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Dashboard;
