import React, { Component } from "react";
import FavListItem from "../../components/FavListItem/FavListItem";
import { MDBCol, MDBMask, MDBAnimation, MDBContainer } from "mdbreact";
import "../Views.css";

class FavouriteView extends Component {
  render() {
    return (
      <div className="bg">
        <div className="view scrollbar scrollbar-primary">
          <MDBMask className="gradient"> </MDBMask>
          <MDBAnimation type="slideInDown" delay=".3s">
            <MDBCol
              style={{ paddingTop: "3rem" }}
              className="d-flex flex-column align-items-center"
            >
              {this.props.favList.length === 0 ? (
                <MDBContainer className="d-flex flex-column justify-content-center text-align-center">
                  <h2 className="global-text text-white">
                    Opps, it looks like you do not have any favourite albums at
                    the moment :,(
                  </h2>
                </MDBContainer>
              ) : (
                this.props.favList.map((album, index) => (
                  <FavListItem
                    key={index}
                    id={album["id"]["attributes"]["im:id"]}
                    index={index + 1}
                    image={album["im:image"][1]["label"]}
                    title={album["im:name"]["label"]}
                    artist={album["im:artist"]["label"]}
                    category={album["category"]["attributes"]["label"]}
                    price={album["im:price"]["label"]}
                    removeFavItem={this.props.removeFavItem}
                  ></FavListItem>
                ))
              )}
            </MDBCol>
          </MDBAnimation>
        </div>
      </div>
    );
  }
}

export default FavouriteView;
