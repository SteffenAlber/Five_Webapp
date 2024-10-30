import React from "react";
import ImageHero from "../../images/holdinghandssidecroped.jpg";
import "../../styles/landingpage.css";
import { useNavigate } from "react-router-dom";

//TODO: Fix zu großes Laden vom Bild
const Hero = () => {
  const navigate = useNavigate();

  function routeToOffers() {
    navigate("/b2c/angebote");
  }
  return (
    <div>
      <img
        src={ImageHero}
        id="heroPicture"
        alt="zwei Hände die einander greifen"
      />
      <div class="overlay centerColumn">
        <h1 id="heroText">Mach den Unterschied</h1>
        <p>
          Finde das passende Ehrenamt für dich. Du bist noch unentschlossen, was
          du machen willst? Probiere unser Quiz und entdecke deine
          Möglichkeiten. Starte jetzt und mach den Unterschied!
        </p>
        <div>
          <button class="primaryButton" onClick={routeToOffers}>
            Zu den Angeboten
          </button>
          <button class="secondaryButton">Mache das Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
