// src/components/VolunteerOfferBox.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Offers.css";
import { Link } from "react-router-dom";

const VolunteerOfferBox = ({ offer }) => {
  const {
    id,
    title,
    description,
    startTime,
    endTime,
    organizer,
    location,
    tags,
    requirements,
    volunteers,
  } = offer;

  const wins = [
    "Kostenlose Snacks und Getränke",
    "Einblick in den Medizinbereich",
    "Neue Menschen kennenlernen",
    "Umgang mit Essen",
  ];

  const formattedDate = startTime
    ? new Date(startTime).toLocaleDateString("de-DE")
    : "Datum fehlt";
  const formattedStartTime = startTime
    ? new Date(startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Startzeit fehlt";
  const formattedEndTime = endTime
    ? new Date(endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Endzeit fehlt";

  return (
    <Link to={`/b2c/angebote/${id}`} className="volunteer-offer-box-link">
      <div id="offerBox">
        <h3 id="titleWork">{title || "Titel fehlt"}</h3>
        <div id="backgroundInfoTextRow">
          <span>{formattedDate}</span>
          <span>
            {formattedStartTime} - {formattedEndTime}
          </span>
          {volunteers?.numberOfVolunteers && (
            <span>{volunteers.numberOfVolunteers} Personen</span>
          )}
          {location?.city && <span>{location.city}</span>}
        </div>
        <div id="winContent">
          <div className="winAndTags">
            <div className="nextToAnother">
              <FontAwesomeIcon icon={faTrophy} id="trophyIcon" />
              <p>Dein Win</p>
              <ul>
                {wins && wins.length > 0 ? (
                  wins.map((win, index) => <li key={index}>{win}</li>)
                ) : (
                  <li>Keine Wins verfügbar.</li>
                )}
              </ul>
            </div>
            <div id="tagContainer">
              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <div className="tags" key={index}>
                    <p>#{tag}</p>
                  </div>
                ))
              ) : (
                <div className="tags">
                  <p>Keine Tags</p>
                </div>
              )}
            </div>
          </div>
          <p>{description || "Keine Beschreibung verfügbar."}</p>
          {requirements && requirements.length > 0 && (
            <div className="requirementsSection">
              <p>Anforderungen:</p>
              <ul>
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          <div id="bottomContainer">
            <button className="primaryButton">Mehr Ansehen</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VolunteerOfferBox;
