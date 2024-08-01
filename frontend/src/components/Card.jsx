import { useState, useEffect } from "react";
import Badge from "./Badge";
import ProgressiveImg from "./ProgressiveImg";
import placeholderSrc from "../assets/card.png";

function Card(props) {
  const [flip, setFlip] = useState(true); //true -> front, flase -> back

  const featureBadge = { ...props.feature?.split(",") };
  const badges = Object.values(featureBadge).map((badge, idx) => (
    <Badge key={`card_ + ${idx}`} value={badge} />
  ));

  function flipCard() {
    return flip ? setFlip(false) : setFlip(true);
  }
  function translateColor(color) {
    let en = "";
    switch (color) {
      case "적":
        en = "red";
        break;
      case "황":
        en = "yellow";
        break;
      case "녹":
        en = "green";
        break;
      case "청":
        en = "blue";
        break;
      case "흑":
        en = "black";
        break;
      case "백":
        en = "white";
        break;
    }
    return en;
  }

  useEffect(() => {
    if (props.flipAll) {
      setFlip(false);
    } else {
      setFlip(true);
    }
  }, [props.flipAll]);

  return (
    <div
      className={`card ${props.category === "사건" ? "horizontal" : ""}`}
      onClick={flipCard}
    >
      <ProgressiveImg
        src={props.image_url}
        placeholderSrc={placeholderSrc}
        flip={flip}
      />
      <div
        className={`cardBack ${translateColor(props.color)} ${
          flip ? "" : "on"
        }`}
        style={{
          backgroundImage: `url(${props.image_url || ""})`,
        }}
      >
        <div>
          <div className="title">
            <div className="right">
              <div className="category">{props.category}</div>
              <div className="level">{props.level}</div>
            </div>
            <div className={`name ${props.name.length >= 9 ? "long" : ""}`}>
              {props.name}
            </div>
          </div>
          <div className="jobs">{badges}</div>
        </div>
        <div className="effect">{props.effect}</div>
        <div className="bottom">
          <div>
            <div className="rarity">{props.rarity}</div>
            <div className="id">[ {props.code} ]</div>
          </div>
          <div>
            {props.AP ? <div className="AP">{props.AP}</div> : ""}
            {props.LP ? <div className="LP">{props.LP}</div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
