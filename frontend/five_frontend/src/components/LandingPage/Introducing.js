import React, { useState, useEffect } from "react";
import "../../styles/landingpage.css";
import pflanzenPic from "../../images/vielePflanzen.jpg";
import boxPic from "../../images/boxenUndMenschen.jpg";
import cartPic from "../../images/einkaufswagen.jpg";
import plusPic from "../../images/Plus.png";
import sportskanonePic from "../../images/introducingSportskanone.png";
import labertaschePic from "../../images/introducingLabertasche.png";
import muttersoenchenPic from "../../images/introducingMuttersönchen.png";

// box pic from: https://www.pexels.com/de-de/foto/menschen-hilfe-vielfalt-schachteln-6646918/
//shopping cart pic from:

const Introducing = () => {
  //turning "+"
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const resetHover = () => {
    setHovered(false);
  };

  //sliding diashow
  const [slideIndex, setSlideIndex] = useState(0);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // Sicherheitscheck, ob die Slides und Dots vorhanden sind
    if (slides.length === 0) return;

    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length);
    } else {
      setSlideIndex(n);
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
      if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
      }
    }
  };

  useEffect(() => {
    showSlides(slideIndex);
    const interval = setInterval(() => {
      plusSlides(1);
    }, 4000); // change picture every 4 sek's

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [slideIndex]);

  return (
    <div id="introduceSection">
      <h1>Wir sind ...</h1>
      <div class="introduceContainer">
        <div class="introduceBox">
          <img src={cartPic} alt="people planting flowers on a wall" />
          <div class="appearingTextBox">
            <h3 class="headlineIntroBox">Fun</h3>
            <div class="appearingAdditionalInfoText">
              <p class="descriptionIntroBox">
                Schnupperkursartige Ehrenamtsarbeit die Spaß macht. Ob allein
                oder in der Gruppe, du hast immer Leute um dich, die die gleiche
                Leidenschaft teilen.
              </p>
            </div>
          </div>
        </div>

        <img
          src={plusPic}
          alt="a green plus which spins when being hover on"
          className={`introducingPlusPic rotateOnHover ${
            hovered ? "rotate" : ""
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={resetHover}
        />

        <div class="introduceBox">
          <img src={boxPic} alt="people planting flowers on a wall" />
          <div class="appearingTextBox">
            <h3 class="headlineIntroBox">Proactive</h3>
            <div class="appearingAdditionalInfoText">
              <p class="descriptionIntroBox">
                Bei uns findest du proaktive Ehrenämter dir die Chance, aktiv
                etwas zu bewegen. Gemeinsam schaffen wir eine dynamische
                Community, in der jeder Einsatz zählt.
              </p>
            </div>
          </div>
        </div>

        <img
          src={plusPic}
          alt="a green plus which spins when being hover on"
          className={`introducingPlusPic rotateOnHover ${
            hovered ? "rotate" : ""
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={resetHover}
        />

        <div class="introduceBox">
          <img src={pflanzenPic} alt="people planting flowers on a wall" />
          <div class="appearingTextBox">
            <h3 class="headlineIntroBox">Original</h3>
            <div class="appearingAdditionalInfoText">
              <p class="descriptionIntroBox">
                Komme ohne langwierigen Bewerbungsprozess direkt mit Unternehmen
                in Kontakt und habe direkten Zugang zu sozialen Organisationen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 class="right">...und wer bist du?</h1>
      {/* code from: https://de.w3docs.com/tools/code-editor/3877 */}

      <div id="pictureSlidingContainer">
        <div class="slide">
          <img src={labertaschePic} alt="Person schreit in ein Megaphon" />
        </div>

        <div class="slide">
          <img
            src={muttersoenchenPic}
            alt="Person hält einen Schraubenzieher in der Hand"
          />
        </div>

        <div class="slide">
          <img
            src={sportskanonePic}
            alt="Person mit sportlichen Stirnband wirft einen Basketball in die Luft"
          />
        </div>

        <a class="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a class="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
        <div id="dotContainer">
          <span class="dot" onClick={() => currentSlide(1)}></span>
          <span class="dot" onClick={() => currentSlide(2)}></span>
          <span class="dot" onClick={() => currentSlide(3)}></span>
        </div>
      </div>
    </div>
  );
};

export default Introducing;
