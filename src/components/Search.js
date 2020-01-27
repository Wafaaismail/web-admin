import React, { Component } from 'react'
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
// import {gun} from './subscription/initGun'
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map, flattenDeep, filter,get } from 'lodash'
import { apply } from '../helpers/apply_function/apply'
import SearchResult from './SearchResult';

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
  return gql(QUERY)
}

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  filterReduxForOptions = (searchTerm) => {
    const { reduxState, searchType } = this.props

    const finalOptions = []

    // get city objects that include search term
    const cityObjs = apply({
      funcName: 'filterByPartialProp',
      pathInState: 'city_data',
      params: { partialProp: { name: searchTerm } }
    })

    // do the following for each city object
    map(cityObjs, cityObj => {
      // get country relation
      const countryRelation = apply({
        funcName: 'filterByKeyExists',
        pathInState: 'relations_data',
        params: { key: 'countryId' },
        then: {
          funcName: 'filterByExactProps',
          params: { exactProps: { cityId: cityObj.id } }
        }
      })[0]
      // get country obj
      const countryObj = reduxState.country_data[countryRelation.countryId]
      // option up to now
      const option = { cityId: cityObj.id, countryName: countryObj.name, cityName: cityObj.name }
      // go for stations if its a 'journey' search or push the option above
      if (searchType !== 'station') {
        // get station relations
        const stationRelations = apply({
          funcName: 'filterByKeyExists',
          pathInState: 'relations_data',
          params: { key: 'stationId' },
          then: {
            funcName: 'filterByExactProps',
            params: { exactProps: { cityId: cityObj.id } }
          }
        })
        // get station objs
        const stationObjs = map(stationRelations, relation => 
          apply({
            funcName: 'filterByExactProps',
            pathInState: 'station_data',
            params: { exactProps: {id: relation.stationId} },
          })[0]
        )
        // create and add options
        map(stationObjs, stationObj => {
          finalOptions.push({...option, stationName: stationObj.name})
        })
      } else { finalOptions.push(option) }
    })

    console.log('options: ', finalOptions)
    return finalOptions
  }

  executeQuery = (querySignature, input) => {
    this.props.client.query({
      query: querySignature(input)
    })
    .then(results => {
      this.props.multiDispatchQueryResults(results.data.normalizedSearch)
    })
    .catch(error => console.error(error));
  }

  handleOptionSelected = (event, option) => {

    // get relations between our city and its stations 
    const targetRelations = apply({
      funcName: 'filterByExactProps',
      pathInState: 'relations_data',
      params: { exactProps: {cityId: option.cityId} },
      then: {
        funcName: 'filterByKeyExists',
        params: { key: 'stationId' }
      }
    })
    // get stations of the city
    const cityStations = map(targetRelations, relation => 
        apply({
          funcName: 'filterByExactProps',
          pathInState: 'station_data',
          params: { exactProps: {id: relation.stationId} },
        })[0]
    )
    
    this.setState({cityStations})
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
      this.myTimer = setTimeout(() => {
        // apply filter on redux
        const optionsFromRedux = this.filterReduxForOptions(searchTerm)
        if (optionsFromRedux.length !== 0) {
          this.setState({ optionsFromRedux })
        } else {
          // execute query if there is a search term (the function automatically updates redux)
          this.executeQuery(querySearchOptions, searchTerm)
        }
      }, 500)
    } else { console.log("No term is entered") }
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
              label={this.props.searchType == 'station' ? 
                'Search city and select one' : 'Search city and select station'}
              onChange={this.handleUserInput}
              variant="outlined" fullWidth />
          )}
        />
        <SearchResult searchType={this.props.searchType} data={this.state.cityStations } handleChangingState={this.props.handleChangingState}/>
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

export default withApollo(connect(mapStateToProps, normalizedMapDispatchToProps)(Search))
