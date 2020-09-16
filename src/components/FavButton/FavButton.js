import React from "react";
import "./FavButton.css";
import { MDBIcon } from "mdbreact";
class FavButton extends React.Component {
  constructor(props) {
    super(props);

    this.onFavouriteClickStub = this.onFavouriteClickStub.bind(this);
  }
  onFavouriteClickStub() {
    if (window.favourites.has(this.props.id)) {
      window.favourites.del(this.props.id);
    } else {
      window.favourites.set(this.props.id);
    }
    this.props.onFavouriteClick();
  }

  render() {
    return (
      <div>
        <MDBIcon
          onClick={this.onFavouriteClickStub}
          className={"btn-heart " + this.props.size}
          far={!window.favourites.has(this.props.id)}
          icon="heart"
        />
      </div>
    );
  }
}

export default FavButton;
