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
const querySearchOptions = (partialCityName) => {
  const QUERY = `
  {
    normalizedSearch(
      settings: {
        searchNode: "city"
        matchByPartialProp: {name: "${partialCityName}"}
        searchReturn: "self, relative1, relative2"
        relative1: "station"
        relative2: "country"
      }  
    )
  }
  `
  // console.log('QUERY', QUERY)
  return gql(QUERY)
}
        
class Search extends Component {
  
  prepareOptions = () => {
    const { state, searchType } = this.props
    const countries = state.country_data
    const cities = state.city_data
    const stations = state.station_data
    const relations = state.relations_data
    console.log('MY STATE: ', state)
    let FinalOptions = ''

    const stationSearchOptions = []
    map(relations, (relationObj, relationId) => {
      // console.log('countryid',relationObj.countryId)
      // console.log('cityid',relationObj.cityId)
      // console.log('cond',relationObj.countryId && relationObj.cityId)

      if (relationObj.countryId) {
        // console.log('RELATION OBJECT: ', relationObj)
        const city = cities[relationObj.cityId]
        const country = countries[relationObj.countryId]
        // console.log('COUNTRY: ', country)
        const option = {cityId: city.id, countryName: country.name, cityName: city.name}
        console.log(option)
        stationSearchOptions.push(option)
        // console.log('dddddddddd',countries[relationObj.countryId])
      }
    })
    FinalOptions = stationSearchOptions
    console.log(FinalOptions)

    if (searchType !== 'station') {
      const journeySearchOptions = []
      map(stationSearchOptions, option => {
        const stationsForCity = []
        map(relations, relationObj => {
          if (relationObj.stationId && relationObj.cityId && relationObj.cityId == option.cityId) {
            stationsForCity.push(stations[relationObj.stationId])
          }
        })
        map(stationsForCity, stationObj => {
          const optionWithStation = { ...option, stationName: stationObj.name}
          journeySearchOptions.push(optionWithStation)
        })
      })
      FinalOptions = journeySearchOptions
    }

    console.log('options: ', FinalOptions)
    return FinalOptions
  } 



  executeQuery = (querySignature, input) => {
    this.props.client.query({
      query: querySignature(input)
    })
    .then(results => {
      console.log('result before adding to gun', results)
      // send data to redux here 

      map(results.data.normalizedSearch, (data, reducer_name) => { 
        console.log("reducer", reducer_name)
        console.log("reducer data", data)
        map(data, (val,key)=>{
          // gun.get(reducer_name).get(key).put(val)
          this.props.add(reducer_name,val)
        })
      })
    })
    .catch(error => console.error(error));
  }
    
    handleAutocompleteChange = (event, option) => {
      console.log('Option: ', option.cityId)
    }

     handleTextFieldChange =(event)=>{
      console.log('searchTerm: ', event.target.value)
      event.target.value ? 
        this.executeQuery(querySearchOptions, event.target.value)
        : console.log("No term is entered")
    }
    
    render() {
      return (
        <>
          <Autocomplete
            options={this.prepareOptions()}
            getOptionLabel={option => `${option.countryName}, ${option.cityName}`}
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
