import Badge from "./Badge";

function CardBack(props) {
  const featureBadge = { ...props.feature?.split(",") };
  const badges = Object.values(featureBadge).map((badge, idx) => (
    <Badge key={`card_ + ${idx}`} value={badge} />
  ));
  
  return (
    <>
      <div>
        <div className="title">
          <div className="right">
            <div className="category">{props.category}</div>
            <div className="level">
              {props.level === "-1" ? props.level_raw : props.level}
            </div>
          </div>
          <div className={`name ${props.name.length >= 10 ? "long" : ""}`}>
            {props.name}
          </div>
        </div>
        <div className="jobs">{badges}</div>
      </div>
      <div className="effect">{props.effect}</div>
      <div className="bottom">
        <div>
          <div className="rarity">{props.rarity}</div>
          <div className="id">[ {props.code} ]</div>
        </div>
        <div>
          {props.AP ? <div className="AP">{props.AP}</div> : ""}
          {props.LP ? <div className="LP">{props.LP}</div> : ""}
        </div>
      </div>
    </>
  );
}

export default CardBack;
