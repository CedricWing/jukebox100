import React, { useContext } from "react";
import "./FavButton.css";
import { MDBIcon } from "mdbreact";
import { FavouritesContext } from "../../utils/Cookies/FavouritesContext";

const FavButton = (props) => {
  const { hasFav, setFav, delFav } = useContext(FavouritesContext);

  const onFavouriteClickStub = () => {
    if (hasFav(props.id)) {
      delFav(props.id);
    } else {
      setFav(props.id);
    }
    props.onFavouriteClick();
  };

  return (
    <div>
      <MDBIcon
        onClick={onFavouriteClickStub}
        className={"btn-heart " + props.size}
        far={!hasFav(props.id)}
        icon="heart"
      />
    </div>
  );
};

export default FavButton;
