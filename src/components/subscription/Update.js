import React, { Component } from "react";
import { gun } from "./initGun";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling update action
handleUpdate = (that, nodeName, nodeId, props) => {
  data = { nodeId, ...props };

  //Update node props in gun
  gun
    .get(nodeName)
    .get(nodeId)
    .put(data);

  //Update node props in redux
  // gun.map().on(() => {
  that.props.update(nodeName, nodeId, data);
  // });

  //Update node props in graph
  resolvers.Mutation.updateNode({}, { nodeId, nodeArgs: data });

  //Return update flag to 0 again
  that.setState({ update: 0 });
};

//Component that renders nothing
export default class Update extends Component {
  render() {
    if (this.props.state.update) {
      handleUpdate(
        this.props.that,
        this.props.nodeName,
        this.props.state.nodeId,
        this.props.state.props
      );
    }
    // return <div></div>;
  }
}
