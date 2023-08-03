import "./style.module.css";
import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  const starList = [];
  //obtiene el valor entero truncado del rating
  const starFillCount = Math.floor(rating);
  //obtiene el valor del rating - el entero del rating, si es mayor a .5 es true
  const hasHalfStar = rating - parseInt(rating) >= 0.5;
  //a 5 le resta la cantidad de estrellas enteras y le resta 1 si tiene true como media estrella o 0 si tiene false
  const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 : 0);

  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }

  if (hasHalfStar) {
    starList.push(<StarHalf key={"star-half"} />);
  }

  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }
  return <div>{starList}</div>;
}
