import React from "react";
import "./AlbumCard.css";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdbreact";
import FavButon from "../FavButton/FavButton";
class AlbumCard extends React.Component {
  render() {
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
                size={"fa-lg"}
                id={this.props.id}
                image={this.props.image}
                title={this.props.title}
                artist={this.props.artist}
              ></FavButon>
            </MDBRow>
            <MDBCol>
              <img className="img-fluid " alt="" src={this.props.image} />
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
