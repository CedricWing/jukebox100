import React from "react";
import AlbumCard from "../AlbumCard/AlbumCard";
import { MDBCol, MDBBtn, MDBRow } from "mdbreact";
import "./AlbumFrame.css";
class AlbumFrame extends React.Component {
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
    var rowIndex = this.props.isSearchActive
      ? this.props.activeSearchIndex
      : this.state.activeCarouselIndex;
    var isArrayLoaded = this.props.albumList[rowIndex];

    return (
      <div>
        <MDBRow className="d-flex flex-row justify-content-center">
          {!isArrayLoaded ? (
            <div></div>
          ) : (
            this.props.albumList[rowIndex].map((album, index) =>
              album ? (
                <AlbumCard
                  key={rowIndex * 6 + index}
                  rank={album["rank"]}
                  title={album["title"]}
                  artist={album["artist"]}
                  image={album["image"]}
                  id={album["id"]}
                  setActiveAlbumIndex={this.props.setActiveAlbumIndex}
                  onFavouriteClick={this.props.onFavouriteClick}
                ></AlbumCard>
              ) : (
                <div
                  key={rowIndex * 6 + index}
                  style={{ width: "220px", height: "300px" }}
                ></div>
              )
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
            disabled={rowIndex >= this.props.albumList.length - 1}
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
