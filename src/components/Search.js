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
// import {gun} from './subscription/initGun'
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map ,omit, flattenDeep, filter } from 'lodash'
import { apply } from '../helpers/apply_function/apply'
 
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
  constructor(props) {
    super(props)
    this.state = {
      optionsFromRedux: []
    }
  }
  
  filterReduxForOptions = (searchTerm) => {
    const { reduxState, searchType } = this.props
    const countries = reduxState.country_data
    const cities = reduxState.city_data
    const stations = reduxState.station_data
    let relations = reduxState.relations_data
    
    // get objects of cities that match partial name (search term)
    const filteredCities = filter(cities, cityObj => 
      cityObj.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log("FILTERED CITIES: ", filteredCities)


    // filter relations by city ids
    relations = flattenDeep(
      map(filteredCities, cityObj => {
        return apply({
            funcName: 'filtering',
            pathInState: 'relations_data',
            params: { cityId: cityObj.id }
        }, relations)
      })
    )
    console.log("FILTERED RELATIONS: ", relations)

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
        // console.log(option)
        stationSearchOptions.push(option)
        // console.log('dddddddddd',countries[relationObj.countryId])
      }
    })
    FinalOptions = stationSearchOptions
    // console.log(FinalOptions)

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

    // console.log('options: ', FinalOptions)
    return FinalOptions
  } 

  executeQuery = (querySignature, input) => {
    this.props.client.query({
      query: querySignature(input)
    })
    .then(results => {
      console.log('QUERY RESULTS FROM SERVER: ', results)

      // map(results.data.normalizedSearch, (reducerData, reducerName) => { 
      //   console.log(`Results for ${reducerName}`, reducerData)
      //   this.props.add(reducerName, map(reducerData, dataObj => dataObj))
      // })
      this.props.multiDispatchQueryResults(results.data.normalizedSearch)

    })
    .catch(error => console.error(error));
  }
    
  handleOptionSelected = (event, option) => {
    console.log('Option: ', option.cityId)
  }

  myTimer = '' 
  handleUserInput = (event) => {
    // reuse the event for different values
    event.persist()
    // cancel previous timer if any
    clearTimeout(this.myTimer)
    // get search term and do the following if any
    const searchTerm = event.target.value
    if (searchTerm) {
      // set new timer
      this.myTimer = setTimeout(()=> {
        console.log('searchTerm: ', searchTerm)
        // apply filter on redux
        const optionsFromRedux = this.filterReduxForOptions(searchTerm)
        if (optionsFromRedux.length !== 0) {
          this.setState({optionsFromRedux})
        } else {
          // execute query if there is a search term (the function automatically updates redux)
          this.executeQuery(querySearchOptions, searchTerm)
        }
      }, 500)
    } else {console.log("No term is entered")}
  }
  
  render() {
    return (
      <>
        <Autocomplete
          options={this.state.optionsFromRedux}
          getOptionLabel={option =>
            option.stationName ?
            `${option.countryName}, ${option.cityName}, ${option.stationName}` : 
            `${option.countryName}, ${option.cityName}`
          }
          onChange={this.handleOptionSelected}
          renderInput={params => (
            <TextField {...params} 
              label={this.props.searchType == 'station' ? 'Search city and select one' : 'Search city and select station'} 
              onChange={this.handleUserInput} 
              variant="outlined" fullWidth />
          )}
        />
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

export default withApollo(connect(mapStateToProps, normalizedMapDispatchToProps)(Search));
