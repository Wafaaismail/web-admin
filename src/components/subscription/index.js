import React, { Component } from "react";
import Add from "./Add";
import Update from "./Update";
import Delete from "./Delete";

//Component that renders nothing
//Contains components responsible for handling gun, redux and graph data
export default class index extends Component {
  render() {
    return (
      <div>
        <Add
          that={this.props.that}
          nodeName={this.props.nodeName}
          state={this.props.state}
        />
        <Update
          that={this.props.that}
          nodeName={this.props.nodeName}
          state={this.props.state}
        />
        <Delete
          that={this.props.that}
          nodeName={this.props.nodeName}
          state={this.props.state}
        />
      </div>
    );
  }
}
