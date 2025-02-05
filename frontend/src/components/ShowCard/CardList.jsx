import { useState, useEffect } from "react";
import axios from "axios";
import * as iDBUtil from "../../utils/indexedDBUtil";
import Card from "./Card";
import CardSearch from "./CardSearch";
import SwipeableEdgeDrawer from "../Favorites/SwipeableEdgeDrawer";

function CardList() {
  const [data, setData] = useState([]);
  const [flipAll, setFlipAll] = useState(false); //true -> front, flase -> back
  const [favoritesList, setFavoritesList] = useState([]);
  const [favoritesCard, setFavoritesCard] = useState([]);

  const cardData = () => {
    axios({
      method: "get",
      baseURL: process.env.REACT_APP_API,
      url: "/cards",
      withCredentials: true,
    })
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  const cards = data.map((card) => (
    <Card
      key={card._id}
      id={card._id}
      code={card.code}
      name={card.name}
      level={card.level}
      level_raw={card.level_raw}
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
      favoritesList={favoritesList}
      setFavoritesList={setFavoritesList}
    />
  ));

  const flipAllCard = () => {
    return flipAll ? setFlipAll(false) : setFlipAll(true);
  };

  const getAllDataFromIndexedDB = async (store) => {
    let data = await iDBUtil.getAllDataFromIndexedDB(store);
    const favorites = data.map((favorites) => {
      return favorites.id;
    });
    setFavoritesList(favorites);
  };

  const favoriteData = () => {
    const favoritesCards = [];
    favoritesList.forEach((cardId) => {
      const card = data.filter((card) => {
        return card._id === cardId;
      });
      favoritesCards.push(...card);
    });
    return favoritesCards;
  };

  async function favorite() {
    const store = "favorites";
    const response = await getAllDataFromIndexedDB(store);
    const result = favoriteData();
    const cards = result.map((card) => (
      <Card
        key={card._id}
        id={card._id}
        code={card.code}
        name={card.name}
        level={card.level}
        level_raw={card.level_raw}
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
        favoritesList={favoritesList}
        setFavoritesList={setFavoritesList}
      />
    ));
    setFavoritesCard(cards);
  }

  useEffect(() => {
    cardData();
    favorite();
  }, []);

  useEffect(() => {
    favorite();
  }, [favoritesList]);

  return (
    <main>
      <CardSearch
        setData={setData}
        count={data.length}
        flipAllCard={flipAllCard}
      />
      <section id="cardList">{cards}</section>
      <SwipeableEdgeDrawer favoritesCard={favoritesCard} />
    </main>
  );
}

export default CardList;
