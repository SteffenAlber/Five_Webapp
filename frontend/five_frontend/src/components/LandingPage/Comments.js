import react from "react";
import { useEffect, useState } from "react";
import "../../styles/landingpage.css";
import person1Pic from "../../images/Anna Mustermann.png";
import person2Pic from "../../images/Tobias Mustermann.png";

const Comments = () => {
  const altPic = "profile picture of commenter";
  const comments = [
    {
      name: "Anna B.",
      text: "Wow, was eine tolle Zeit! Die Kinderbetreuung hat richtig viel Spaß gemacht. Ich kann es nur weiterempfehlen!. Ich hab auch mein Zeitstundennachweis in meinen Lebenslauf beigefügt und Vorgestern einen Job gefunden. Mega!",
      profilePic: person1Pic,
    },
    {
      name: "Tobias M.",
      text: "Ich hab so coole Leute bei der Suppenküche getroffen. Ich hab bisher immer nur Nudeln gekocht und hab jetzt bemerkt wie viel Spaß das eigentlich macht mit anderen Leuten in so einer riesen Menge zu kochen. Danach gemeinsam essen - definitiv ein Win! haha",
      profilePic: person2Pic,
    },
  ];

  const [currentComment, setCurrentComment] = useState(0);

  const nextComment = () => {
    setCurrentComment((prev) => (prev + 1) % comments.length);
  };

  const prevComment = () => {
    setCurrentComment((prev) => (prev - 1 + comments.length) % comments.length);
  };

  return (
    <div class="pageAndSectionMargin">
      <h1>Teile deine Meinung</h1>
      {/* code from: https://de.w3docs.com/tools/code-editor/3877 */}

      <div class="centerEverythingHorizontal" id="commentContainer">
        <div>
          <a id="pre" onClick={prevComment}>
            &#10094;
          </a>
        </div>

        <div class="commentbox">
          <div id="commenterContainer">
            <div class="cropCircle">
              <img src={comments[currentComment].profilePic} alt={altPic} />
            </div>
            <h4>{comments[currentComment].name}</h4>
          </div>
          <div>
            <p id="commentText">{comments[currentComment].text}</p>
          </div>
        </div>
        <div>
          <a id="post" onClick={nextComment}>
            &#10095;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Comments;
