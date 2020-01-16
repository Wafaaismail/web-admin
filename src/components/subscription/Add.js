import React, { Component } from "react";
import { gun } from "./initGun";
import uuid from "../../helpers/uuid";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling Add action
const handleAdd = (that, nodeName, props, handleStateChange) => {
  let id = uuid();
  const data = { [id]: { id, ...props } };

  //Add new node in gun
  gun.get(nodeName).put(data);

  //Add new node in redux
  gun.map().on(() => {
    that.props.add(nodeName, data);
  });

  //Add new node in graph
  // resolvers.Mutation.createNode({}, { nodelabel: nodeName, nodeArgs: data.id });

  //Return add flag to 0 again
  handleStateChange("add");
};

//Component that renders nothing
export default class Add extends Component {
  render() {
    if (this.props.state.add) {
      handleAdd(
        this.props.that,
        this.props.nodeName,
        this.props.state.props,
        this.props.handleStateChange
      );
    }
    return null;
  }
}
