// EngagementDetail.jsx

import React, { useEffect, useState } from "react";
import "../../styles/Engagements.css";
import { useParams } from "react-router-dom";
import { doGetRequest, doPostRequest, doPutRequest } from "../../backendInterface/BackendInterface"; // Added doPutRequest
import Navbar from "../layout/Layout";
import "../../styles/EngagementDetail.css";

const EngagementDetail = () => {
  const { engagement_id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  // State for accepted and pending volunteers
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);

  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    organizer: "", 
    characteristic: "", 
    location: { 
      zipCode: "", 
      city: "", 
      street: "", 
      number: "" 
    },
    requirements: [],
    tags: [],
    volunteers: { 
      numberOfVolunteers: 0, 
      applicants: [],
      acceptedVolunteers: [] 
    }
  });

  useEffect(() => {
    const fetchEngagement = async () => {
      console.log("Engagement ID:", engagement_id);

      try {
        const response = await doGetRequest(`/engagements/e/${engagement_id}`);
        const engagementData = response.data;

        console.log("Fetched Engagement Data:", engagementData);
              // Ensure all fields are present, assign default values if necessary
      setOfferData({
        title: engagementData.title || "",
        description: engagementData.description || "",
        startTime: engagementData.startTime || "",
        endTime: engagementData.endTime || "",
        organizer: engagementData.organizer || "", // Ensure organizer is present
        characteristic: engagementData.characteristic || "", // Ensure characteristic is present
        location: {
          zipCode: engagementData.location?.zipCode || "",
          city: engagementData.location?.city || "",
          street: engagementData.location?.street || "",
          number: engagementData.location?.number || ""
        },
        requirements: engagementData.requirements || [],
        tags: engagementData.tags || [],
        volunteers: {
          numberOfVolunteers: engagementData.volunteers?.numberOfVolunteers || 0,
          applicants: engagementData.volunteers?.applicants || [], // Ensure applicants are present
          acceptedVolunteers: engagementData.volunteers?.acceptedVolunteers || []
        }
      });

        console.log("Fetched Engagement Data, volunteers:", engagementData.volunteers);

        // Fetch details for each applicant (pending volunteers)
        const applicantsWithDetails = await Promise.all(
          engagementData.volunteers.applicants.map(async (applicant) => {
            console.log("Applicant data:", applicant); 

            if (!applicant) {
              console.error("Applicant is undefined:", applicant);
              return null; // Skip if undefined
            }

            const userId = applicant.userId || applicant; // Handle both cases
            if (!userId) {
              console.error("Applicant has undefined userId:", applicant);
              return null; // Skip if still undefined
            }

            try {
              const userResponse = await doGetRequest(`/users/${userId}`);
              const userData = userResponse.data;
              console.log("userData: ", userData);
              return {
                userId: userId,
                name: userData.firstName || "Unbekannter Name",
                lastname: userData.lastName || "Unbekannter Name",
              };
            } catch (error) {
              console.error(`Error fetching user data for userId ${userId}:`, error);
              return null; // Skip on error
            }
          })
        );

        // Set pending volunteers (filter out nulls)
        setPendingUsers(applicantsWithDetails.filter(user => user !== null));

        console.log("Pending Users: ", applicantsWithDetails.filter(user => user !== null));

        // Fetch details for each accepted volunteer
        const acceptedUsersWithDetails = await Promise.all(
          engagementData.volunteers.acceptedVolunteers.map(async (volunteerId) => {
            if (!volunteerId) {
              console.error("Volunteer has undefined userId:", volunteerId);
              return null; // Skip if undefined
            }

            try {
              const userResponse = await doGetRequest(`/users/${volunteerId}`);
              const userData = userResponse.data;

              return {
                userId: volunteerId,
                name: userData.firstName || "Unbekannter Name",
                lastname: userData.lastName || "Unbekannter Name",
              };
            } catch (error) {
              console.error(`Error fetching user data for volunteerId ${volunteerId}:`, error);
              return null; // Skip on error
            }
          })
        );

        // Set accepted volunteers (filter out nulls)
        setAcceptedUsers(acceptedUsersWithDetails.filter(user => user !== null));

        console.log("Accepted Users: ", acceptedUsersWithDetails.filter(user => user !== null));

      } catch (error) {
        console.error("Error fetching engagement data:", error);
      }
    };

    fetchEngagement();

    // Click outside the popup to close
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".avatar") &&
        !event.target.closest(".popupProfile")
      ) {
        setHoveredUser(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [engagement_id]);

  // Activate edit mode
  const handleEditClick = () => setIsEditing(true);

  // Cancel edit mode and reset data
  const handleCancelClick = () => {
    const fetchEngagement = async () => {
      try {
        const response = await doGetRequest(`/engagements/e/${engagement_id}`);
        const engagementData = response.data;
        setOfferData(engagementData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error fetching engagement data:", error);
      }
    };
    fetchEngagement();
  };

  // Save-Button Handler
  const handleSaveClick = async () => {
    // Prepare the updated offer data
    const updatedData = {
      title: offerData.title,
      description: offerData.description,
      startTime: offerData.startTime,
      endTime: offerData.endTime,
      location: offerData.location,
      requirements: offerData.requirements,
      tags: offerData.tags,
      volunteers: {
        ...offerData.volunteers, 
        numberOfVolunteers: offerData.volunteers.numberOfVolunteers,
      },
    };

    // Update the state immediately for session display
    setOfferData(updatedData);

    // Commented out the PUT request for demonstration purposes
    
    try {
      // Send the PUT request to the backend
      const response = await doPutRequest(`/engagements/u/${engagement_id}`, updatedData);

      // Update the state with the data returned from the backend
      setOfferData(response.data);

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating engagement:", error);
      // Optional: Show an error message to the user
    }
    

    // Exit edit mode regardless of PUT request
    setIsEditing(false);
  };

  // Delete-Button Handler
  const handleDeleteClick = () => {
    console.log("Tätigkeit abgesagt");
    // Implement cancellation logic here (e.g., API call)
  };

  // General Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setOfferData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [field]: value,
        },
      }));
    } else {
      setOfferData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Add and remove requirements
  const addRequirement = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setOfferData((prevData) => ({
        ...prevData,
        requirements: [...prevData.requirements, e.target.value.trim()]
      }));
      e.target.value = '';
    }
  };

  const removeRequirement = (index) => {
    setOfferData((prevData) => ({
      ...prevData,
      requirements: prevData.requirements.filter((_, i) => i !== index)
    }));
  };

  // Add and remove tags
  const addTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setOfferData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, e.target.value.trim()]
      }));
      e.target.value = '';
    }
  };

  const removeTag = (index) => {
    setOfferData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index)
    }));
  };

  // Change available slots
  const handleNumberOfVolunteersChange = (e) => {
    const value = e.target.value;
    setOfferData((prevData) => ({
      ...prevData,
      volunteers: {
        ...prevData.volunteers,
        numberOfVolunteers: parseInt(value, 10) || 0,
      }
    }));
  };

  // Avatar click to show user information in popup
  const handleAvatarClick = (user, event) => {
    const rect = event.target.getBoundingClientRect();
    setHoveredUser((prev) => (prev && prev.name === user.name ? null : user));
    setPopupPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
  };

  // API calls to accept the user
  const handleAccept = async (applicant) => {
    try {
      await doPostRequest(`/engagements/${engagement_id}/applicants/accept`, {
        userId: applicant.userId
      });

      // Update state after successful acceptance
      setAcceptedUsers((prev) => [...prev, applicant]);
      setPendingUsers((prev) => prev.filter((u) => u.userId !== applicant.userId));
      setHoveredUser(null);
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  // API calls to decline the user
  const handleDecline = async (applicant) => {
    try {
      await doPostRequest(`/engagements/${engagement_id}/applicants/decline`, {
        userId: applicant.userId
      });

      // Remove user from acceptedUsers if present
      setAcceptedUsers((prevAccepted) => prevAccepted.filter((u) => u.userId !== applicant.userId));

      // Update state after successful decline
      setPendingUsers((prev) => prev.filter((u) => u.userId !== applicant.userId));
      setHoveredUser(null);
    } catch (error) {
      console.error("Error declining applicant:", error);
    }
  };

  // Formatted date and time
  const formattedDate = offerData.startTime
    ? new Date(offerData.startTime).toLocaleDateString("de-DE")
    : "Datum fehlt";
  const formattedStartTime = offerData.startTime
    ? new Date(offerData.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Startzeit fehlt";
  const formattedEndTime = offerData.endTime
    ? new Date(offerData.endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Endzeit fehlt";

  return (
    <Navbar>
      <div id="mainDetailContainer"
      >
        <div id="detailContainer">
          {/* Top Buttons */}
          <div className="buttonGroup">
            {isEditing ? (
              <>
                <button id="Button" className="deleteButton" onClick={handleDeleteClick}>
                  Tätigkeit absagen
                </button>
                <div>
                  <button id="Button" className="primaryButton" onClick={handleSaveClick}>
                    Speichern
                  </button>
                  <button id="Button" className="secondaryButton" onClick={handleCancelClick}>
                    Abbrechen
                  </button>
                </div>
              </>
            ) : (
              <button id="Button" className="primaryButton" onClick={handleEditClick}>
                Tätigkeit bearbeiten
              </button>
            )}
          </div>

          {/* Offer Card */}
          <div id="offerBoxE">
            <div className="header">
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={offerData.title}
                  onChange={handleInputChange}
                />
              ) : (
                <h1>{offerData.title}</h1>
              )}
            </div>
            <div className="details">
              {/* Date */}
              <p>
                <strong>Datum:</strong>{" "}
                {isEditing ? (
                  <input
                    type="date"
                    name="startTime"
                    value={formattedDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      const startTime = offerData.startTime ? offerData.startTime.split("T")[1] : "00:00:00";
                      const endTime = offerData.endTime ? offerData.endTime.split("T")[1] : "00:00:00";
                      setOfferData((prevData) => ({
                        ...prevData,
                        startTime: new Date(`${newDate}T${startTime}`).toISOString(),
                        endTime: new Date(`${newDate}T${endTime}`).toISOString(),
                      }));
                    }}
                  />
                ) : (
                  formattedDate
                )}
              </p>

              {/* Time */}
              <p>
                <strong>Zeit:</strong>{" "}
                {isEditing ? (
                  <>
                    <input
                      type="time"
                      name="startTime"
                      value={formattedStartTime}
                      onChange={(e) => {
                        const newStartTime = e.target.value;
                        const date = offerData.startTime ? offerData.startTime.split("T")[0] : "1970-01-01";
                        const endTime = offerData.endTime ? offerData.endTime.split("T")[1] : "00:00:00";
                        setOfferData((prevData) => ({
                          ...prevData,
                          startTime: new Date(`${date}T${newStartTime}:00`).toISOString(),
                          endTime: new Date(`${date}T${endTime}`).toISOString(),
                        }));
                      }}
                    />
                    -
                    <input
                      type="time"
                      name="endTime"
                      value={formattedEndTime}
                      onChange={(e) => {
                        const newEndTime = e.target.value;
                        const date = offerData.endTime ? offerData.endTime.split("T")[0] : "1970-01-01";
                        const startTime = offerData.startTime ? offerData.startTime.split("T")[1] : "00:00:00";
                        setOfferData((prevData) => ({
                          ...prevData,
                          endTime: new Date(`${date}T${newEndTime}:00`).toISOString(),
                        }));
                      }}
                    />
                  </>
                ) : (
                  `${formattedStartTime} - ${formattedEndTime}`
                )}
              </p>

              {/* Address */}
              <p>
                <strong>Adresse:</strong>{" "}
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="location.street"
                      placeholder="Straße"
                      value={offerData.location.street}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="location.city"
                      placeholder="Stadt"
                      value={offerData.location.city}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="location.number"
                      placeholder="Hausnummer"
                      value={offerData.location.number}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  `${offerData.location.street}, ${offerData.location.city}, ${offerData.location.number}`
                )}
              </p>

              {/* Short Description */}
              <p>
                <strong>Kurzbeschreibung:</strong>{" "}
                {isEditing ? (
                  <textarea
                    name="description"
                    value={offerData.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  offerData.description || "Keine Beschreibung verfügbar"
                )}
              </p>
                {/* Characteristic */}
              <p>
                <strong>Charakteristik:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="characteristic"
                    value={offerData.characteristic}
                    onChange={handleInputChange}
                  />
                ) : (
                  offerData.characteristic || "Keine Charakteristik verfügbar"
                )}
              </p>
              {/* Requirements */}
              <p>
                <strong>Anforderungen:</strong>
                {isEditing ? (
                  <>
                    <input 
                      type="text" 
                      placeholder="Füge eine Anforderung hinzu (Drücke Enter nach jeder Anforderung)" 
                      onKeyPress={addRequirement}
                    />
                    <ul className="requirements-list">
                      {offerData.requirements.map((req, index) => (
                        <li key={index}>
                          {req}
                          <button className="delete-button" onClick={() => removeRequirement(index)}>×</button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <ul>
                    {offerData.requirements.length > 0 ? (
                      offerData.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))
                    ) : (
                      <li>Keine Anforderungen</li>
                    )}
                  </ul>
                )}
              </p>

              {/* Tags */}
              <div id="tagContainer">
                <strong>Tags:</strong>{" "}
                {isEditing ? (
                  <>
                    <input 
                      type="text" 
                      placeholder="Füge einen Tag hinzu (Drücke Enter nach jedem Tag)" 
                      onKeyPress={addTag}
                    />
                    <ul className="tags-list">
                      {offerData.tags.map((tag, index) => (
                        <li key={index}>
                          {tag}
                          <button className="delete-button" onClick={() => removeTag(index)}>×</button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  offerData.tags.length > 0 ? (
                    offerData.tags.map((tag, index) => (
                      <div key={index} className="tag">
                        <p>{tag}</p>
                      </div>
                    ))
                  ) : (
                    <p>Keine Tags</p>
                  )
                )}
              </div>
            </div>

            {/* Available Slots */}
            <div className="slots">
              <p>
                <strong>Verfügbare Plätze:</strong>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    name="volunteers.numberOfVolunteers"
                    value={offerData.volunteers.numberOfVolunteers}
                    onChange={handleNumberOfVolunteersChange}
                  />
                ) : (
                  offerData.volunteers.numberOfVolunteers - offerData.volunteers.acceptedVolunteers.length
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Bands Container */}
        <div className="bandsContainer">
          {/* Accepted Volunteers */}
          {acceptedUsers.length > 0 && (
            <div className="bandContainer acceptedBand">
              <div className="bandBackground"></div>
              <div className="bandLeft"></div>
              <div className="bandRight">
                <div className="bandContent">
                  <h4>Akzeptierte Freiwillige</h4>
                  <div className="userAvatarContainer">
                    {acceptedUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="avatar"
                        onClick={(e) => handleAvatarClick(user, e)}
                      >
                        <img
                          src={`https://via.placeholder.com/60?text=${user.name.charAt(0)}`}
                          alt={user.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pending Volunteers */}
          {pendingUsers.length > 0 && (
            <div className="bandContainer pendingBand">
              <div className="bandBackground"></div>
              <div className="bandLeft"></div>
              <div className="bandRight">
                <div className="bandContent">
                  <h4>Ausstehende Freiwillige</h4>
                  <div className="userAvatarContainer">
                    {pendingUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="avatar"
                        onClick={(e) => handleAvatarClick(user, e)}
                      >
                        <img
                          src={`https://via.placeholder.com/60?text=${user.name.charAt(0)}`}
                          alt={user.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Popup for User Information */}
        {hoveredUser && (
          <div
            className="popupProfile"
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <h5 id="name">{hoveredUser.name}</h5>
            <div className="popupButtons">
              {pendingUsers.find((u) => u.userId === hoveredUser.userId) ? (
                <button
                  id="Button"
                  className="primaryButton"
                  onClick={() => handleAccept(hoveredUser)}
                >
                  Akzeptieren
                </button>
              ) : null}
              <button
                id="Button"
                className="deleteButton"
                onClick={() => handleDecline(hoveredUser)}
              >
                Ablehnen
              </button>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default EngagementDetail;
