import React, { Component } from "react";
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { connect } from "react-redux";
import Subscription from "./subscription/index";
import Search from "./Search";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchStations from "./searchStations";

const client = new ApolloClient({
  uri:"http://localhost:3030/graphql"
});

class App extends Component {
  state = {
    add: 0,
    update: 0,
    delete: 0,
    nodeId: "",
    props: {}
  };

  //Returns the state to initial after calling any action
  handleStateChange = prop => {
    this.setState({ [prop]: 0, nodeId: "", props: {} });
  };

  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
      <div>
        {/* <h1>Welcome to My React App!!</h1> */}
        <Search/>
        {/* <SearchStations/> */}
        {/* <Route exact path="/" component={Search} /> */}
        {/* //Testing subscription component */}
        {/* <button
          onClick={() => {
            this.setState({ add: 1, props: { start: "f5", end: "455" } });
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            this.setState({
              update: 1,
              props: { start: "dsd", end: "fdsf" },
              nodeId: "7c013b66-40e2-4952-9771-9bcc199d27a8"
            });
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            this.setState({
              delete: 1,
              nodeId: "7c013b66-40e2-4952-9771-9bcc199d27a8"
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
      </div>
      </Router>
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
