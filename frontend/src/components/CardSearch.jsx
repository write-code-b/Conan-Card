import { useState, useRef, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "./Badge";

function CardSearch(props) {
  const [searchTags, setSearchTags] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [colorTags, setColorTags] = useState([]);
  const [categoryTags, setCategoryTags] = useState([]);
  const [rarityTags, setRarityTags] = useState([]);
  const [showResult, setShowResult] = useState(false); //true -> show, false -> hide

  const color = ["적", "황", "녹", "청", "백", "흑"];
  const category = ["사건", "이벤트", "캐릭터", "파트너"];
  const rarity = ["C", "CP", "R", "RP", "SRP", "D", "PR"];

  const navigate = useNavigate();

  const cardFilteredData = () => {
    const params = {
      ...(keyword && { name: keyword }),
      ...(id && { code: id }),
      color: colorTags,
      category: categoryTags,
      rarity: rarityTags,
    };
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API}/cards`,
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

  const colorList = color.map((badge) => (
    <Badge
      value={badge}
      colorTags={colorTags}
      setColorTags={setColorTags}
      setShowResult={setShowResult}
      tagName={"color"}
      event={true}
    />
  ));
  const categoryList = category.map((badge) => (
    <Badge
      value={badge}
      categoryTags={categoryTags}
      setCategoryTags={setCategoryTags}
      setShowResult={setShowResult}
      tagName={"category"}
      event={true}
    />
  ));
  const rarityList = rarity.map((badge) => (
    <Badge
      value={badge}
      rarityTags={rarityTags}
      setRarityTags={setRarityTags}
      setShowResult={setShowResult}
      tagName={"rarity"}
      event={true}
    />
  ));

  const tagSearchList = searchTags.map(function (badge) {
    if (badge) return <Badge value={badge} event={false} />;
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
                <select name="" id="">
                  <option value="product1">
                    CT-P01 Case-Booster 01 탐정들의 조커
                  </option>
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
            {props.count}개
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
