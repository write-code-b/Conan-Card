import { useState, useRef, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "./Badge";
import ProductList from "./ProductList";
import {
  PRODUCT_LIST,
  COLOR_LIST,
  CATEGORY_LIST,
  RARITY_LIST,
} from "../data/CardData";

function CardSearch(props) {
  const [searchTags, setSearchTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [productCode, setproductCode] = useState(0);
  const [colorTags, setColorTags] = useState([]);
  const [categoryTags, setCategoryTags] = useState([]);
  const [rarityTags, setRarityTags] = useState([]);
  const [showResult, setShowResult] = useState(false); //true -> show, false -> hide

  const navigate = useNavigate();

  const cardFilteredData = () => {
    const params = {
      ...(keyword && { name: keyword }),
      ...(id && { code: id }),
      product: productCode,
      color: colorTags,
      category: categoryTags,
      rarity: rarityTags,
    };
    axios({
      method: "get",
      baseURL: process.env.REACT_APP_API,
      url: "/cards",
      withCredentials: true,
      params: params,
      paramsSerializer: {
        indexes: true,
      },
    })
      .then(function (res) {
        props.setData(res.data);
        navigate({
          pathname: "/cards",
          search: createSearchParams(params).toString(),
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const productList = PRODUCT_LIST.map((product) => (
    <ProductList id={product.id} name={product.name} />
  ));
  const colorList = COLOR_LIST.map((color) => (
    <Badge
      key={color.id}
      value={color.name}
      colorTags={colorTags}
      setColorTags={setColorTags}
      setShowResult={setShowResult}
      tagName={"color"}
      event={true}
    />
  ));
  const categoryList = CATEGORY_LIST.map((category) => (
    <Badge
      key={category.id}
      value={category.name}
      categoryTags={categoryTags}
      setCategoryTags={setCategoryTags}
      setShowResult={setShowResult}
      tagName={"category"}
      event={true}
    />
  ));
  const rarityList = RARITY_LIST.map((rarity) => (
    <Badge
      key={rarity.id}
      value={rarity.name}
      rarityTags={rarityTags}
      setRarityTags={setRarityTags}
      setShowResult={setShowResult}
      tagName={"rarity"}
      event={true}
    />
  ));

  const tagSearchList = searchTags.map(function (badge, idx) {
    if (badge)
      return <Badge key={`search_ + ${idx}`} value={badge} event={false} />;
  });

  function onChangeCheckbox() {
    props.flipAllCard();
  }

  function showTags() {
    setSearchTags([id, keyword, ...colorTags, ...rarityTags, ...categoryTags]);
    setShowResult(true);
  }

  const clickSearchBtn = () => {
    showTags();
    cardFilteredData();
  };

  const onChangeProduct = (event) => {
    setproductCode(event.target.value);
  };

  const onChangeName = (event) => {
    setKeyword(event.target.value);
  };

  const onChangeCode = (event) => {
    setId(event.target.value.toUpperCase());
  };

  return (
    <>
      <section id="cardSearch">
        <div className="table">
          <div className="row">
            <div>이름</div>
            <div>
              <input type="text" onChange={onChangeName} value={keyword} />
            </div>
          </div>
          <div className="row">
            <div>ID</div>
            <div>
              <input type="text" onChange={onChangeCode} value={id} />
            </div>
          </div>
          <div className="row">
            <div>프로덕트</div>
            <div>
              <form action="#">
                <label htmlFor=""></label>
                <select name="" id="" onChange={onChangeProduct}>
                  {productList}
                </select>
              </form>
            </div>
          </div>
          <div className="row">
            <div>색상</div>
            <div className="color">{colorList}</div>
          </div>
          <div className="row">
            <div>카테고리</div>
            <div className="category">{categoryList}</div>
          </div>
          <div className="row">
            <div>레어리티</div>
            <div className="rarity">{rarityList}</div>
          </div>
        </div>
        <button id="searchBtn" onClick={clickSearchBtn}>
          검색
        </button>
        <div className="result">
          <div>
            <div className="count">{props.count}개</div>
            <div className="tags">{showResult && tagSearchList}</div>
          </div>
          <div className="flip">
            <input
              type="checkbox"
              onChange={({ target: { checked } }) => onChangeCheckbox(checked)}
            />
            카드 뒤집기
          </div>
        </div>
      </section>
    </>
  );
}

export default CardSearch;
