import React from "react";
import classes from "./Card.module.css";
const Card = (props) => {
  const selectHandler = () => {
    if (!props.disable) {
      props.onClick(props.card);
    }
    console.log(props.flipped);
  };
  return (
    <div className={classes.card}>
      <div className={props.flipped ? classes.flipped : ""}>
        <img src={props.card.src} className={classes.front} alt="front"></img>
        <img
          src="/img/cover.png"
          className="back"
          alt="cover-back"
          onClick={selectHandler}
        ></img>
      </div>
    </div>
  );
};

export default Card;
