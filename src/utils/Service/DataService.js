//Helper functional component that is tasked for data manipulation
const DataService = {
  appendRank(data) {
    return data.map(function (album, index) {
      return { ...album, rank: index + 1 };
    });
  },

  formatFeedData(data) {
    if (data.length === 0) {
      return [new Array(6).fill(null)];
    }
    var store = [];
    var res = [];
    data.forEach((album) => {
      store.push({
        title: album["im:name"]["label"],
        rank: album["rank"],
        artist: album["im:artist"]["label"],
        image: album["im:image"][2]["label"],
        id: album["id"]["attributes"]["im:id"],
      });
    });

    for (var i = 0; i < store.length; i += 6) {
      var arr = store.slice(i, i + 6);
      //Pad with null
      for (var j = arr.length; j < 6; j++) arr.push(null);
      res.push(arr);
    }
    return res;
  },

  filterSearchData(data, searchValue) {
    var filteredData = data.filter(function (album) {
      var albumName = album["im:name"]["label"].toLowerCase();
      var artistName = album["im:artist"]["label"].toLowerCase();
      return (
        albumName.includes(searchValue) || artistName.includes(searchValue)
      );
    });
    return filteredData;
  },

  filterAlbums(favList, feed) {
    var res = feed.filter(function (album) {
      var albumID = album["id"]["attributes"]["im:id"];
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
