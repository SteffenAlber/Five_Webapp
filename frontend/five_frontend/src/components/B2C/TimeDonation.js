import React, { useEffect, useState } from "react";
import "../../styles/TimeDonation.css";
import PDFPlaceholder from "../../images/PDFPlaceholder.png";
import { doGetRequest } from "../../backendInterface/BackendInterface";
import Navbar from "../layout/Layout";

const TimeDonation = () => {
  const [userData, setUserData] = useState(null);
  const [upcomingEngagements, setUpcomingEngagements] = useState([]);
  const [previousEngagements, setPreviousEngagements] = useState([]);
  const [visibleCountUpcoming, setVisibleCountUpcoming] = useState(3);
  const [visibleCountPrevious, setVisibleCountPrevious] = useState(3);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const addMockEngagements = () => {
      const mockEngagements = [
        {
          id: "mock1",
          title: "Kältebus mitfahren",
          startTime: "2023-11-18T22:00:00",
          endTime: "2023-11-19T06:00:00",
          organizer: { organizationName: "Organisator A" },
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
          volunteers: { numberOfVolunteers: 2, acceptedVolunteers: ["user1"] },
        },
        {
          id: "mock2",
          title: "Fahrrad Reparatur Aktion",
          startTime: "2023-11-10T10:00:00",
          endTime: "2023-11-10T17:00:00",
          organizer: { organizationName: "Organisator B" },
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
          volunteers: { numberOfVolunteers: 2, acceptedVolunteers: [] },
        },
        {
          id: "1",
          title: "Müll sammeln",
          startTime: "2023-10-01T10:00:00Z",
          endTime: "2023-10-01T12:00:00Z",
          organizer: { organizationName: "Umweltverein" },
          location: { street: "Hauptstraße", number: "123", city: "Berlin", zipCode: "10115" },
          volunteers: { numberOfVolunteers: 5, acceptedVolunteers: ["user1", "user2"] }
        },
      ];
      setPreviousEngagements(mockEngagements);
      setTotalHours(calculateTotalHours(mockEngagements));
    };

    addMockEngagements();
  }, []);
  



  const userId = localStorage.getItem("userID");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
  };

  const calculateTotalHours = (engagements) => {
    let totalHours = 0;
    let totalMinutes = 0;

    engagements.forEach((engagement) => {
      const { hours, minutes } = calculateDuration(
        engagement.startTime,
        engagement.endTime
      );
      totalHours += hours;
      totalMinutes += minutes;
    });

    const fractionalHours = totalMinutes / 60;
    const totalTime = totalHours + fractionalHours;

    return totalTime.toFixed(1);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await doGetRequest("/users/" + userId);
        console.log("User data fetched:", response.data);
        setUserData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchPreviousEngagements = async () => {
      if (userData && userData.previousEngagements.length > 0) {
        try {
          const previousEngagementIds = userData.previousEngagements;
          const previousPromises = previousEngagementIds.map((engagementId) =>
            doGetRequest(`/engagements/e/${engagementId}`)
          );
          const previousResponses = await Promise.all(previousPromises);
          const previousData = previousResponses.map((response) => response.data);
          setPreviousEngagements(previousData);

          setTotalHours(calculateTotalHours(previousData));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPreviousEngagements();
  }, [userData]);

  useEffect(() => {
    const fetchUpcomingEngagements = async () => {
      if (userData && Array.isArray(userData.upcomingEngagements) && userData.upcomingEngagements.length > 0) {
        try {
          setUpcomingEngagements(userData.upcomingEngagements);
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (userData) {
      fetchUpcomingEngagements();
    }
  }, [userData]);

  const handleShowMoreUpcoming = () => {
    setVisibleCountUpcoming((prev) => prev + 2);
  };

  const handleShowMorePrevious = () => {
    setVisibleCountPrevious((prev) => prev + 2);
  };

  const downloadCertificate = async () => {
    try {
      const response = await doGetRequest(`/certificate/${userId}`);
      const pdfData = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(pdfData);
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the certificate:", error);
    }
  };

  return (
    <Navbar>
      <div className="pageAndSectionMargin" id="angemeldeteTätigkeiten">
        <h1>Angemeldete Tätigkeiten</h1>
        <div className={`engagements-container ${upcomingEngagements.length <= 3 ? 'small-container' : ''}`}>
          <ul className="engagement-list">
            {upcomingEngagements.slice(0, visibleCountUpcoming).map((engagement) => {
              const { hours, minutes } = calculateDuration(
                engagement.startTime,
                engagement.endTime
              );
              return (
                <li key={engagement.id} className="engagement-item">
                  <div className="engagement-info">
                    <span className="engagement-date">
                      {formatDate(engagement.startTime)}
                    </span>
                    <span className="engagement-title">{engagement.title}</span>
                    <span className="engagement-duration">
                      {hours}h {minutes}m
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {upcomingEngagements.length > 3 && visibleCountUpcoming < upcomingEngagements.length && (
            <button className="primaryButton" onClick={handleShowMoreUpcoming}>
              Show More
            </button>
          )}
        </div>

        <h1>Stundenkonto</h1>
        <p className="subline">Sie haben insgesamt {totalHours} Stunden gespendet.</p>

        <div className={`engagements-container ${previousEngagements.length <= 3 ? 'small-container' : ''}`}>
          <ul className="engagement-list">
            {previousEngagements.slice(0, visibleCountPrevious).map((engagement) => {
              const { hours, minutes } = calculateDuration(
                engagement.startTime,
                engagement.endTime
              );
              return (
                <li key={engagement.id} className="engagement-item">
                  <div className="engagement-info">
                    <span className="engagement-date">
                      {formatDate(engagement.startTime)}
                    </span>
                    <span className="engagement-title">{engagement.title}</span>
                    <span className="engagement-duration">
                      {hours}h {minutes}m
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {previousEngagements.length > 3 && visibleCountPrevious < previousEngagements.length && (
            <button className="primaryButton" onClick={handleShowMorePrevious}>
              Show More
            </button>
          )}
        </div>

        <div className="certificate-section">
          <h1>Zeitspendennachweis</h1>
          <p className="subline">
            Hier kannst du deinen Zeitspendennachweis einsehen und als PDF herunterladen.
          </p>
          <div className="pdf-preview-container">
            <img
                className="pdf-preview"
                src={PDFPlaceholder}
                alt="PDF Preview"
            />
            <div className="button-container">
              <button className="primaryButton" onClick={downloadCertificate}>
                Download
              </button>
            </div>
          </div>
        </div>

      </div>
    </Navbar>
  );
};

export default TimeDonation;
