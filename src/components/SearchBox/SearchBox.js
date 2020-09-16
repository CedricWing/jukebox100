import React from "react";
import { MDBCol } from "mdbreact";
import DataService from "../../utils/Service/DataService";

import "./SearchBox.css";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "" };
    this.onSearchInputChanged = this.onSearchInputChanged.bind(this);
  }
  //Search query is debounced for optimal performance
  onSearchInputChanged = (event) => {
    var searchText = event.target.value;
    this.setState({ searchValue: searchText });
    this.props.reloadData(searchText);
    if (searchText === "") {
      this.props.setActiveSearchIndex(0);
      DataService.debounce(this.props.setSearchActive, 450, false);
    } else {
      this.props.setSearchActive(true);
    }
  };
  render() {
    return (
      <MDBCol lg="3">
        <div className="active-search-0 active-search-1 mb-4">
          <input
            className="form-control text-white"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={this.state.searchValue}
            onChange={this.onSearchInputChanged}
          />
        </div>
      </MDBCol>
    );
  }
}

export default SearchBox;
