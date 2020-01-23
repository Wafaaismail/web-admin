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
import { map ,omit} from 'lodash'

// query generators
const getCountryCityByPartialCityName = (partialCityName) => {
  const QUERY = `
  {
    normalizedSearch(
      settings: {
        searchNode: "city"
        matchByPartialProp: {name: "${partialCityName}"}
        searchReturn: "self, rel1, relative1, rel2, relative2"
        relative1: "station"
        relative2: "country"
      }  
    )
  }
  `
  // console.log('QUERY', QUERY)
  return gql(QUERY)

}
const getStationsByCityId = (cityId) => {
  const QUERY = `
  query{
    normalizedSearch(
      settings: {
        searchNode: "city"
        matchByExactProps: {id: "${cityId}"}
        searchReturn: "relative1"
        relative1: "station"
      }  
    )
  }
  `
  // console.log('QUERY', QUERY)
  return gql(QUERY)
}

        
class Search extends Component {
   
  executeQuery = (querySignature, input, reducerName) => {
    this.props.client.query({
      query: querySignature(input)
    })
    .then(results => {
      console.log('result', results)
      // send data to redux here 

      map(results.data.normalizedSearch,(data,reducer_name)=>{
        console.log("re",reducer_name)
        map(data,(val,key)=>{
          console.log("data",data)
          console.log("val",val)
          gun.get(reducer_name).get(key).put(val)
          this.props.add(reducer_name,val)


        })
      })
    })
    .catch(error => console.error(error));
  }
    
     handleAutocompleteChange = (event, option) => {
      option ? this.executeQuery(getStationsByCityId, option.id, "stationByCity") : console.log("No option is selected")
    }

     handleTextFieldChange =(event)=>{
      console.log('searchTerm: ', event.target.value)
      event.target.value ? 
        this.executeQuery(getCountryCityByPartialCityName, event.target.value , "cityOptions")
        : console.log("No term is entered")
    }
    
    render() {
      // console.log(this.props.state)
      console.log(map(this.props.state.city_data, option => option))
      return (
        <>
          <Autocomplete
            options={map(this.props.state.cityOptions, option => option)}
            getOptionLabel={option => {
              
              console.log('option',option)
              `${option.country.name}, ${option.city.name}`}}
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
