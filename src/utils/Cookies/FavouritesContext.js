import React, { createContext, Component } from "react";
import Cookies from "js-cookie";
if (!Cookies.get("favourites")) Cookies.set("favourites", "", { expires: 365 });
export const FavouritesContext = createContext();

class FavouritesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Cookies.get("favourites").split(","),
    };
  }

  hasFav = (id) => {
    return this.state.data.indexOf(id) !== -1;
  };

  delFav = (id) => {
    if (!this.hasFav(id)) return;
    let newFavList = this.state.data;
    newFavList.splice(newFavList.indexOf(id), 1);
    Cookies.set("favourites", newFavList.join(","));
    this.setState({
      data: newFavList,
    });
  };

  setFav = (id) => {
    if (this.hasFav(id)) return;
    let newFavList = [...this.state.data, id];
    Cookies.set("favourites", newFavList.join(","));
    this.setState({
      data: newFavList,
    });
  };
  render() {
    return (
      <FavouritesContext.Provider
        value={{
          ...this.state,
          hasFav: this.hasFav,
          setFav: this.setFav,
          delFav: this.delFav,
        }}
      >
        {this.props.children}
      </FavouritesContext.Provider>
    );
  }
}
export default FavouritesProvider;
