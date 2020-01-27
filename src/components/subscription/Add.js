import React, { Component } from 'react';
import { gun } from './initGun';
import { map } from 'lodash';
import uuid from '../../helpers/uuid';
import gql from 'graphql-tag';

const stringifyArgs = (args) => {
	// delete args.nodelabel
	return '{' + map(args, (d, key) => `${key}: ${JSON.stringify(d)}`).join(', ') + '}';
};

//Handling Add action
const handleAdd = (that, node, client) => {
	let node1ID = uuid();
	const data = { [node1ID]: { id: node1ID, ...node.props } };

	//Add new node in gun
	gun.get(node.name).put(data);

	//Add new node in redux
	that.props.add(node.name, data[node1ID]);

	//Add new node in graph
	// resolvers.Mutation.createNode({}, { nodelabel: node.name, nodeArgs: { id: node1ID, ...node.props } });
	let args = { id: node1ID, ...node.props }
	let QUERY = gql`mutation {
		createNode(nodelabel: "${node.name}", nodeArgs:{id: "${node1ID}"})
	  }`
	return client.mutate({
		mutation: QUERY
	})
		.then(result => {
			console.log(node)
			//Create relation ships for the node
			map(node.relations, async (relation) => {
				console.log("node2ID")
				let node2ID = relation.with
				//First, check if there's another node need to be created before creating relation
				if (relation.node) {
					//Recursion to create the second node and get its ID
					node2ID = await handleAdd(that, relation.node, client);
				}

				console.log('name:', node.name, ', ID1:', node1ID, ', relType:', relation.type, ', ID2:', node2ID);

				//Create relation between the two nodes
				// await resolvers.Mutation.relateTwoNodes({}, { node1ID, node2ID, relType: relation.type });
				QUERY = gql`mutation {
					relateTwoNodes( node1ID: "${ node1ID}", node2ID: "${node2ID}", relType: "${relation.type}")
				  }`
				client.mutate({
					mutation: QUERY
				})
					.then(res => console.log(res))
					.catch(err => console.log(err))
			});
			return result.data.createNode.id
		})
		.catch(err => console.log(err))

};

//Component that renders nothing
export default class Add extends Component {
	//Called whenever change occurs whether in props or state
	componentWillReceiveProps(nextProps) {
		if (nextProps.state.add) {
			// console.log(nextProps)
			handleAdd(nextProps.that, nextProps.state.node.node, nextProps.client);
			//Return add flag to 0 and empty props and nodeId+
			nextProps.handleStateReset('add');
		}
	}

	//Render function supposed to be pure, can't contain state-changing
	render() {
		return null;
	}
}
