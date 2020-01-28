import React, { Component } from 'react'
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo';
// import {gun} from './subscription/initGun'
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map, flattenDeep, filter, get, reduce, assign } from 'lodash'
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

const queryTripsByStation = (stationId) => {
  const QUERY = `
    {
      normalizedSearch(
        settings: {
          searchNode: "station"
          matchByExactProps: {id: "${stationId}"}
          searchReturn: "self, relative1"
          relative1: "trip"
        }  
      )
    }
  `
  return gql(QUERY)
}

const queryJourenysByTrip =(tripId)=>{
  const QUERY =`
    {
      normalizedSearch(
        settings: {
          searchNode: "trip"
          matchByExactProps: {id: "${tripId}"}
          searchReturn: "self, relative1"
          relative1: "journey"
        }  
      )
    }
  `
  return gql(QUERY)
}

const queryTripsByJourney =(journeyId)=>{
  const QUERY =`
    {
      normalizedSearch(
        settings: {
          searchNode: "journey"
          matchByExactProps: {id: "${journeyId}"}
          searchReturn: "self, relative1"
          relative1: "trip"
        }  
      )
    }
  `
  return gql(QUERY)
}

const queryStationsByTrip =(tripId)=>{
  const QUERY =`
    {
      normalizedSearch(
        settings: {
          searchNode: "trip"
          matchByExactProps: {id: "${tripId}"}
          searchReturn: "self, relative1"
          relative1: "station"
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

  executeQuery = async (querySignature, input) => {
    const queryResults = await this.props.client.query({
      query: querySignature(input)
    })
    .then(results => {
      this.props.multiDispatchQueryResults(results.data.normalizedSearch)
      return results.data.normalizedSearch
    })
    .catch(error => console.error(error))
    // console.log('queryResults', queryResults)
    return queryResults
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
          reduxState.station_data[relation.stationId]
        )
        // create and add options
        map(stationObjs, stationObj => {
          finalOptions.push({ ...option, stationName: stationObj.name ,stationId: stationObj.id })
        })
      } else { finalOptions.push(option) }
    })

    // console.log('options: ', finalOptions)
    return finalOptions
  }
  
  dataForJourneysChoices = async (stationId) => {
    /*** FROM STATION TO JOURNEYS (UP) ***/
    // get related trips: query, dispatch in redux, return
    const tripsRelatedToStatoin = (await this.executeQuery(queryTripsByStation, stationId)).trip_data
    // console.log('tripsRelatedToStatoin', tripsRelatedToStatoin)
    // get related journeys: query, dispatch in redux, return
    const journeysRelatedToStatoin = await reduce(tripsRelatedToStatoin, async (result, tripObj, tripId) => {
      const journeysRelatedToTrip = (await this.executeQuery(queryJourenysByTrip, tripId)).journey_data
      result = await result // wait for result promise to resolve to an object
      return assign(result, journeysRelatedToTrip)
    }, {})
    // console.log('journeysRelatedToStatoin', journeysRelatedToStatoin)
    // console.log('LENGTH', Object.keys(journeysRelatedToStatoin).length)

    /*** FROM JOURNEYS TO STATIONS (DOWN) ***/
    const completeJournieseData = await Promise.all(
      map(journeysRelatedToStatoin, async (journeyObj, journeyId) => {
        // get related trips: query, dispatch in redux, return
        const tripsRelatedToJourney = (await this.executeQuery(queryTripsByJourney, journeyId)).trip_data
        // console.log('tripsRelatedToJourney', tripsRelatedToJourney)
        // get related stations: query, dispatch in redux, return
        const stationsRelatedToJourney = await reduce(tripsRelatedToJourney, async (result, tripObj, tripId) => {
          const stationsRelatedToTrip = (await this.executeQuery(queryStationsByTrip, tripId)).station_data
          result = await result // wait for result promise to resolve to an object
          // console.log('stationsRelatedToTrip', stationsRelatedToTrip)
          // console.log('result', result)
          return assign(result, stationsRelatedToTrip)
        }, {})
        // console.log('stationsRelatedToJourney', stationsRelatedToJourney)
        return {journey: journeyObj, tripsRelatedToJourney, stationsRelatedToJourney}
      })
    )
    console.log('completeJournieseData', completeJournieseData)
    return completeJournieseData // dont return here, set it in local state and pass it to searchResult
  }

  dataForStationsChoices = (cityId) => {
    // get relations between our city and its stations 
    const targetRelations = apply({
      funcName: 'filterByExactProps',
      pathInState: 'relations_data',
      params: { exactProps: { cityId } },
      then: {
        funcName: 'filterByKeyExists',
        params: { key: 'stationId' }
      }
    })
    // get stations of the city
    const cityStations = map(targetRelations, relation =>
      this.props.reduxState.station_data[relation.stationId]
    )
    this.setState({ cityStations })
  }

  handleOptionSelected = (event, option) => {
    option?
    (this.props.searchType === 'journey'?
        this.dataForJourneysChoices(option.stationId):
        this.dataForStationsChoices(option.cityId)
    ): console.log('No option is selected')
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
        <SearchResult searchType={this.props.searchType} data={this.state.cityStations} handleChangingState={this.props.handleChangingState} />
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
