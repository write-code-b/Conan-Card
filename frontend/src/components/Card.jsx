import { useState } from "react";
import Badge from "./Badge";

function Card(props) {
  const featureBadge = { ...props.feature?.split(",") };
  const badges = Object.values(featureBadge).map((badge) => (
    <Badge value={badge} />
  ));

  return (
    <div className="card" onClick={props.flipCard}>
      <div
        className={`cardFront ${props.flip ? "on" : ""}`}
        style={{
          backgroundImage: `url(${props.image_url || ""})`,
        }}
      ></div>
      <div
        className={`cardBack ${props.flip ? "" : "on"}`}
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
