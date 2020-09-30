import React,{Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataService from "./utils/Service/DataService";
import standardHandle from "./utils/API/StandardHandle";
import commonAPIClient from "./utils/API/CommonAPI";
import NavBar from "./components/NavBar/NavBar";
import BufferHome from "./views/Home/BufferHome";
import BufferFav from "./views/Favourites/BufferFav";
import Loading from "./views/Loading/Loading";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, feed: [] };
  }

  /* 
    On Component mount does two things:
    1. Retrieve top 100 album data from itunes RSS feed
    2. Authenticate and obtain access token from spotify 
  
  */
  componentDidMount() {
    //1. iTunes100 rss
    commonAPIClient.getiTunesTop100Albums().then(async (response) => {
      const successCallback = async () => {
        const data = await response.json();
        const feed = data["feed"];
        const formattedFeed = DataService.appendRank(feed["entry"]);
        this.setState({
          feed: formattedFeed,
        });
        setTimeout(() => this.setState({ isLoaded: true }), 1500);
      };
      const failureCallback = async () => {
        console.log("Error: Unable to retrieve data from iTunes RSS");
      };
      standardHandle(response, successCallback, failureCallback);
    });
    //2. Spotify
    commonAPIClient.getSpotifyAccessToken().then(async (response) => {
      const successCallback = async () => {
        const data = await response.json();
        window.token = data;
      };
      const failureCallback = async () => {
        console.log("Error: Unable to obtain Spotify access token");
      };
      standardHandle(response, successCallback, failureCallback);
    });
  }

  render() {
    return !this.state.isLoaded ? (
      <Loading />
    ) : (
      <Router>
        <NavBar/>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <BufferHome feed={this.state.feed} />}
          />
          <Route
            path="/favourites"
            render={() => <BufferFav feed={this.state.feed} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
