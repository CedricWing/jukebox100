import React, { Component } from "react";
import DataService from "../../utils/Service/DataService";
import Home from "./Home";

class BufferHome extends Component {
  constructor(props) {
    super(props);
    this.state = { albumList: [] };
  }
  componentDidMount() {
    const formattedList = DataService.formatFeedData(this.props.feed);
    this.setState({
      albumList: formattedList,
    });
  }

  //Reloads the album list as per search value (has a debounce time interval)
  reloadData = (searchValue) => {
    const filteredData = DataService.filterSearchData(
      this.props.feed,
      searchValue.toLowerCase()
    );
    const formattedList = DataService.formatFeedData(filteredData);
    this.setState({
      albumList: formattedList,
    });
  };

  render() {
    return (
      <Home
        albumList={this.state.albumList}
        feed={this.props.feed}
        reloadData={this.reloadData}
      />
    );
  }
}

export default BufferHome;
