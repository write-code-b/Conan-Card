import { useState } from "react";

function Badge(props) {
  const [click, setClick] = useState(false);

  function clickSearchTag(e) {
    if (props.event) {
      const value = e.target.innerHTML;
      const name = e.target.dataset.name;
      const propsList = {
        color: [props.colorTags, props.setColorTags],
        category: [props.categoryTags, props.setCategoryTags],
        rarity: [props.rarityTags, props.setRarityTags],
      };
      const tags = propsList[name][0];
      const setTags = propsList[name][1];

      if (tags.includes(value)) {
        tags.splice(tags.indexOf(value), 1);
      } else {
        setTags([...tags, value]);
      }
      props.setShowResult(false);
      return click ? setClick(false) : setClick(true);
    }
  }

  return (
    <>
      <div
        className={`badge ${click ? "clicked" : ""}`}
        onClick={(e) => clickSearchTag(e)}
        data-name={props.tagName}
      >
        {props.value}
      </div>
    </>
  );
}

export default Badge;
