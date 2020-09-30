import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdbreact";
import FavButon from "../FavButton/FavButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./AlbumCard.css";

class AlbumCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
    };
  }
  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  render() {
    const imageStyle = !this.state.imageLoaded ? { display: "none" } : {};
    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          this.props.setActiveAlbumIndex(this.props.rank - 1);
        }}
      >
        <MDBCard>
          <MDBCardBody>
            <MDBRow className="d-flex flex-row justify-content-between">
              <div className="text-white">#{this.props.rank}</div>
              <FavButon
                onFavouriteClick={this.props.onFavouriteClick}
                size="fa-lg"
                id={this.props.id}
                image={this.props.image}
                title={this.props.title}
                artist={this.props.artist}
              />
            </MDBRow>
            <MDBCol className="d-flex flex-column align-items-center">
              <LoadingSpinner
                loaded={this.state.imageLoaded}
                containerStyle="album-card-spinner"
              />
              <img
                className="img-fluid "
                alt=""
                src={this.props.image}
                style={imageStyle}
                onLoad={this.handleImageLoaded.bind(this)}
              />
            </MDBCol>
            <div className="white-text text-chop3">{this.props.title}</div>
            <div className="grey-text  text-chop2">{this.props.artist}</div>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default AlbumCard;
