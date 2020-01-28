import { combineReducers } from 'redux'
import { omit, get, reduce, map } from 'lodash'
import { gun } from '../components/subscription/initGun'

// reducers names
const reducerNames = [
  'station', 'journey', 'trip',
  'city_data', 'station_data', 'country_data', 'relations_data','trip_data','journey_data']

// general action handlers: common logic to be executed when an action is dispatched
const generalActionHandlers = {
  add: (state, action) => {
    // create node and return new State
    return {
      ...state,
      [action.payload.id]: action.payload
    }
  },
  update: (state, action) => {
    // update props for existing node and return new state
    return {
      ...state,
      [action.nodeId]: {
        ...state[action.nodeId],
        ...action.payload
      }
    }
  },
  erase: (state, action) => {
    // delete Existing node and return new state
    return omit(state, action.nodeId)
  }
}

const getDataFromGun = reducerName => {
  let state = {}

  // Get nodes from gunDB and send them to redux state
  gun
    .get(reducerName)
    .map((object, id) => (state = { ...state, [id]: omit(object, '_') }))

  return state
}

const buildReducers = () => {
  // map on reducer names to create the function for each reducer
  const reducers = reduce(reducerNames, (result, reducerName) => {

    // create a copy of general action handlers for each reducer
    const reducerActionHandlers = reduce(generalActionHandlers, (result, handlerFunc, handlerName) => {
      result[`${handlerName}_${reducerName}`] = handlerFunc
      return result
    }, {})

    // create the final reducer function
    result[reducerName] = (state = getDataFromGun(reducerName), action) => {
      return get(reducerActionHandlers, action.type, d => d)(state, action)
    }
    return result
  }, {})

  return reducers
}

// build, combine and export reducers
const createdReducers = buildReducers()
const combinedReducers = combineReducers(createdReducers)
export default combinedReducers
