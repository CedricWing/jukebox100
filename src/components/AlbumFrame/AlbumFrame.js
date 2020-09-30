import React, { Component } from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import { MDBCol, MDBBtn, MDBRow } from "mdbreact";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./AlbumFrame.css";

const max_albums = parseInt(process.env.REACT_APP_MAX_NUM_ALBUM);
class AlbumFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCarouselIndex: 0,
    };
    this.onNextBtnPressed = this.onNextBtnPressed.bind(this);
    this.onPrevBtnPressed = this.onPrevBtnPressed.bind(this);
  }

  onNextBtnPressed() {
    if (this.props.isSearchActive) {
      this.props.setActiveSearchIndex(this.props.activeSearchIndex + 1);
    } else {
      this.setState({
        activeCarouselIndex: this.state.activeCarouselIndex + 1,
      });
    }
  }
  onPrevBtnPressed() {
    if (this.props.isSearchActive) {
      this.props.setActiveSearchIndex(this.props.activeSearchIndex - 1);
    } else {
      this.setState({
        activeCarouselIndex: this.state.activeCarouselIndex - 1,
      });
    }
  }
  render() {
    //Carousel showing albums have to use different index when search is active
    const rowIndex = this.props.isSearchActive
      ? this.props.activeSearchIndex
      : this.state.activeCarouselIndex;
    const albumList = this.props.albumList;

    return !(albumList && albumList[rowIndex]) ? (
      <LoadingSpinner loaded={false} containerStyle="album-frame-spinner" />
    ) : (
      <div>
        <MDBRow className="d-flex flex-row justify-content-center">
          {albumList[rowIndex].map((album, index) =>
            album ? (
              <AlbumCard
                key={rowIndex * max_albums + index}
                rank={album["rank"]}
                title={album["title"]}
                artist={album["artist"]}
                image={album["image"]}
                id={album["id"]}
                setActiveAlbumIndex={this.props.setActiveAlbumIndex}
                onFavouriteClick={this.props.onFavouriteClick}
              />
            ) : (
              <div
                key={rowIndex * max_albums + index}
                style={{ width: "220px", height: "300px" }}
              />
            )
          )}
        </MDBRow>
        <MDBCol className="album-frame-buttons">
          <MDBBtn
            onClick={this.onPrevBtnPressed}
            disabled={rowIndex <= 0}
            outline
            size="sm"
          >
            <div className="text-white">Previous</div>
          </MDBBtn>
          <MDBBtn
            onClick={this.onNextBtnPressed}
            disabled={rowIndex >= albumList.length - 1}
            outline
            size="sm "
          >
            <div className="text-white">Next</div>
          </MDBBtn>
        </MDBCol>
      </div>
    );
  }
}
export default AlbumFrame;
