import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBBtn } from "mdbreact";
import FavButon from "../FavButton/FavButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./AlbumProfile.css";

class AlbumProfile extends Component {
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
    return !this.props.activeAlbum ? (
      <LoadingSpinner loaded={false} containerStyle="album-profile-loading" />
    ) : (
      <MDBContainer className="d-flex flex-column justify-content-center align-items-center">
        <LoadingSpinner
          loaded={this.state.imageLoaded}
          containerStyle="album-profile-spinner"
        />
        <img
          className="img-fluid img-responsive"
          alt=""
          src={this.props.activeAlbum["im:image"][2]["label"]}
          style={imageStyle}
          onLoad={this.handleImageLoaded.bind(this)}
        />
        <MDBRow>
          <div className="btn-profile-favourite">
            <FavButon
              onFavouriteClick={this.props.onFavouriteClick}
              size="fa-2x"
              id={this.props.activeAlbum["id"]["attributes"]["im:id"]}
            />
          </div>
          <MDBBtn
            className="btn-album-profile"
            size="sm"
            onClick={this.props.toggleModal}
          >
            <div className="text-white ">View Tracks</div>
          </MDBBtn>
          <MDBBtn
            className="btn-album-profile"
            size="sm"
            href={this.props.activeAlbum["id"]["label"]}
          >
            <div className="text-white ">Buy Album</div>
          </MDBBtn>
        </MDBRow>
        <div>
          <h4 className="text-white font-weight-bold">
            {this.props.activeAlbum["im:name"]["label"]}
          </h4>
          <h4 className="profile-name font-weight-bold">
            {this.props.activeAlbum["im:artist"]["label"]}
          </h4>
          <div className="white-text">
            Price: {this.props.activeAlbum["im:price"]["label"]}
          </div>
          <div className="white-text">
            Genre: {this.props.activeAlbum["category"]["attributes"]["label"]}
          </div>
          <div className="white-text">
            Released Date:{" "}
            {this.props.activeAlbum["im:releaseDate"]["attributes"]["label"]}
          </div>
          <div className="text-chop1 grey-text" style={{ fontSize: "11px" }}>
            {this.props.activeAlbum["rights"]["label"]}
          </div>
        </div>
      </MDBContainer>
    );
  }
}

export default AlbumProfile;
