import { useState, useEffect } from "react";
import Card from "./Card";
import Badge from "./Badge";

function CardSearch(props) {
  const [tags, setTags] = useState([]);
  const [showResult, setShowResult] = useState(false); //true -> show, false -> hide
  const color = ["적", "황", "녹", "청", "백", "흑"];
  const category = ["사건", "이벤트", "캐릭터", "파트너"];
  const rarity = ["C", "CP", "R", "RP", "SRP", "D", "PR"];

  const colorList = color.map((badge) => (
    <Badge
      value={badge}
      tags={tags}
      setTags={setTags}
      event={true}
      setShowResult={setShowResult}
    />
  ));
  const categoryList = category.map((badge) => (
    <Badge
      value={badge}
      tags={tags}
      setTags={setTags}
      event={true}
      setShowResult={setShowResult}
    />
  ));
  const rarityList = rarity.map((badge) => (
    <Badge
      value={badge}
      tags={tags}
      setTags={setTags}
      event={true}
      setShowResult={setShowResult}
    />
  ));
  const tagSearchList = tags.map((badge) => (
    <Badge value={badge} event={false} />
  ));

  function onChangeCheckbox() {
    props.flipAllCard();
  }

  function clickSearchBtn() {
    setShowResult(true);
  }

  return (
    <>
      <section id="cardSearch">
        <div className="table">
          <div className="row">
            <div>이름</div>
            <div>
              <input type="text" />
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
