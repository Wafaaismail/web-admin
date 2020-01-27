import React, { Component } from "react";
import { withApollo } from 'react-apollo';
import Add from "./Add";
import Update from "./Update";
import Delete from "./Delete";

//Component that renders nothing
//Contains components responsible for handling gun and graph data
class index extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
        <Add
          that={this.props.that}
          state={this.props.state}
          handleStateReset={this.props.handleStateReset}
          client={this.props.client}
        />
        <Update
          that={this.props.that}
          state={this.props.state}
          handleStateReset={this.props.handleStateReset}
          client={this.props.client}
        />
        <Delete
          that={this.props.that}
          state={this.props.state}
          handleStateReset={this.props.handleStateReset}
          client={this.props.client}
        />
      </div>
    );
  }
}
export default withApollo(index)