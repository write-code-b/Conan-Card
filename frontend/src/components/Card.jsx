import { useState, useEffect } from "react";
import Badge from "./Badge";

function Card(props) {
  const [flip, setFlip] = useState(true); //true -> front, flase -> back

  const featureBadge = { ...props.feature?.split(",") };
  const badges = Object.values(featureBadge).map((badge) => (
    <Badge value={badge} />
  ));

  function flipCard() {
    return flip ? setFlip(false) : setFlip(true);
  }

  useEffect(() => {
    if (props.flipAll) {
      setFlip(false);
    } else {
      setFlip(true);
    }
  },[props.flipAll]);
  
  return (
    <div className="card" onClick={flipCard}>
      <div
        className={`cardFront ${flip ? "on" : ""}`}
        style={{
          backgroundImage: `url(${props.image_url || ""})`,
        }}
      ></div>
      <div
        className={`cardBack ${flip ? "" : "on"}`}
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
            <div>{props.name}</div>
          </div>
          <div className="jobs">{badges}</div>
        </div>
        <div className="effect">{props.effect}</div>
        <div className="bottom">
          <div className="rarity">{props.rarity}</div>
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
