import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import {connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map } from 'lodash'
import Popup from './popup-add'

class SearchResult extends Component {
    state = {
        handlePopUp : false,
        handleAction: ''
    }
    toggle = ()=>{
        this.setState({handlePopUp : false})
    }
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
            console.log('node deleted successflly ')
    
        })
        .catch(error => console.error(error));
    }
    render() {
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
                    <Button variant="contained" color="secondary" onClick={()=> {this.setState({handlePopUp : true, handleAction :'add'}); console.log('ss',this.handlePopUp,this.handleAction)}}>Add</Button>
                    <Button variant="contained" color="secondary"onClick={()=> {this.setState({handlePopUp : true, handleAction :'edit'})}}>Edit</Button>
                    <Button variant="contained" color="secondary" 
                        onClick={this.deleteChioce}>Delete</Button>
                    <Popup  handleChangingState={this.props.handleChangingState} handlePopUp={this.state.handlePopUp} action={this.state.handleAction} toggle={this.toggle}/>
                </div>
            </>
        )
    }
}

// get data from redux
const mapStateToProps = state => {
    return {
      reduxState: state
    };
  };
  
export default withApollo(connect(mapStateToProps, normalizedMapDispatchToProps)(SearchResult));
  