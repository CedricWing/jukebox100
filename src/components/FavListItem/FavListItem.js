import React, { Component } from "react";
import { MDBContainer, MDBBtn } from "mdbreact";
import "./FavListItem.css";
class FavListItem extends Component {
  render() {
    return (
      <MDBContainer style={{ paddingTop: "0.5rem" }}>
        <div className="fav-item-cont">
          <strong style={{ paddingRight: "1rem" }} className="text-white">
            {this.props.index}
          </strong>
          <img
            className="img-fluid align-self-start"
            alt=""
            src={this.props.image}
          />
          <div className="fav-item-sub-cont">
            <strong className="text-white">{this.props.title}</strong>
            <strong style={{ color: "#ff2281" }}>{this.props.artist}</strong>
            <div style={{ fontSize: "13px", color: "#b8b3b5" }}>
              {this.props.category}
            </div>
            <strong
              className="text-white"
              style={{ fontWeight: 700, fontSize: "13px" }}
            >
              {this.props.price}
            </strong>
            <div style={{ width: "100%", textAlign: "end" }}>
              <MDBBtn
                onClick={() => {
                  this.props.removeFavItem(this.props.id);
                }}
                className="fav-item-btn"
                size="sm"
              >
                Remove
              </MDBBtn>
            </div>
          </div>
        </div>
      </MDBContainer>
    );
  }
}

export default FavListItem;
