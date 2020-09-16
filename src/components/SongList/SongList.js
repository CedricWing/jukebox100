import React, { Component } from "react";
import {
  MDBModal,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import "./SongList.css";

class SongList extends Component {
  render() {
    var activeAlbumTracks = this.props.activeAlbumTracks;
    return (
      <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <MDBModalHeader
          className="text-center"
          titleClass="w-100 font-weight-bold"
          toggle={this.props.toggle}
        >
          {this.props.activeAlbum["im:name"]["label"]}
        </MDBModalHeader>
        <MDBTable borderless className="modal-style" hover>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Spotify</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {!activeAlbumTracks || activeAlbumTracks.length === 0 ? (
              <tr className="modal-no-tracks">
                <td>
                  Opps, we are unable to find tracks on Spotify for this album!
                </td>
              </tr>
            ) : (
              activeAlbumTracks.map((track, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{track["name"]}</td>
                  <td>
                    <a href={track["external_urls"]["spotify"]}>
                      <i className="fab fa-spotify modal-table-btn" />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      </MDBModal>
    );
  }
}

export default SongList;
