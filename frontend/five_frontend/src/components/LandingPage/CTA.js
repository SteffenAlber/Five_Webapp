import React from "react";
import "../../styles/landingpage.css";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  function routeToLoginB2C() {
    navigate("/b2c/register");
  }
  function routeToLoginB2B() {
    navigate("/b2b/register");
  }

  return (
    <div class="centerEverythingVertical" id="ctaContainer">
      <p class="bigText">Lust ein +One zu werden?</p>
      <p class="bigText">Fang bei uns an!</p>
      <div id="ctaBtnContainer">
        <button class="primaryButton" onClick={routeToLoginB2C}>
          Freiwilliger
        </button>
        <button class="secondaryButton" onClick={routeToLoginB2B}>
          Organisation
        </button>
      </div>
    </div>
  );
};

export default CTA;
