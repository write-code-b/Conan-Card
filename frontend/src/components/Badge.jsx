import { useEffect, useState } from "react";

function Badge(props) {
  const [click, setClick] = useState(false);

  function clickSearchTag(e) {
    if (props.event) {
      const value = e.target.innerHTML;
      const parent = e.target.parentNode.classList[0];
      const propsList = [props.colorTags, props.categoryTags, props.rarityTags];
      const propsSetList = [
        props.setColorTags,
        props.setCategoryTags,
        props.setRarityTags,
      ];
      let i = -1;
      if (parent === "color") i = 0;
      else if (parent === "category") i = 1;
      else if (parent === "rarity") i = 2;

      if (propsList[i].includes(value)) {
        propsList[i].splice(propsList[i].indexOf(value), 1);
      } else {
        propsSetList[i]([...propsList[i], value]);
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
      >
        {props.value}
      </div>
    </>
  );
}

export default Badge;
