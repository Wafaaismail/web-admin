import React, { Component } from "react";
import { gun } from "./initGun";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling delete action
handleDelete = (that, nodeName, nodeId) => {
  data = { nodeId, ...props };

  //Delete node from gun
  gun
    .get(nodeName)
    .get(nodeId)
    .put(null);

  //Delete node from redux
  //   gun.map().on(() => {
  //     that.props.delete(nodeName, nodeId);
  //   });

  //Delete node from graph
  resolvers.Mutation.deleteNode({}, { nodeId });

  //Return delete flag to 0 again
  that.setState({ delete: 0 });
};

//Component that renders nothing
export default class Delete extends Component {
  render() {
    if (this.props.state.delete) {
      handleDelete(
        this.props.that,
        this.props.nodeName,
        this.props.state.nodeId
      );
    }
    // return <div></div>;
  }
}
