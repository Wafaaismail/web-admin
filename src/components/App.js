import React, { Component } from "react";
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { connect } from "react-redux";
import Subscription from "./subscription/index";
import Search from "./Search";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Popup from './popup-stations'
import SearchStations from "./searchStations";
import JourneyApp from './createJourney/journeyApp'

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
    add: 0,
    update: 0,
    delete: 0,
    nodeId: "",
    props: {},
    node: {}
  };

  //Returns the state to initial after calling any action
  handleStateChange = prop => {
    this.setState({ [prop]: 0, nodeId: "", props: {}, node: {} });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        {/* <Router> */}
        <div>
          {/* <h1>Welcome to My React App!!</h1> */}
          <JourneyApp />
          {/* <Popup /> */}
        </div>

        {/* <button type="button" onClick={handleOpen}>
          Add pop
      </button> */}
        {/* <Search/> */}
        {/* <Route exact path="/" component={Search} /> */}

        {/* **Testing subscription component**
          <button
            onClick={() => {
              this.setState({ add: 1, node: stationGraph.node });
            }}
          >
            Add Station
          </button>
          <button
            onClick={() => {
              this.setState({ add: 1, node: journeyGraph.node });
            }}
          >
            Add Journey
          </button>
          <button
            onClick={() => {
              this.setState({
                update: 1,
                props: { start: "", end: "" },
                nodeId: "27aa350d-9894-4fe3-9465-0fcd2fafe9df"
              });
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              this.setState({
                delete: 1,
                nodeId: "27aa350d-9894-4fe3-9465-0fcd2fafe9df"
              });
            }}
          >
            Delete
          </button>
          <Subscription
            that={this}
            state={this.state}
            nodeName="station"
            handleStateChange={this.handleStateChange}
          /> */}
        {/* </div> */}
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
