//Helper functional component that is tasked for data manipulation
const max_albums = parseInt(process.env.REACT_APP_MAX_NUM_ALBUM);
const DataService = {
  appendRank(data) {
    return data.map(function (album, index) {
      return { ...album, rank: index + 1 };
    });
  },

  formatFeedData(data) {
    if (data.length === 0) {
      return [new Array(max_albums).fill(null)];
    }
    let store = [];
    let res = [];
    data.forEach((album) => {
      store.push({
        title: album["im:name"]["label"],
        rank: album["rank"],
        artist: album["im:artist"]["label"],
        image: album["im:image"][2]["label"],
        id: album["id"]["attributes"]["im:id"],
      });
    });

    for (let i = 0; i < store.length; i += max_albums) {
      let arr = store.slice(i, i + max_albums);
      //Pad with null
      for (let j = arr.length; j < max_albums; j++) arr.push(null);
      res.push(arr);
    }
    return res;
  },

  filterSearchData(data, searchValue) {
    let filteredData = data.filter(function (album) {
      const albumName = album["im:name"]["label"].toLowerCase();
      const artistName = album["im:artist"]["label"].toLowerCase();
      return (
        albumName.includes(searchValue) || artistName.includes(searchValue)
      );
    });
    return filteredData;
  },

  filterFavouriteAlbums(favList, feed) {
    let res = feed.filter(function (album) {
      const albumID = album["id"]["attributes"]["im:id"];
      return favList.includes(albumID);
    });
    return res;
  },

  debounce(callback, waitTime, ...args) {
    let timeout;

    const later = () => {
      clearTimeout(timeout);
      callback(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, waitTime);
  },
};
export default DataService;
