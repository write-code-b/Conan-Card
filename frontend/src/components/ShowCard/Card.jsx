import { useState, useEffect } from "react";
import * as iDBUtil from "../../utils/indexedDBUtil";
import ProgressiveImg from "./ProgressiveImg";
import placeholderSrc from "./assets/card.png";
import CardBack from "./CardBack";
import { CardWrapper } from "./styles/Card.styled";

function Card(props) {
  const [flip, setFlip] = useState(true); //true -> front, flase -> back
  const [favorites, setFavorites] = useState(
    props.favoritesList.includes(props.id),
  );

  const flipCard = () => {
    return flip ? setFlip(false) : setFlip(true);
  };

  const removeFavorites = (favoritesToRemove) => {
    const favoritesList = props.favoritesList;
    props.setFavoritesList(
      favoritesList.filter(
        (favoritesList) => favoritesList !== favoritesToRemove,
      ),
    );
  };
  const clickFavorites = (e) => {
    const store = "favorites";
    const favoritesList = props.favoritesList;
    const cardId = props.id;
    e.stopPropagation();

    const addDataToIndexedDB = async () => {
      let data = { id: cardId };
      let result = await iDBUtil.addDataToIndexedDB(store, data);
    };
    const deleteDataFromIndexedDB = async () => {
      let result = await iDBUtil.deleteDataToIndexedDB(store, cardId);
    };

    if (favorites) {
      removeFavorites(cardId);
      deleteDataFromIndexedDB();
      setFavorites(false);
    } else {
      props.setFavoritesList([...favoritesList, cardId]);
      addDataToIndexedDB();
      setFavorites(true);
    }
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
      className={`card${props.category === "사건" ? " horizontal" : ""}`}
      onClick={flipCard}
    >
      <button
        className={`favorites${favorites ? " on" : ""}`}
        onClick={clickFavorites}
      ></button>
      <ProgressiveImg
        src={props.image_url}
        placeholderSrc={placeholderSrc}
        flip={flip}
      />
      <CardWrapper
        color={props.color.split(",").map((col) => col.trim())}
        className={`cardBack${flip ? "" : " on"}`}
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