import React, { Component } from "react";
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { connect } from "react-redux";
import Subscription from "./subscription/index";
import Search from "./Search";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Popup from "./popup-add";
import PopupEdit from "./popup-edit";
// import SearchStations from "./searchStations";
// import Popup from './popup-stations'
import SearchResult from "./SearchResult";
import JourneyApp from "./createJourney/journeyApp";
const client = new ApolloClient({
  uri: "http://localhost:3030/graphql"
});
let journeyGraph = {
  node: {
    name: "journey",
    props: { start: "ds", end: "45fds5" },
    relations: [
      {
        node: {
          name: "trip",
          props: { start: "f5", end: "455" },
          relations: [
            { type: "FROM", with: "9edc4770-b4e6-4891-9b96-069261dca84c" },
            { type: "TO", with: "c0e98a40-0195-462c-adcc-318c328b33b4" },
            { type: "MAKES", with: "789" }
          ]
        },
        type: "HAS"
      }
    ]
  }
};
let stationGraph = {
  node: {
    name: "station",
    props: { start: "f5", end: "455" },
    relations: [{ type: "EXISTS_IN", with: "123" }]
  }
};
class App extends Component {
  state = {
    nodeName: "",
    add: 0,
    update: 0,
    delete: 0,
    nodeId: "",
    props: {},
    node: {}
  };

  //Returns the state to initial after calling any action
  handleStateReset = prop => {
    this.setState({ [prop]: 0, nodeId: "", props: {}, node: {} });
  };

  //Store data for the node to be added
  handleChangingState = (nodeName, node = {}, action, nodeId = "") => {
    this.setState({ node, nodeName, [action]: 1, nodeId });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        {/* <Router> */}
        <div>
          {/* <Popup handleChangingState={this.handleChangingState}/> */}
          <Search
            searchType="station"
            handleChangingState={this.handleChangingState}
          />
          {/* <SearchResult searchType='station'/> */}

          {/* <Popup handleChangingState={this.handleChangingState} /> */}
          {/* <Search /> */}

          {/* <JourneyApp handleChangingState={this.handleChangingState} /> */}
          {/* **Testing subscription component**
          <JourneyApp />
          {/* <Popup /> */}
        </div>
        {/* <JourneyApp /> */}

        {/* <button type="button" onClick={handleOpen}>
          Add pop
      </button> */}
        {/* <Search/> */}
        {/* <Route exact path="/" component={Search} /> */}

        <Subscription
          that={this}
          state={this.state}
          handleStateReset={this.handleStateReset}
        />
        {/* </div>  */}

        {/* </Router> */}
      </ApolloProvider>
    );
  }
}
// get data from redux
const mapStateToProps = state => {
  return {
    data: state
  };
};

// pass data and dispatchers to this component
export default connect(mapStateToProps, normalizedMapDispatchToProps)(App);
