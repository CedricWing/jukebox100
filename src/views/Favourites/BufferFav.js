import React, { useContext, useState, useEffect } from "react";
import DataService from "../../utils/Service/DataService";
import { FavouritesContext } from "../../utils/Cookies/FavouritesContext";
import FavouriteView from "./Favourite";

const BufferFav = (props) => {
  const { data, delFav } = useContext(FavouritesContext);
  const [favList, setFavList] = useState([]);

  const removeFavItem = (id) => {
    delFav(id);
    const idList = data;
    const favList = DataService.filterFavouriteAlbums(idList, props.feed);
    setFavList(favList);
  };

  useEffect(() => {
    const idList = data;
    const favList = DataService.filterFavouriteAlbums(idList, props.feed);
    setFavList(favList);
  }, [data, props.feed]);

  return <FavouriteView removeFavItem={removeFavItem} favList={favList} />;
};

export default BufferFav;
