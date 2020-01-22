import React, { Component } from "react";
import Add from "./Add";
import Update from "./Update";
import Delete from "./Delete";

//Component that renders nothing
//Contains components responsible for handling gun and graph data
export default class index extends Component {
  render() {
    return (
      <div>
        <Add
          that={this.props.that}
          state={this.props.state}
          handleStateReset={this.props.handleStateReset}
        />
        <Update
          that={this.props.that}
          state={this.props.state}
          handleStateReset={this.props.handleStateReset}
        />
        <Delete
          that={this.props.that}
          state={this.props.state}
          handleStateReset={this.props.handleStateReset}
        />
      </div>
    );
  }
}
