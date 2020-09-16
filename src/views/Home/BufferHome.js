import React, { Component } from "react";
import DataService from "../../utils/Service/DataService";
import HomeView from "./Home";

class BufferHome extends Component {
  constructor(props) {
    super(props);
    this.state = { albumList: [] };
    this.reloadData = this.reloadData.bind(this);
    this.reloadDataStub = this.reloadDataStub.bind(this);
  }
  componentDidMount() {
    var formattedList = DataService.formatFeedData(this.props.feed);
    this.setState({
      albumList: formattedList,
    });
  }

  reloadDataStub = (formattedList) => {
    this.setState({
      albumList: formattedList,
    });
  };
  //Reloads the album list as per search value (has a debounce time interval)
  reloadData = (searchValue) => {
    DataService.debounce(
      function (currentFeed, setDataFn) {
        var filteredData = DataService.filterSearchData(
          currentFeed,
          searchValue.toLowerCase()
        );
        var formattedList = DataService.formatFeedData(filteredData);
        setDataFn(formattedList);
      },
      350,
      this.props.feed,
      this.reloadDataStub
    );
  };

  render() {
    return (
      <HomeView
        albumList={this.state.albumList}
        feed={this.props.feed}
        reloadData={this.reloadData}
      ></HomeView>
    );
  }
}

export default BufferHome;
