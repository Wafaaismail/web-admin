import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map } from 'lodash'
import Popup from './popup-add'
import ResultExpansion from './ResultExpansion'

class SearchResult extends Component {
  state = {
    handlePopUp: false,
    handleAction: '',
    id:''
    
  }
  toggle = () => {
    this.setState({ handlePopUp: false })
  }
  handleOptions = (handlePopUp,option,id)=>{
    console.log(id)
    if (option == 'update') id = document.querySelector('input[name="choice"]:checked').value
    this.setState({ handlePopUp, handleAction: option, id}); 

  }
  deleteChioce = () => {
    const choice = document.querySelector('input[name="choice"]:checked').value
    this.props.handleChangingState(this.props.searchType,{},"delete",choice,{})
    this.setState({})
    // const QUERY = gql`mutation {
    //         deleteNode(nodeId:"${choice}")
    //         }
    //     `
    // this.props.client.mutate({
    //   mutation: QUERY
    // })
    //   .then(() => {
    //     this.props.erase(`${this.props.searchType}_data`, choice)
    //     console.log('node deleted successflly ')

    //   })
    //   .catch(error => console.error(error));
  }
  render() {
    const listItems = map(this.props.data, dataObj => (
      <div key={dataObj.id}>
        <input type="radio" name="choice" value={dataObj.id}></input>
        {
          this.props.searchType !== 'station' ?
          <ResultExpansion data={dataObj} /> :
          dataObj.name
        }
      </div>
    ))
    console.log("data from search result", this.props.data)   
    return (
      <>
      
        <ul>
        {
          listItems.length ? listItems : <div>Go on, Do Your Search </div>
        }
        </ul>
        <div>
          <Button variant="contained" color="secondary" onClick={() => { this.handleOptions(true,'add',this.props.id) }}>Add</Button>
          <Button variant="contained" color="secondary" onClick={() => { this.handleOptions(true,'update','') }}>Edit</Button>
          <Button variant="contained" color="secondary"
            onClick={this.deleteChioce}>Delete</Button>
          <Popup handleChangingState={this.props.handleChangingState}
           handlePopUp={this.state.handlePopUp} action={this.state.handleAction}
            toggle={this.toggle} 
            id ={this.state.id}
            />
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
