import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import CardSearch from "./CardSearch";

function CardList(props) {
  const [data, setData] = useState([]);
  const [flipAll, setFlipAll] = useState(false); //true -> front, flase -> back

  const cardData = () => {
    axios({ method: "get", url: `${process.env.REACT_APP_API}/cards` })
      .then(function (res) {
        console.log("res", res);
        setData(res.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const cards = data.map((card) => (
    <Card
      code={card.code}
      name={card.name}
      level={card.level}
      product={card.product}
      color={card.color}
      category={card.category}
      rarity={card.rarity}
      feature={card.feature}
      LP={card.LP}
      AP={card.AP}
      effect={card.effect}
      image_url={card.image_url}
      flipAll={flipAll}
    />
  ));

  function flipAllCard() {
    return flipAll ? setFlipAll(false) : setFlipAll(true);
  }

  useEffect(() => {
    cardData();
  }, []);

  return (
    <>
      <CardSearch count={data.length} flipAllCard={flipAllCard} />
      <section id="cardList">{cards}</section>
    </>
  );
}

export default CardList;
