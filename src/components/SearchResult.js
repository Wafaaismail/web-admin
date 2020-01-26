import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import {connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map } from 'lodash'


class SearchResult extends Component {

    
    deleteChioce = () => {
        const choice = document.querySelector('input[name="choice"]:checked').value
        const QUERY = gql`mutation {
            deleteNode(nodeId:"${choice}")
            }
        `
        this.props.client.mutate({
          mutation: QUERY
        })
        .then( ()=> {
            this.props.erase(`${this.props.searchType}_data`, choice)
            console.log(this.props.reduxState)
            console.log('node deleted successflly ')
    
        })
        .catch(error => console.error(error));
    }
    render() {
        console.log('tetetetst,', this.props.data)
        return (
            <>
                <ul>{
                    map(this.props.data, dataObj => (
                        <div key={dataObj.id}>
                            <input type="radio" name="choice" value={dataObj.id}></input>
                            {dataObj.name}
                        </div>
                    ))
                }</ul>
                <div>
                    <Button variant="contained" color="secondary">Add</Button>
                    <Button variant="contained" color="secondary">Edit</Button>
                    <Button variant="contained" color="secondary" 
                        onClick={this.deleteChioce}>Delete</Button>
                </div>
            </>
        )
    }
}

// get data from redux
const mapStateToProps = state => {
    return {
        ...console.log('staat in componete', state),
      reduxState: state
    };
  };
  
export default withApollo(connect(mapStateToProps, normalizedMapDispatchToProps)(SearchResult));
  