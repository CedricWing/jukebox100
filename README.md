# Desciption

JukeBox100 is a music web application that allows a user to:

1. Browse top 100 albums from itunes rss feed
2. Filter albums based on search query
3. BONUS FEATURE! - Mark albums as favourites (Stored in cookies)
4. BONUS FEATURE! - Browse album tracks via Spotify API

# Instructions

Requires node.js

Start Local Development Server (default on port 3000):

```
yarn start OR npm start
```

Create production build:

```
yarn build OR npm react-scripts build
```

# Technologies used

- [MDBoostrap](https://mdbootstrap.com/)
- [ReactJS](https://reactjs.org/)
- [js-cookie](https://www.npmjs.com/package/js-cookie/)
- [dot-env](https://www.npmjs.com/package/dotenv/)
- [SpotifyWebAPI](https://developer.spotify.com/documentation/web-api/)
- [iTunesRSS](https://itunes.apple.com/us/rss/topalbums/limit=100/json)

# Project Structure

```
js-music-page-ejovee
|--public
| |--favicon.ico
| |--index.html
| |--manifest.json
| |--robots.txt
|--src
| |--assets
| | |--img
| | |--background_image.jpg
| | |--jukebox.png
| |---components
| | |--AlbumCard
| | |--AlbumFrame
| | |--AlbumProfile
| | |--FavButton
| | |--FavListItem
| | |--NavBar
| | |--SearchBox
| | |--SongList
| |--views
| | |--Favourites
| | |--Home
| | |--Loading
| |--utils
| | |--API
| | |--Cookies
| | |--Services
|--App.js
|--index.js
|--serviceWorker.js
|--.env
```

# Disclaimer & Credits

This is a test project and is not for commercial use

Background wallpaper from:

- [BGWallpaper](https://free4kwallpapers.com/others/cyber-punk-wallpaper--R0Gz)
