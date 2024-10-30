import React from "react";
import HighlightBox from "./HighlightBox";
import pic1 from "../../images/GirlWithTree.jpg";
import pic2 from "../../images/hochHelfenAufStatue.jpg";
import pic3 from "../../images/sportfest.jpg";
/*Quelle Bilder: 
pic1: https://pixabay.com/de/photos/frau-bl%C3%A4tter-ge%C3%A4st-weinreben-3524224/
pic2: https://pixabay.com/de/photos/weiblich-halten-freunde-zusammen-2467210/
pic3: https://pixabay.com/de/photos/sporttreffen-college-studenten-1377029/ 

*/

const Highlights = () => {
  const highlightData = [
    {
      title: "Müll sammeln im Wald",
      place: "Schwarzwald, DE",
      likesNumber: 341,
      imageSrc: pic1,
    },
    {
      title: "Sportfest organisieren",
      place: "Stuttgart, DE",
      likesNumber: 403,
      imageSrc: pic3,
    },
    {
      title: "Stadtputz (Auch auf Statuen ;D)",
      place: "Saarbrücken, DE",
      likesNumber: 523,
      imageSrc: pic2,
    },
  ];
  return (
    <div class="pageAndSectionMargin">
      <div class="horizontalText">
        <h1>Unsere</h1>
        <h1 class="greenText">Highlights</h1>
      </div>
      <p>Einblicke in die aktuellen Ehrenämter</p>
      <div id="highlightBoxContainer" class="centerEverythingHorizontal">
        {highlightData.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            place={highlight.place}
            likesNumber={highlight.likesNumber}
            imageSrc={highlight.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
