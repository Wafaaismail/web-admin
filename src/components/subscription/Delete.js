import React, { Component } from "react";
import { gun } from "./initGun";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling delete action
const handleDelete = (that, nodeName, nodeId) => {
  //Delete node from gun
  gun
    .get(nodeName)
    .get(nodeId)
    .put(null);

  //Delete node from redux
  // gun
  //   .get(nodeName)
  //   .map()
  //   .on(() => {
  that.props.erase(nodeName, nodeId);
  // });

  //Delete node from graph
  resolvers.Mutation.deleteNode({}, { nodeId });
};

//Component that renders nothing
export default class Delete extends Component {
  //Called whenever change occurs whether in props or state
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.delete) {
      handleDelete(nextProps.that, nextProps.state.nodeName, nextProps.state.nodeId);
      //Return delete flag to 0 again and empty props and nodeId
      nextProps.handleStateReset("delete");
    }
  }

  //Render function supposed to be pure, can't contain state-changing
  render() {
    return null;
  }
}
