import React, { Component } from "react";
import DataService from "../../utils/Service/DataService";
import FavouriteView from "./Favourite";
class BufferFav extends Component {
  constructor(props) {
    super(props);
    this.state = { favList: [] };
    this.removeFavItem = this.removeFavItem.bind(this);
    this.setFavList = this.setFavList.bind(this);
  }

  componentDidMount() {
    this.setFavList();
  }
  setFavList = () => {
    var idList = window.favourites.get();
    var favList = DataService.filterAlbums(idList, this.props.feed);
    this.setState({
      favList: favList,
    });
  };
  removeFavItem = (id) => {
    window.favourites.del(id);
    this.setFavList();
  };

  render() {
    return (
      <FavouriteView
        removeFavItem={this.removeFavItem}
        favList={this.state.favList}
      ></FavouriteView>
    );
  }
}

export default BufferFav;
