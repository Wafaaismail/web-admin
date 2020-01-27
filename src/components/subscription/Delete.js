import React, { Component } from "react";
import { gun } from "./initGun";
import gql from 'graphql-tag';

//Handling delete action
const handleDelete = (that, nodeName, nodeId, client) => {
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
  // resolvers.Mutation.deleteNode({}, { nodeId });
  let QUERY = gql`mutation {
    deleteNode(nodeId: "${nodeId}")
  }`
  client.mutate({
    mutation: QUERY
  })
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
};

//Component that renders nothing
export default class Delete extends Component {
  //Called whenever change occurs whether in props or state
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.delete) {
      handleDelete(nextProps.that, nextProps.state.nodeName, nextProps.state.nodeId, nextProps.client);
      //Return delete flag to 0 again and empty props and nodeId
      nextProps.handleStateReset("delete");
    }
  }

  //Render function supposed to be pure, can't contain state-changing
  render() {
    return null;
  }
}
