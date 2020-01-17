import React, { Component } from "react";
import { gun } from "./initGun";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling update action
const handleUpdate = (that, nodeName, nodeId, props) => {
  const data = { ...props };

  //Update node props in gun
  gun
    .get(nodeName)
    .get(nodeId)
    .put(data);

  //Update node props in redux
  gun.get(nodeName).map(() => {
    that.props.update(nodeName, nodeId, data);
  });

  //Update node props in graph
  // resolvers.Mutation.updateNode({}, { nodeId, nodeArgs: data });
};

//Component that renders nothing
export default class Update extends Component {
  //Called whenever change occurs whether in props or state
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.update) {
      handleUpdate(
        nextProps.that,
        nextProps.nodeName,
        nextProps.state.nodeId,
        nextProps.state.props
      );
      //Return update flag to 0 and empty props and nodeId
      nextProps.handleStateChange("update");
    }
  }

  //Render function supposed to be pure, can't contain state-changing
  render() {
    return null;
  }
}
