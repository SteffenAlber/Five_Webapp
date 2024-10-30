import React, { useEffect, useState } from "react";
import "../../styles/Engagements.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { doGetRequest } from "../../backendInterface/BackendInterface";
import Navbar from "../layout/Layout";


const EngagementDetail = () => {
  // saving offer data from backend call
  const [organisationData, setOrganisationData] = useState(null);

  //reading current url and getting id from it
  const urlPath = useLocation().pathname;
  let organisationId = urlPath.split("/").pop();

  //getting data for offer
  const fetchOrganisationData = async () => {
    try {
      const response = await doGetRequest("/engagements/" + organisationId);
      console.log(response);
      setOrganisationData(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrganisationData();
  }, [urlPath]);

  console.log(organisationData);

  return (
    <Navbar>
    <div>
      <h1>Hilfe bei der Suppenküche</h1>
      <p className="additionalOfferInfoText">
        Aushilfe bei der Suppenküche gesucht
      </p>
      <div className="additionalOfferInfoText setToOppositeEnds">
        <div className="centerEverythingHorizontal gapLarge">
          <p>09.02.2021</p>
          <p>10.30 Uhr - 3.5 std.</p>
          <p>3 Personen</p>
          <p>Musterstraße 1, 72222 Stuttgart</p>
        </div>
        <div className="centerEverythingHorizontal">
          <p className="tag">Medizin</p>
          <p className="tag">Tratschtante</p>
          <p className="tag">Essen</p>
        </div>
      </div>

      <div className="gridContainer">
        <div className="gridItem centerEverythingVertical">
          <h3 className="offerInformationHeadline">Beschreibung</h3>
        </div>
        <div className="gridItem centerEverythingVertical">
          Wir suchen 2 weitere, aufgeschlossene und engagierte Personen, die uns
          gerne bei der Essensausgabe und in der Küche zur Hand gehen. Dein
          Arbeitseinsatz wird zwischen 3 und 4 Stunden betragen und startet um
          10:00 Uhr, direkt bei uns in der Suppenküche. Bitte bringe wenn
          möglich deine eigene Schürze mit. Haarnetze und Handschuhe bekommst du
          von uns. Möglicherweise anfallende Anreisekosten und Parkgebühren
          erstatten wir nach Absprache gerne vollständig. Parkmöglichkeiten gibt
          es in der Tiefgarage direkt gegenüber.
        </div>

        <div className="gridItem centerEverythingVertical">
          <h3 className="offerInformationHeadline">Aufgaben</h3>
        </div>
        <div className="gridItem centerEverythingVertical">
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
          Du erweiterst deine Social Skills und lernst interessante Menschen
          kennen. Du lernst den Ablauf in einer Suppenküche kennen und wie wir
          unsere Gerichte zubereiten und an bedürftige Menschen verteilen. Du
          lernst neue und günstige Rezepte. Alle Helfer dürfen
          selbstverständlich kostenlos mitessen. Für Getränke ist auch gesorgt.
        </div>

        <div className="gridItem centerEverythingVertical">
          <h3 className="offerInformationHeadline">Anforderungen</h3>
        </div>
        <div className="gridItem centerEverythingVertical">
          Keine Anforderungen
        </div>
      </div>
      <div>
        <button className="primaryButton">Anmelden</button>
        {/* <FontAwesomeIcon icon={faArrowRight} /> */}
      </div>
    </div>
    </Navbar>
  );
};

export default EngagementDetail;
