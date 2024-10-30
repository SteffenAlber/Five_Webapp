// src/components/VolunteerOffers.js

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faTimes,
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Offers.css";
import VolunteerOfferBox from "./VolunteerOfferBox";
import Navbar from "../layout/Layout";
import { doGetRequest } from "../../backendInterface/BackendInterface";
import TimeSelectionGrid from "./TimeSelectionGrid";

const VolunteerOffers = () => {
  // State variables to control filter activation
  const [useTagsFilter, setUseTagsFilter] = useState(false);
  const [useRequirementsFilter, setUseRequirementsFilter] = useState(false);
  const [useLocationFilter, setUseLocationFilter] = useState(false);
  const [useAvailabilityFilter, setUseAvailabilityFilter] = useState(false);


  // State Variables
  const [offers, setOffers] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [distance, setDistance] = useState(25); // Default distance in km
  const [onlineOnly, setOnlineOnly] = useState(false);

  // Time availability state
  const [startTime, setStartTime] = useState(8); // Default start time
  const [endTime, setEndTime] = useState(17); // Default end time

  // Tag and requirement filters
  const [activeTags, setActiveTags] = useState({});
  const [activeRequirements, setActiveRequirements] = useState({});

  // Availability per weekday
  const [availability, setAvailability] = useState({
    Mo: [],
    Di: [],
    Mi: [],
    Do: [],
    Fr: [],
    Sa: [],
    So: []
  });

  const setAvailabilityState = (newAvailability) => {
    setAvailability(newAvailability);
    localStorage.setItem("availability", JSON.stringify(newAvailability));
  };

  // User location for distance filtering
  const [userLocation, setUserLocation] = useState(null);

  // Define your tags and requirements
  const tagsInterests = [
    "Soziale Arbeit und Unterstützung",
    "Kunst und Kultur",
    "Sport und Freizeit",
    "Katastrophen und Notfalldienste",
    "Bildung und Nachhilfe",
    "Gesundheit und Pflege",
    "Gemeinde- und Stadtentwicklung",
    "Umwelt- und Naturschutz",
  ];

  const tagsCharacteristics = [
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

  const tagsWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  // Define your requirements
  const requirementsList = [
    "16 Jahre alt",
    "18 Jahre alt",
    "Gute Deutschkenntnisse",
    "Teamfähig",
    "Zuverlässig",
    "Flexibel",
    "Führerschein Klasse B",
    "Erfahrung im Umgang mit Kindern",
    "Bereitschaft zu Wochenendarbeit",
    "Grundkenntnisse in Erster Hilfe",
    "Technische Kenntnisse",
    "Kreativ",
    "Kommunikationsstark"
    // Add more requirements as needed
  ];

  // Toggle filter visibility
  const toggleFilter = () => setFilterVisible(!filterVisible);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Handle distance change
  const handleDistanceChange = (event) => setDistance(event.target.value);

  // Handle online only toggle
  const handleOnlineOnlyChange = () => setOnlineOnly(!onlineOnly);

  // Handle start time change
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  // Handle end time change
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Toggle tag status
  const toggleTagStatus = (tag) => {
    setActiveTags((prevTags) => {
      const updatedTags = {
        ...prevTags,
        [tag]: !prevTags[tag],
      };

      // Split updated tags into interests and characteristics
      const updatedInterests = tagsInterests.filter(t => updatedTags[t]);
      const updatedCharacteristics = tagsCharacteristics.filter(t => updatedTags[t]);

      // Store updated interests and characteristics in localStorage
      localStorage.setItem("profileInterests", JSON.stringify(updatedInterests));
      localStorage.setItem("profileCharacteristics", JSON.stringify(updatedCharacteristics));

      return updatedTags;
    });
  };

  // Toggle requirement status
  const toggleRequirementStatus = (requirement) => {
    setActiveRequirements((prevRequirements) => ({
      ...prevRequirements,
      [requirement]: !prevRequirements[requirement],
    }));
  };

  // Fetch engagements from backend
  useEffect(() => {
    fetchEngagementData();
    // Obtain user location for distance filtering
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining user location:", error);
        }
      );
    }
  }, []);



  useEffect(() => {
    const storedAvailability = JSON.parse(localStorage.getItem("availability"));
    if (storedAvailability) {
      setAvailability(storedAvailability);
    }

    // Load interests and characteristics
    const storedInterests = JSON.parse(localStorage.getItem("profileInterests")) || [];
    const storedCharacteristics = JSON.parse(localStorage.getItem("profileCharacteristics")) || [];
    const combinedTags = [...storedInterests, ...storedCharacteristics];

    const activeTagsFromStorage = {};
    combinedTags.forEach(tag => {
      activeTagsFromStorage[tag] = true;
    });

    setActiveTags(activeTagsFromStorage);
  }, []);

  const fetchEngagementData = async () => {
    try {
      const response = await doGetRequest("/engagements/");
      console.log("Fetched Engagements:", response.data.engagements);
      setOffers(response.data.engagements);
    } catch (e) {
      console.error("Error fetching engagements:", e);
    }
  };

  // Helper functions for filtering
  const getDayOfWeekString = (dateString) => {
    const daysOfWeekMap = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return daysOfWeekMap[dayOfWeek];
  };

  const parseTimeRange = (timeString) => {
    const [startTimeStr, endTimeStr] = timeString
      .replace('Uhr', '')
      .split(' - ')
      .map((str) => str.trim());

    const parseTime = (str) => {
      const [hours, minutes] = str.split('.').map(Number);
      return hours + minutes / 60;
    };

    const startTime = parseTime(startTimeStr);
    const endTime = parseTime(endTimeStr);
    return { startTime, endTime };
  };

  // Utility function to calculate distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  // Helper function for checking time availability
  const matchesAvailability = (offer) => {
    // Check if startTime and endTime are defined in the offer
    if (!offer.startTime || !offer.endTime) {
      console.warn(`Offer with id ${offer.id} is missing startTime or endTime`);
      return false;
    }

    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours;
    };

    const offerStartHour = parseTime(offer.startTime); // E.g., 10
    const offerEndHour = parseTime(offer.endTime); // E.g., 12

    // Get the day of the week for the offer's start date (e.g., "Mo")
    const offerDayOfWeek = getDayOfWeekString(offer.startTime);

    // Retrieve user's availability for the corresponding day
    const userAvailableHours = availability[offerDayOfWeek];

    // Check if the offer's start and end times fit within the user's available hours
    if (!userAvailableHours || userAvailableHours.length === 0) {
      return false; // No availability for that day
    }
    // Ensure every hour between offerStartHour and offerEndHour is within userAvailableHours
    for (let hour = offerStartHour; hour < offerEndHour; hour++) {
      if (!userAvailableHours.includes(hour)) {
        return false; // If any hour in the range is not available, return false
      }
    }

    return true; // The offer's time range fits within the user's available hours
  };

  // Apply filters to the offers
  const filteredOffers = offers.filter((offer) => {

    // Filter by tags
    let matchesTags = true;
    const selectedTags = Object.keys(activeTags).filter((tag) => activeTags[tag]);

    if (selectedTags.length > 0) {
      matchesTags = selectedTags.every((tag) => offer.tags?.includes(tag));
    }

    // Filter by requirements
    let matchesRequirements = true;
    const selectedRequirements = Object.keys(activeRequirements).filter(
      (req) => activeRequirements[req]
    );

    if (selectedRequirements.length > 0) {
      matchesRequirements = selectedRequirements.every((req) =>
        offer.requirements?.includes(req)
      );
    }

    // Filter by online only
    let matchesLocation = true;
    if (onlineOnly) {
      matchesLocation = offer.location?.isOnline === true;
    }

    // Implement distance filtering if user location is available and distance is set
    if (userLocation && distance) {
      const offerLocation = offer.location;
      if (offerLocation?.latitude && offerLocation?.longitude) {
        const distanceToOffer = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          offerLocation.latitude,
          offerLocation.longitude
        );
        matchesLocation = matchesLocation && distanceToOffer <= distance;
      } else {
        // If no coordinates, exclude the offer from distance-based filtering
        matchesLocation = false;
      }
    }

    // Filter by time availability using the helper function
    // Combine all filter conditions, considering activation flags
    return (
      (!useTagsFilter || matchesTags) &&
      (!useRequirementsFilter || matchesRequirements) &&
      (!useLocationFilter || matchesLocation) &&
      (!useAvailabilityFilter || matchesAvailability(offer))
    );
  });

  return (
    <Navbar>
      <div className="pageAndSectionMargin" id="volunteerOffersSection">
        <h1>Wobei möchtest Du anpacken?</h1>

        <div className="filterButtonContainer">
          <button className="primaryButton" onClick={toggleFilter}>
            <FontAwesomeIcon icon={faSliders} /> Filter
          </button>
        </div>

        <div className="offerContainer">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <VolunteerOfferBox key={offer.id} offer={offer} />
            ))
          ) : (
            <div className="empty-box">Keine Angebote verfügbar.</div>
          )}
        </div>

        <div
          className={`filterContainer ${filterVisible ? "visible" : "hidden"}`}
        >
          <div className="filterHeader">
            <h2>Filter</h2>
            <button className="closeFilterButton" onClick={toggleFilter}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Filteroptionen */}
          <div className="filterCategory">
            <div
              className="filterCategoryHeader"
              onClick={() => toggleCategory("location")}
            >
              <h3>Ort</h3>
              <FontAwesomeIcon
                icon={
                  expandedCategory === "location" ? faChevronUp : faChevronDown
                }
                className="categoryToggle"
              />
            </div>
            <div className="marginRight">
              {expandedCategory === "location" && (
                <div className="filterCategoryContent">
                  <div>
                    <label
                      htmlFor="locationInput"
                      className="centerOnlyHorizontallyWithSpaceBetween searchContainer"
                    >
                      Standort des Ortes
                      <div className="inputWithIcon">
                        <input
                          id="locationInput"
                          type="text"
                          placeholder="Nach Ort suchen"
                          aria-label="Standort des Ortes"
                        // Implement search functionality as needed
                        // value and onChange can be connected to state if search is implemented
                        />
                        <FontAwesomeIcon
                          icon={faSearch}
                          className="searchIcon"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="distanceControl centerOnlyHorizontallyWithSpaceBetween">
                    <label htmlFor="distanceRange">
                      Gebe die Distanz an
                      <input
                        id="distanceRange"
                        type="range"
                        min="1"
                        max="40"
                        value={distance}
                        onChange={handleDistanceChange}
                        aria-label="Distanz in km"
                      />
                    </label>
                    <span>{distance} km</span>
                  </div>

                  <label
                    className="centerOnlyHorizontallyWithSpaceBetween"
                    htmlFor="onlineOnlyCheckbox"
                  >
                    Nur Online Möglichkeiten
                    <input
                      id="onlineOnlyCheckbox"
                      type="checkbox"
                      checked={onlineOnly}
                      onChange={handleOnlineOnlyChange}
                      aria-checked={onlineOnly}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="filterCategory">
            <div
              className="filterCategoryHeader"
              onClick={() => toggleCategory("time")}
            >
              <h3>Zeit</h3>
              <FontAwesomeIcon
                icon={
                  expandedCategory === "time" ? faChevronUp : faChevronDown
                }
                className="categoryToggle"
              />
            </div>
            <div className="marginRight">
              {expandedCategory === "time" && (
                <div className="filterCategoryContent">
                  <p>Wähle deine Verfügbarkeit aus:</p>
                  <TimeSelectionGrid
                    availability={availability}
                    setAvailability={setAvailabilityState}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="filterCategory">
            <div
              className="filterCategoryHeader"
              onClick={() => toggleCategory("interests")}
            >
              <h3>Interessen</h3>
              <FontAwesomeIcon
                icon={
                  expandedCategory === "interests" ? faChevronUp : faChevronDown
                }
                className="categoryToggle"
              />
            </div>
            <div className="marginRight">
              {expandedCategory === "interests" && (
                <div className="filterCategoryContent">
                  <div className="tagContainer">
                    <p className="interestsTxt">Deine Interessen sind ...</p>
                    {tagsInterests.map((tag, index) => (
                      <button
                        key={index}
                        className={`tagInterest ${activeTags[tag] ? "active" : ""
                          }`}
                        onClick={() => toggleTagStatus(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="tagContainer">
                    <p className="interestsTxt">
                      Dein Typ Ehrenamt ist ein/-e ...
                    </p>

                    {tagsCharacteristics.map((tag, index) => (
                      <button
                        key={index}
                        className={`tagInterest ${activeTags[tag] ? "active" : ""
                          }`}
                        onClick={() => toggleTagStatus(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="filterCategory">
            <div
              className="filterCategoryHeader"
              onClick={() => toggleCategory("requirements")}
            >
              <h3>Anforderungen</h3>
              <FontAwesomeIcon
                icon={
                  expandedCategory === "requirements" ? faChevronUp : faChevronDown
                }
                className="categoryToggle"
              />
            </div>
            <div className="marginRight">
              {expandedCategory === "requirements" && (
                <div className="filterCategoryContent">
                  <div className="tagContainer">
                    <p className="interestsTxt">Sie erfüllen die folgenden Anforderungen</p>
                    {requirementsList.map((req, index) => (
                      <button
                        key={index}
                        className={`tagInterest ${activeRequirements[req] ? "active" : ""
                          }`}
                        onClick={() => toggleRequirementStatus(req)}
                      >
                        {req}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="filterCategory">
            <div
              className="filterCategoryHeader"
              onClick={() => toggleCategory("etc")}
            >
              <h3>Sonstiges</h3>
              <FontAwesomeIcon
                icon={
                  expandedCategory === "etc" ? faChevronUp : faChevronDown
                }
                className="categoryToggle"
              />
            </div>
            <div className="marginRight">
              {expandedCategory === "etc" && (
                <div className="filterCategoryContent">
                  <label className="centerOnlyHorizontallyWithSpaceBetween">
                    Nur dringende Tätigkeiten
                    <input type="checkbox" />
                  </label>

                  <label className="centerOnlyHorizontallyWithSpaceBetween">
                    Nur Barrierefreie Möglichkeiten
                    <input type="checkbox" />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default VolunteerOffers;
