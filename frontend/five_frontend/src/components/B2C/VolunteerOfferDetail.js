import React, { useEffect, useState } from "react";
import "../../styles/Offers.css";
import { useParams, useLocation } from "react-router-dom";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../layout/Layout";
import { doGetRequest, doPostRequest } from "../../backendInterface/BackendInterface";

const VolunteerOfferDetail = () => {
  // saving offer data from backend call
  const [engagementData, setEngagementData] = useState(null);

  const [isApplicant, setIsApplicant] = useState(false);

  //reading current url and getting id from it
  const urlPath = useLocation().pathname;
  let engagementId = urlPath.split("/").pop();

  const userId = localStorage.getItem("userID");



  useEffect(() => {
    fetchEngagementData();
  }, [urlPath]);

  const checkIfApplicant = (volunteers) => {
    const userId = localStorage.getItem("userID");
    return volunteers.applicants.includes(userId);
  };
  
  // Update the fetchEngagementData function
  const fetchEngagementData = async () => {
    try {
      const response = await doGetRequest("/engagements/e/" + engagementId);
      const engagement = response.data;
      console.log("Response GET ", response.data);
      setEngagementData(engagement);
  
      // Check if the user is already an applicant
      if (engagement.volunteers) {
        setIsApplicant(checkIfApplicant(engagement.volunteers));
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleApply = async () => {
    const userId = localStorage.getItem("userID");
    try {
      const response = await doPostRequest(`/engagements/${engagementId}/applicants/`, {
        userId
      });
      console.log("Applied successfully", response);
      setIsApplicant(true);
    } catch (error) {
      console.error("Error applying", error);
    }
  };

  const handleUnapply = async () => {
    const userId = localStorage.getItem("userID");
    try {
      const response = await doPostRequest(`/engagements/${engagementId}/applicants/decline`, {
        userId
      });
      console.log("Unapplied successfully", response);
      setIsApplicant(false); 
    } catch (error) {
      console.error("Error unapplying", error);
    }
  };


  // If data is still being fetched, show a loading state
  if (!engagementData) {
    return <div>Loading...</div>;
  }

  // Format date and time
  const formattedDate = engagementData.startTime
    ? new Date(engagementData.startTime).toLocaleDateString("de-DE")
    : "Datum fehlt";
  const formattedStartTime = engagementData.startTime
    ? new Date(engagementData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "Startzeit fehlt";
  const formattedEndTime = engagementData.endTime
    ? new Date(engagementData.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "Endzeit fehlt";

  return (
    <Navbar>
      <div id="volunteerOffersSection2">
        <h1>{engagementData.title}</h1>

        <div className="additionalOfferInfoText setToOppositeEnds">
          <div className="centerEverythingHorizontal gapLarge">
            <p>{formattedDate}</p>
            <p>{formattedStartTime} - {formattedEndTime}</p>
            <p>{engagementData.volunteers?.numberOfVolunteers} Personen</p>
            <p>{engagementData.location?.street}, {engagementData.location?.zipCode} {engagementData.location?.city}</p>
          </div>
          <div className="centerEverythingHorizontal">
            {engagementData.tags.map((tag, index) => (
              <p key={index} className="tags">#{tag}</p>
            ))}
          </div>
        </div>

        <div className="gridContainer">
          <div className="gridItem centerEverythingVertical">
            <h3 className="offerInformationHeadline">Beschreibung</h3>
          </div>
          <div className="gridItem centerEverythingVertical">
            {engagementData.description}
          </div>

          <div className="gridItem centerEverythingVertical">
            <h3 className="offerInformationHeadline">Aufgaben</h3>
          </div>
          <div className="gridItem centerEverythingVertical">
            {/* You can add a specific task description here if available */}
            Lebensmittel vorbereiten und bei der Zubereitung der Gerichte helfen.
            Die fertigen Gerichte an der Ausgabe servieren und mit den bedürftigen
            Menschen interagieren. Beim anschließenden Abwasch und Aufräumen
            mithelfen. Bei Bedarf Mithilfe bei der Ausgabe gespendeter Kleidung.
          </div>

          <div className="gridItem centerEverythingHorizontal centerEverythingVertical">
            <h3 className="offerInformationHeadline">Deine Win's</h3>
            <FontAwesomeIcon icon={faTrophy} id="trophyIcon" />
          </div>
          <div className="gridItem centerEverythingVertical">
            {/* Add details of the rewards */}
            Du erweiterst deine Social Skills und lernst interessante Menschen
            kennen. Du lernst den Ablauf in einer Suppenküche kennen und wie wir
            unsere Gerichte zubereiten und an bedürftige Menschen verteilen.
            Du lernst neue und günstige Rezepte. Alle Helfer dürfen
            selbstverständlich kostenlos mitessen. Für Getränke ist auch gesorgt.
          </div>

          <div className="gridItem centerEverythingVertical">
            <h3 className="offerInformationHeadline">Anforderungen</h3>
          </div>
          <div className="gridItem centerEverythingVertical">
            <ul>
              {engagementData.requirements.length > 0 ? (
                engagementData.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))
              ) : (
                <li>Keine Anforderungen</li>
              )}
            </ul>
          </div>
        </div>

        <div className="filterButtonContainer">
          {isApplicant ? (
            <button className="deleteButton" onClick={handleUnapply}>Abmelden</button>
          ) : (
            <button className="primaryButton" onClick={handleApply}>Anmelden</button>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default VolunteerOfferDetail;
