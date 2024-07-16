import { useState } from "react";

function Badge(props) {
  const [click, setClick] = useState(false);
  function clickSearchTag() {
    return click ? setClick(false) : setClick(true);
  }
  return (
    <>
      <div
        className={`badge ${click ? "clicked" : ""}`}
        onClick={clickSearchTag}
      >
        {props.value}
      </div>
    </>
  );
}

export default Badge;
