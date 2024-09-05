import { useState, useEffect } from "react";

function CardSearchResult(props) {
  const onChangeCheckbox = () => {
    props.flipAllCard();
  };

  const onChangeOption = (event) => {
    props.setSortOption(event.target.value);
    console.log("click", props.sortOption);
  };

  useEffect(() => {
    props.cardFilteredData();
  }, [props.sortOption]);

  return (
    <div className="result">
      <div className="tags">{props.showResult && props.tagSearchList}</div>
      <div className="option">
        <div className="count">{props.count}개</div>
        <div>
          <form action="#">
            <label htmlFor=""></label>
            <select defaultValue="default" onChange={onChangeOption}>
              <option value="default">정렬</option>
              <option value="level_high">레벨 높은순</option>
            </select>
          </form>
          <div className="flip">
            <input
              type="checkbox"
              onChange={({ target: { checked } }) => onChangeCheckbox(checked)}
            />
            카드 뒤집기
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSearchResult;
