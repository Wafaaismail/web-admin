import React, { Component } from "react";
import { gun } from "./initGun";
import uuid from "../../helpers/uuid";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling Add action
const handleAdd = (that, nodeName, props) => {
  let id = uuid();
  const data = { [id]: { id, ...props } };

  //Add new node in gun
  gun.get(nodeName).put(data);

  //Add new node in redux
  gun.get(nodeName).map(obj => {
    that.props.add(nodeName, data[id]);
  });

  //Add new node in graph
  // resolvers.Mutation.createNode({}, { nodelabel: nodeName, nodeArgs: data.id });
};

//Component that renders nothing
export default class Add extends Component {
  //Called whenever change occurs whether in props or state
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.add) {
      handleAdd(nextProps.that, nextProps.nodeName, nextProps.state.props);
      //Return add flag to 0 and empty props and nodeId
      nextProps.handleStateChange("add");
    }
  }

  //Render function supposed to be pure, can't contain state-changing
  render() {
    return null;
  }
}
