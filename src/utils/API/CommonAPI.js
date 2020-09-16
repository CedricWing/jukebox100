//API interface for all HTTP requests
const ITUNES_RSS_URL = process.env.REACT_APP_ITUNES_RSS_URL;
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_AUTH_URL = process.env.REACT_APP_SPOTIFY_AUTH_URL;
const SPOTIFY_SEARCH_URL = process.env.REACT_APP_SPOTIFY_SEARCH_URL;
const SPOTIFY_TRACK_LIST = process.env.REACT_APP_SPOTIFY_TRACK_LIST;

const commonAPIClient = {
  getiTunesTop100Albums() {
    return fetch(ITUNES_RSS_URL, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  },
  getSpotifyAccessToken() {
    const encodedCred = btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET);
    const postRequest = {
      method: "POST",
      headers: {
        Authorization: "Basic " + encodedCred,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    };
    return fetch(SPOTIFY_AUTH_URL, postRequest);
  },
  getSpotifyAlbumData(album, artist) {
    const getParams = {
      q: album.replace(/[\W_]+/g, " ") + " " + artist,
      type: "album",
      limit: 1,
    };
    const getRequest = {
      method: "GET",
      headers: {
        Authorization:
          window.token["token_type"] + " " + window.token["access_token"],
      },
    };
    return fetch(
      SPOTIFY_SEARCH_URL +
        `?q=${encodeURIComponent(getParams.q)}&type=${encodeURIComponent(
          getParams.type
        )}&limit=${encodeURIComponent(getParams.limit)}`,
      getRequest
    );
  },
  getSpotifyAlbumTracks(albumID) {
    const getRequest = {
      method: "GET",
      headers: {
        Authorization:
          window.token["token_type"] + " " + window.token["access_token"],
      },
    };
    return fetch(
      SPOTIFY_TRACK_LIST + `/${encodeURIComponent(albumID)}/tracks`,
      getRequest
    );
  },
};

export default commonAPIClient;
