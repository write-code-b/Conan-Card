import { useState, useEffect } from "react";
import ProgressiveImg from "./ProgressiveImg";
import placeholderSrc from "./assets/card.png";
import CardBack from "./CardBack";
import { CardWrapper } from "./styles/Card.styled";

function Card(props) {
  const [flip, setFlip] = useState(true); //true -> front, flase -> back

  const flipCard = () => {
    return flip ? setFlip(false) : setFlip(true);
  };

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
      <CardWrapper
        color={props.color.split(",").map((col) => col.trim())}
        className={`cardBack ${flip ? "" : "on"}`}
      >
        <CardBack
          code={props.code}
          name={props.name}
          level={props.level}
          level_raw={props.level_raw}
          category={props.category}
          rarity={props.rarity}
          feature={props.feature}
          LP={props.LP}
          AP={props.AP}
          effect={props.effect}
        />
      </CardWrapper>
    </div>
  );
}

export default Card;
