import React from "react";
import bubblePic from "../../images/HappyJumpBubble.png";
import bubbleBlob from "../../images/HappyJumpBlob.png";
import plusPic from "../../images/Plus.png";
import "../../styles/landingpage.css";
import cubePic from "../../images/cubesWin.png";
import cubeBlob from "../../images/cubesBlob.png";
import { useState } from "react";

const Benefits = () => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const resetHover = () => {
    setHovered(false);
  };

  return (
    <div id="benefitsSection">
      <div class="horizontalFlex padding2">
        <div id="benefitsText-1">
          <div class="horizontalText">
            <h1>Deine</h1>
            <h1 class="greenText">Vorteile</h1>
          </div>
          <p>
            Bei uns erhälst du nicht nur sozial Credits, sondern automatisch
            deinen eigenen anerkannten und automatisch generierten
            Zeitstundennachweis. Nicht mehr nötig den Unternehmen hinterher zu
            rennen - denn wir erledigen das für dich.
          </p>
          <div>
            <img
              src={plusPic}
              className={`introducingPlusPic rotateOnHover ${
                hovered ? "rotate" : ""
              }`}
              onMouseEnter={handleHover}
              onMouseLeave={resetHover}
            />
            <p class=" green">
              Dein Zeitstundennachweis passt perfekt in jede Bewerbungsmappe
              (&#62;ᴗ•) !
            </p>
          </div>
        </div>
        <div class="imageContainer">
          <img
            src={bubblePic}
            class="benefitsImage"
            alt="eine hüpfende oder tanzende Person"
          />
        </div>
      </div>

      <div class="horizontalFlex padding2">
        <div class="imageContainer">
          <img
            src={cubePic}
            class="benefitsImage"
            alt="eine hüpfende oder tanzende Person"
          />
        </div>
        <div id="benefitsText-2">
          <div class="horizontalText">
            <h1>Dein</h1>
            <h1 class="greenText">Erfolg</h1>
          </div>
          <p>
            Umsonst arbeiten ist nicht dein Ding? Machst du auch nicht! Bei
            Four+One setzen wir auf Win-Win-Situationen. Jede Tätigkeit soll
            nicht nur Spaß machen, sondern auch lehrreich und motivierend für
            dich sein. Es gibt immer was zum mitnehmen, ob Snacks,
            Insider-Wissen oder Vergütung etc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
