import React, { Component } from "react";
import AlbumProfile from "../../components/AlbumProfile/AlbumProfile";
import AlbumFrame from "../../components/AlbumFrame/AlbumFrame";
import SongList from "../../components/SongList/SongList";
import SearchBox from "../../components/SearchBox/SearchBox";
import commonAPIClient from "../../utils/API/CommonAPI";
import standardHandle from "../../utils/API/StandardHandle";
import { MDBRow, MDBMask, MDBContainer, MDBCol, MDBAnimation } from "mdbreact";
import "../Views.css";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeAlbumIndex: 0,
      isSearchActive: false,
      activeSearchIndex: 0,
      activeAlbumTracks: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.setActiveAlbumIndex = this.setActiveAlbumIndex.bind(this);
    this.setSearchActive = this.setSearchActive.bind(this);
    this.onFavouriteClick = this.onFavouriteClick.bind(this);
    this.setActiveSearchIndex = this.setActiveSearchIndex.bind(this);
  }

  setSearchActive = (flag) => {
    this.setState({
      isSearchActive: flag,
    });
  };
  setActiveSearchIndex = (index) => {
    this.setState({
      activeSearchIndex: index,
    });
  };
  setActiveAlbumIndex = (index) => {
    this.setState({
      activeAlbumIndex: index,
    });
  };

  onFavouriteClick = () => {
    this.setState({ key: Math.random() });
  };
  /* 
    Toggles the Modal when "View tracks button is pressed"
    1. Do a search query on spotify based on album name and artist
    2. Retrieve list of tracks for that particular album 
  
  */
  toggleModal = () => {
    if (this.state.modal === false) {
      const albumData = this.props.feed[this.state.activeAlbumIndex];

      //1. Search query based on album name and artist
      commonAPIClient
        .getSpotifyAlbumData(
          albumData["im:name"]["label"],
          albumData["im:artist"]["label"]
        )
        .then(async (response) => {
          const successCallback = async () => {
            await response.json().then((data) => {
              if (data["albums"]["items"].length !== 0) {
                //2. Retrive Album tracks
                commonAPIClient
                  .getSpotifyAlbumTracks(data["albums"]["items"][0]["id"])
                  .then(async (response) => {
                    const successCallback = async () => {
                      var data = await response.json();
                      this.setState({ activeAlbumTracks: data["items"] });
                    };
                    const failureCallback = async () => {
                      console.log(
                        "Error: Unable to obtain Spotify album tracks"
                      );
                    };
                    standardHandle(response, successCallback, failureCallback);
                  });
              }
            });
          };
          const failureCallback = async () => {
            console.log("Error: Unable to obtain Spotify album data");
          };
          standardHandle(response, successCallback, failureCallback);
        });
      this.setState({
        modal: true,
      });
    } else {
      this.setState({
        modal: false,
        activeAlbumTracks: [],
      });
    }
  };

  render() {
    return (
      <div className="bg">
        <div className="view scrollbar scrollbar-primary">
          <MDBMask className="gradient"> </MDBMask>

          <MDBCol>
            <MDBContainer
              fluid
              style={{ paddingTop: "5rem" }}
              className="mt-2 home-container"
            >
              <MDBAnimation type="fadeInRight" delay=".3s">
                <AlbumProfile
                  activeAlbum={this.props.feed[this.state.activeAlbumIndex]}
                  toggleModal={this.toggleModal}
                  onFavouriteClick={this.onFavouriteClick}
                ></AlbumProfile>
              </MDBAnimation>
            </MDBContainer>
            <MDBContainer fluid className="mt-2 home-container">
              <MDBAnimation type="fadeInLeft" delay=".3s">
                <MDBRow className="album-frame-header">
                  <h3 className="h3-responsive font-weight-bold white-text">
                    Popular Albums
                  </h3>
                  <SearchBox
                    setSearchActive={this.setSearchActive}
                    reloadData={this.props.reloadData}
                    setActiveSearchIndex={this.setActiveSearchIndex}
                  ></SearchBox>
                </MDBRow>
                <AlbumFrame
                  setActiveAlbumIndex={this.setActiveAlbumIndex}
                  albumList={this.props.albumList}
                  isSearchActive={this.state.isSearchActive}
                  onFavouriteClick={this.onFavouriteClick}
                  setActiveSearchIndex={this.setActiveSearchIndex}
                  activeSearchIndex={this.state.activeSearchIndex}
                ></AlbumFrame>
              </MDBAnimation>
            </MDBContainer>
          </MDBCol>
          <SongList
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            activeAlbumTracks={this.state.activeAlbumTracks}
            activeAlbum={this.props.feed[this.state.activeAlbumIndex]}
          ></SongList>
        </div>
      </div>
    );
  }
}

export default HomeView;
