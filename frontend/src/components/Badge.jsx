import { useEffect, useState } from "react";

function Badge(props) {
  const [click, setClick] = useState(false);

  function clickSearchTag(e) {
    if (props.event) {
      const value = e.target.innerHTML;
      if (props.tags.includes(value)) {
        props.tags.splice(props.tags.indexOf(value), 1);
      } else {
        props.setTags([...props.tags, value]);
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
