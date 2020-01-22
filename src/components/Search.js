import React, { Component ,useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import ResultExpansion from './ResultExpansion'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import uuid from '../helpers/uuid'
import {gun} from './subscription/initGun'
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map } from 'lodash'

// query generators
const searchTerm = (term) => {
  return gql`
  query{
    normalizedSearch(nodelabel:"city",settings:{
      searchProp: "name"
      searchInput: "${term}"
    })
  }
  `;
}
const getCountryByCityId = (cityId) => {
  return gql`
  query{
    normalizedSearch(nodelabel:"city",settings:{
      relative: {
        nodelabel: "country"
      }
      searchInput: "${cityId}"
    })
  }
  `;
}
const getStationsByCityId = (cityId) => {
  return gql`
  query{
    normalizedSearch(nodelabel:"city",settings:{
      relative: {
        nodelabel: "station"
      }
      searchInput: "${cityId}"
    })
  }
  `;
}

class Search extends Component{
   
  executeQuery = (querySignature, input, reducerName) => {
    return this.props.client.query({
      query: querySignature(input)
    })
    .then(result => {
      console.log('result',result)
      // send data to redux here 
      map(result.data.normalizedSearch,res=>{
        console.log('res',res)
        res.id = res.id ? res.id : uuid()
        gun.get(reducerName).put({[res.id]:res})
        this.props.add(reducerName,res)
      })
      return result
      
    })
    .catch(error => console.error(error));

  }
  
  
  //  AutocompleteOptions = 
  //   [ 
  //     {
  //       country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
  //       city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
  //     }, 
  //     {
  //       country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
  //       city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
  //     }, 
  //     {
  //       country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
  //       city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
  //     }, 
  //   ]
    
    
     handleAutocompleteChange = (event, option) => {
      option ? this.executeQuery(getStationsByCityId, option.id,"stationByCity") : console.log("No option is selected")
    }

     handleTextFieldChange =(event)=>{
      // // console.log('onchange',executeQuery(searchTerm(event.target.value)))
      // console.log('searchTerm: ', event.target.value)
      // const result = this.executeQuery(searchTerm, event.target.value , "cityOptions")
      // result.then(result => {
      //   console.log('query result', result))
      //   map(result.data.normalizedSearch, cityObj => {
      //     this.executeQuery(getCountryByCityId, cityObj.id, )
      //   })
      // }
      // event.target.value ? result : console.log("No search term")
    }
    
    render(){
      // console.log(map(this.props.data.stationByCity, option => option))
      return (
        <>
          <Autocomplete
            options={map(this.props.state.cityOptions, option => option)}
            getOptionLabel={option => `${option.name}, ${option.name}`}
            // style={{ width: 300 }}
            onChange={this.handleAutocompleteChange}
            renderInput={params => (
              <TextField {...params} label="Search" onChange={this.handleTextFieldChange} variant="outlined" fullWidth />
            )}
          />
        </>
      )
  }
}

// get data from redux
const mapStateToProps = state => {
  return {
    state: state
  };
};

export default withApollo(connect(mapStateToProps, normalizedMapDispatchToProps)(Search));
