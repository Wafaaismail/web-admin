import React, { Component } from "react";
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { connect } from "react-redux";
import Subscription from "./subscription/index";
import Search from "./Search";
import Home from './homepage/Home'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:3030/graphql"
});

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
  handleStateReset = prop => {
    this.setState({ [prop]: 0, nodeId: "", props: {}, node: {} });
  };

  //Store data for the node to be added
  handleChangingState = (nodeName, node, action, nodeId, props) => {
    // console.log('action',action)
    this.setState({ node, nodeName, [action]: 1, nodeId, props });
    // console.log("state",this.state)
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Home/>
          {/* <Search
            searchType="journey"
            handleChangingState={this.handleChangingState}
          />

          <Subscription
            that={this}
            state={this.state}
            handleStateReset={this.handleStateReset}
          /> */}
        </div>
      </ApolloProvider>
    );
  }
}
// // get data from redux
const mapStateToProps = state => {
  return {
    data: state
  };
};

// // pass data and dispatchers to this component
export default connect(mapStateToProps, normalizedMapDispatchToProps)(App);
