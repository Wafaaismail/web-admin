import React, { Component } from "react";
// import RenderForm from './forms/login/renderForm' 
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { connect } from "react-redux";
import Subscription from "./subscription/index";
import Search from "./Search";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
<<<<<<< Updated upstream
import Popup from './popup-stations'
import SearchStations from "./searchStations";
import JourneyApp from './journeyApp'
=======
import Popup from './popup-add'
import PopupEdit from './popup-edit'
// import SearchStations from "./searchStations";
// import Popup from './popup-stations'
import SearchResult from "./SearchResult";
import JourneyApp from './createJourney/journeyApp'
import ResultExpansion from "./ResultExpansion"
>>>>>>> Stashed changes

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
  handleStateChange = prop => {
    this.setState({ [prop]: 0, nodeId: "", props: {}, node: {} });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        {/* <Router> */}
        <div>
          <h1>Welcome to My React App!!</h1>
          <JourneyApp />
        </div>

          <Subscription
            that={this}
            state={this.state}
            nodeName="station"
            handleStateChange={this.handleStateChange}
          /> 
        {/* </div> */}
        {/* </Router> */}
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
