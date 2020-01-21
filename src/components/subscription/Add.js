import React, { Component } from "react";
import { gun } from "./initGun";
import { map } from "lodash";
import uuid from "../../helpers/uuid";
import resolvers from "../../../../server/db_utils/schema/resolvers";

//Handling Add action
const handleAdd = async (that, node) => {
  let node1ID = uuid();
  let node2ID;
  const data = { [node1ID]: { id: node1ID, ...node.props } };

  //Add new node in gun
  gun.get(node.name).put(data);

  //Add new node in redux
  that.props.add(node.name, data[node1ID]);

  //Add new node in graph
  await resolvers.Mutation.createNode(
    {},
    { nodelabel: node.name, nodeArgs: { id: node1ID, ...node.props } }
  );

  //Create relation ships for the node
  map(node.relations, async relation => {
    console.log(node.relations);
    console.log(relation);
    //First, check if there's another node need to be created before creating relation
    if (relation.node) {
      //Recursion to create the second node and get its ID
      node2ID = await handleAdd(that, relation.node);
    } else {
      //If no node needs to be created then get the second node ID
      node2ID = relation.with;
    }
    //Create relation between the two nodes
    await resolvers.Mutation.relateTwoNodes(
      {},
      { node1ID, node2ID, relType: relation.type }
    );
  });
  return node1ID;
};

//Component that renders nothing
export default class Add extends Component {
  //Called whenever change occurs whether in props or state
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.add) {
      handleAdd(nextProps.that, nextProps.state.node);
      //Return add flag to 0 and empty props and nodeId+
      nextProps.handleStateChange("add");
    }
  }

  //Render function supposed to be pure, can't contain state-changing
  render() {
    return null;
  }
}
