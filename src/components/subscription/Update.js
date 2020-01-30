import React, { Component } from "react";
import { gun } from "./initGun";
import gql from 'graphql-tag';
import {map} from 'lodash'

const stringifyArgs = (args) => {
  // delete args.nodelabel
  return '{' + map(args, (d, key) => `${key}: ${JSON.stringify(d)}`).join(', ') + '}';
};

//Handling update action
const handleUpdate = (that, nodeName, nodeId, props, client) => {
  console.log("nodeName: ", nodeName, " nodeId: ", nodeId, " props: ", props)
  const data = { ...props };
  //First check if the node actually exists to be updated
  gun
    .get(nodeName)
    .get(nodeId)
    .once(obj => {
      if (obj) {
       
        //Update node props in gun
        gun
          .get(nodeName)
          .get(nodeId)
          .put(data);

        //Update node props in redux
        // gun.get(nodeName).map(() => {
        that.props.update(nodeName, nodeId, data);
        // });

        //Update node props in graph
        // resolvers.Mutation.updateNode({}, { nodeId, nodeArgs: data });
        let QUERY = gql`mutation {
          updateNode(nodeId: "${nodeId}", nodeArgs: ${stringifyArgs({...data})})
        }`
        console.log(QUERY)
        client.mutate({
          mutation: QUERY
        })
          .then(result => {
            console.log('ss',result)
          })
          .catch(err => {
            console.log(err)
          })
      }
    });
};

//Component that renders nothing
export default class Update extends Component {
  //Called whenever change occurs whether in props or state
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.update) {
      handleUpdate(
        nextProps.that,
        nextProps.state.nodeName,
        nextProps.state.nodeId,
        nextProps.state.props,
        nextProps.client
      );
      //Return update flag to 0 and empty props and nodeId
      nextProps.handleStateReset("update");
    }
  }

  //Render function supposed to be pure, can't contain state-changing
  render() {
    return null;
  }
}
