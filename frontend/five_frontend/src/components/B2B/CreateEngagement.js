import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doPostRequest, doGetRequest } from "../../backendInterface/BackendInterface";
import "../../styles/CreateEngagement.css";
import Navbar from "../layout/Layout";

const CreateEngagement = () => {
  const [step, setStep] = useState(1); // Track which step we're on
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [characteristic, setCharacteristic] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({
    zipCode: "",
    city: "",
    street: "",
    number: ""
  });
  const [numberOfVolunteers, setNumberOfVolunteers] = useState("");
  
  // Loading and Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Function to remove a requirement by its index
  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Function to remove a tag by its index
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const engagementOffers = [
    {
      title: "Sing Session",
      startTime: "2023-10-21T16:00:00",
      endTime: "2023-10-21T18:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Sing mit Senioren und mache ihren Tag heller.",
      requirements: ["Freude am Singen", "Geduld", "Kontaktfreude"],
      characteristic: "Notenfinger",
      tags: ["Musik", "Senioren", "Gemeinschaft"],
      location: {
        zipCode: "73525",
        city: "Schwäbisch Gmünd",
        street: "Hospitalgasse",
        number: "34",
      },
      numberOfVolunteers: 6,
    },
    {
      title: "Müll Aktion",
      startTime: "2023-12-07T12:00:00",
      endTime: "2023-12-07T16:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Hilf mit, die Umwelt sauber zu halten bei dieser Müllaktion.",
      requirements: ["Teamarbeit", "Verantwortungsbewusstsein", "Aktiv im Freien"],
      characteristic: "Frischluftschnapper",
      tags: ["Umweltschutz", "Outdoor", "Gemeinschaft"],
      location: {
        zipCode: "73525",
        city: "Schwäbisch Gmünd",
        street: "Bahnhofstraße",
        number: "10",
      },
      numberOfVolunteers: 20,
    },
    {
      title: "Spaziertrip Inklusion",
      startTime: "2023-12-14T14:00:00",
      endTime: "2023-12-14T16:00:00",
      organizer: "66f34415f74fe56686fd03cf",
      description: "Inklusionsspaziergang mit Senioren. Bringe Freude und Bewegung in den Alltag!",
      requirements: ["Empathie", "Freundlichkeit", "Körperlich fit"],
      characteristic: "Tierfreund",
      tags: ["Spaziergang", "Senioren", "Inklusion"],
      location: {
        zipCode: "70184",
        city: "Stuttgart",
        street: "Stafflenbergstraße",
        number: "22",
      },
      numberOfVolunteers: 2,
    },
    {
      title: "Aufräumarbeiten im Grünen",
      startTime: "2023-12-07T14:00:00",
      endTime: "2023-12-07T15:30:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Hilf mit, den grünen Bereich sauber und ordentlich zu halten.",
      requirements: ["Körperlich fit", "Verantwortungsbewusstsein", "Naturfreund"],
      characteristic: "Kraftpaket",
      tags: ["Gartenarbeit", "Sauberkeit", "Natur"],
      location: {
        zipCode: "70184",
        city: "Stuttgart",
        street: "Stafflenbergstraße",
        number: "10",
      },
      numberOfVolunteers: 4,
    },
    {
      title: "Sachen sortieren",
      startTime: "2023-12-04T16:00:00",
      endTime: "2023-12-04T18:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Hilf mit, Kleidung für die Gemeinschaft zu sortieren.",
      requirements: ["Ordnungsliebe", "Geduld", "Organisiert"],
      characteristic: "Stoffbländiger",
      tags: ["Sortieren", "Gemeinschaft", "Kleidung"],
      location: {
        zipCode: "10117",
        city: "Berlin",
        street: "Sonnenallee",
        number: "43",
      },
      numberOfVolunteers: 5,
    },
    {
      title: "Kältebus mitfahren",
      startTime: "2023-12-18T22:00:00",
      endTime: "2023-12-19T06:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Hilf mit, beim Deutschen Roten Kreuz durch Stuttgart zu fahren und Hilfsgüter zu verteilen.",
      requirements: ["Fahrerlaubnis", "Verantwortungsbewusstsein", "Teamarbeit"],
      characteristic: "Rentfahrer",
      tags: ["Hilfe", "Kältebus", "Spende"],
      location: {
        zipCode: "70188",
        city: "Stuttgart",
        street: "Landhausstraße",
        number: "201",
      },
      numberOfVolunteers: 2,
    },
    {
      title: "Fahrrad Reparatur Aktion",
      startTime: "2023-12-10T10:00:00",
      endTime: "2023-12-10T17:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Hilf mit, Fahrräder für einkommensschwache Familien zu reparieren.",
      requirements: ["Fahrradkenntnisse", "Teamarbeit", "Verantwortungsbewusstsein"],
      characteristic: "Schraubendreher",
      tags: ["Fahrrad", "Reparatur", "Gemeinschaft"],
      location: {
        zipCode: "73525",
        city: "Schwäbisch Gmünd",
        street: "Klosterstraße",
        number: "25",
      },
      numberOfVolunteers: 2,
    },
    {
      title: "Kids Entertainment",
      startTime: "2023-12-11T10:00:00",
      endTime: "2023-12-11T11:30:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Unterhalte Kinder in einer Flüchtlingseinrichtung mit Spielen und Geschichten.",
      requirements: ["Kinderlieb", "Geduldig", "Kreativ"],
      characteristic: "Mundaufmacher",
      tags: ["Spiele", "Kinder", "Unterhaltung"],
      location: {
        zipCode: "73228",
        city: "Esslingen",
        street: "Limburgstraße",
        number: "6",
      },
      numberOfVolunteers: 2,
    },
    {
      title: "Suppenküche",
      startTime: "2023-12-17T12:00:00",
      endTime: "2023-12-17T16:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Hilf mit bei der Essensausgabe in der Suppenküche für Bedürftige.",
      requirements: ["Küchenerfahrung", "Teamarbeit", "Geduld"],
      characteristic: "Kochlöffelschwinger",
      tags: ["Essen", "Küche", "Hilfe"],
      location: {
        zipCode: "73525",
        city: "Schwäbisch Gmünd",
        street: "Bahnhofstraße",
        number: "15",
      },
      numberOfVolunteers: 3,
    },
    {
      title: "Digitales Lernen für Senioren",
      startTime: "2023-12-14T15:00:00",
      endTime: "2023-12-14T17:00:00",
      organizer: "66f34415f74fe56686fd03cf", 
      description: "Unterstütze Senioren dabei, den Umgang mit digitalen Geräten zu erlernen.",
      requirements: ["Geduld", "Technisches Verständnis", "Freundlichkeit"],
      characteristic: "Computerfuzzi",
      tags: ["Senioren", "Digital", "Lernen"],
      location: {
        zipCode: "70188",
        city: "Stuttgart",
        street: "Landhausstraße",
        number: "201",
      },
      numberOfVolunteers: 5,
    },
  ];
  
  const organizerId = "66f34415f74fe56686fd03cf"; 
  const navigate = useNavigate();

  // Mock Data
  const useMockData = true; // Set to true to use mock data, false to disable
  const mockData = {
    "title": "Beispiel Tätigkeit",
    "startTime": "2024-01-01T15:00:00",
    "endTime": "2024-01-01T18:00:00",
    "organizer": "66f34415f74fe56686fd03cf",
    "description": "Hier wird ein Satz geschrieben, um die Aufgabe zu verdeutlichen und näher zu beschreiben. ",
    "requirements": [
      "Mindestens 18 Jahre alt",
      "Gute Deutschkenntnisse",
    ],
    "characteristic": "anpacker",
    "tags": [
      "chill",
      "outdoor"
    ],
    "location": {
      "zipCode": "72267",
      "city": "Reutlingen",
      "street": "Alteburgstraße",
      "number": "18/1"
    },
    "numberOfVolunteers": 6
  };

  useEffect(() => {
    if (useMockData) {
      // Populate form fields with mock data
      setTitle(mockData.title);
      
      // Extract date and time from startTime and endTime
      const startDate = mockData.startTime.split("T")[0]; // "2024-01-01"
      const startTimeValue = mockData.startTime.split("T")[1].substring(0,5); // "15:00"
      const endTimeValue = mockData.endTime.split("T")[1].substring(0,5); // "18:00"
      setDate(startDate);
      setStartTime(startTimeValue);
      setEndTime(endTimeValue);
      
      setDescription(mockData.description);
      setRequirements(mockData.requirements);
      setCharacteristic(mockData.characteristic);
      setTags(mockData.tags);
      setLocation({
        zipCode: mockData.location.zipCode.toString(),
        city: mockData.location.city,
        street: mockData.location.street,
        number: mockData.location.number
      });
      setNumberOfVolunteers(mockData.numberOfVolunteers.toString());
    }
  }, []); // Run once on mount

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1: Construct Request Body
      const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
      const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

      const requestBody = {
        title,
        startTime: startDateTime,
        endTime: endDateTime,
        organizer: organizerId,
        description,
        requirements,
        characteristic,
        tags,
        location,
        numberOfVolunteers: parseInt(numberOfVolunteers, 10),
      };

        // **Log the Request Body for Debugging**
        console.log("Request Body:", requestBody);

      // Step 2: Send POST Request to Create Engagement
      const postResponse = await doPostRequest("/engagements/", requestBody);

      console.log("Engagement created successfully", postResponse);

      // Step 3: Navigate to Dashboard
      navigate("/b2b/dashboard"); 
    } catch (err) {
      console.error("Error creating engagement", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitAllEngagements = async () => {
    try {
      for (let offer of engagementOffers) {
        const requestBody = {
          ...offer, // Spread the current offer properties
          startTime: new Date(offer.startTime).toISOString(),
          endTime: new Date(offer.endTime).toISOString(),
          numberOfVolunteers: parseInt(offer.numberOfVolunteers, 10),
        };
  
        // Debugging log to show the request being made
        console.log("Submitting Offer:", requestBody);
  
        // Make the POST request for each offer
        const postResponse = await doPostRequest("/engagements/", requestBody);
  
        console.log("Engagement created:", postResponse);
      }
      console.log("All engagements submitted successfully.");
    } catch (error) {
      console.error("Error submitting engagements:", error);
    }
  };


  const addRequirement = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setRequirements([...requirements, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  // Functions to navigate between steps
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Navbar>
      <div className="create-engagement-container">
        <h1>Erstelle eine Tätigkeit</h1>

        {error && <div className="error-message">{error}</div>} {/* Display error if any */}

        {/* Step 1 - Basic Information */}
        {step === 1 && (
          <>
            <p>Wann soll die Tätigkeit stattfinden?</p>

            <div className="form-group">
              <label>Datum</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>Startzeit</label>
              <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>Endzeit</label>
              <input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>Wie lautet der Titel der Tätigkeit?</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>

            {/* 
              NOTE:
              Organizer details are fetched via GET request using organizerId.
              Therefore, input fields for organizer details have been removed to maintain consistency with the backend expectations.
              If organizer details need to be displayed, consider showing them as read-only fields populated after fetching.
            */}
            
            <div className="form-navigation">
              <button 
                className="primaryButton" 
                onClick={nextStep}
                disabled={isSubmitting} // Disable button while submitting
              >
                Weiter
              </button>
            </div>
          </>
        )}

        {/* Step 2 - Description & Requirements */}
        {step === 2 && (
          <>
            <div className="form-group">
              <label>Beschreibe in wenigen Sätzen, um was es geht.</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Deine Beschreibung hier..."
                required
              />
            </div>

            <div className="form-group">
              <label>Anforderungen</label>
              <input 
                type="text" 
                placeholder="Füge eine Anforderung hinzu  (Drücke Enter nach jeder Anforderung)" 
                onKeyPress={addRequirement}
              />
              <ul className="requirements-list">
                {requirements.map((req, index) => (
                  <li key={index}>
                    {req}
                    <button className="delete-button" onClick={() => removeRequirement(index)}>×</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-navigation">
              <button 
                className="secondaryButton" 
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Zurück
              </button>
              <button 
                className="primaryButton" 
                onClick={nextStep}
                disabled={isSubmitting}
              >
                Weiter
              </button>
            </div>
          </>
        )}

        {/* Step 3 - Tags & Location */}
        {step === 3 && (
          <>
            <div className="form-group">
              <label>Merkmal</label>
              <input 
                type="text" 
                value={characteristic} 
                onChange={(e) => setCharacteristic(e.target.value)} 
                placeholder="Anpacker, etc." 
                required
              />
            </div>

            <div className="form-group">
              <label>Tags </label>
              <input 
                type="text" 
                placeholder="Füge einen Tag hinzu  (Drücke Enter nach jeder Anforderung)" 
                onKeyPress={addTag}
              />
                <ul className="tags-list">
                  {tags.map((tag, index) => (
                    <li key={index}>
                      {tag}
                      <button className="delete-button" onClick={() => removeTag(index)}>×</button>
                    </li>
                  ))}
                </ul>
            </div>

            <div className="form-group">
              <label>Ort</label>
              <input 
                type="text" 
                placeholder="PLZ" 
                value={location.zipCode} 
                onChange={(e) => setLocation({ ...location, zipCode: e.target.value })}
                required
              />
              <input 
                type="text" 
                placeholder="Stadt" 
                value={location.city} 
                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                required
              />
              <input 
                type="text" 
                placeholder="Straße" 
                value={location.street} 
                onChange={(e) => setLocation({ ...location, street: e.target.value })}
                required
              />
              <input 
                type="text" 
                placeholder="Hausnummer" 
                value={location.number} 
                onChange={(e) => setLocation({ ...location, number: e.target.value })}
                required
              />
            </div>

            <div className="form-navigation">
              <button 
                className="secondaryButton" 
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Zurück
              </button>
              <button 
                className="primaryButton" 
                onClick={nextStep}
                disabled={isSubmitting}
              >
                Weiter
              </button>
            </div>
          </>
        )}

        {/* Step 4 - Volunteers & Submit */}
        {step === 4 && (
          <>
            <div className="form-group">
              <label>Anzahl der freiwilligen Helfer</label>
              <input 
                type="number" 
                value={numberOfVolunteers} 
                onChange={(e) => setNumberOfVolunteers(e.target.value)} 
                placeholder="6"
                min="1"
                required
              />
            </div>

            <div className="form-navigation">
              <button 
                className="secondaryButton" 
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Zurück
              </button>
              <button 
                className="primaryButton" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Erstelle..." : "Tätigkeit erstellen"}
              </button>
            </div>
          </>
        )}
      </div>
      {/* <button className="primaryButton" onClick={submitAllEngagements}>
      Submit All Engagements
      </button> */}
    </Navbar>

  );
};

export default CreateEngagement;
