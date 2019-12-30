import { combineReducers } from 'redux'
import { map, cloneDeep, get } from 'lodash'
import uuid from '../helpers/uuid'

// reducers names
const reducerNames = ['test']

const setData = (state, action) => {
  /* general handler that executes data-setting action */

  // copy current state
  const newState = cloneDeep(state)
  // create uuid
  const UUID = uuid()
  // add a new property (uuid: { ...data })
  newState.data[UUID] = { ...action.payload }
  return newState
}

const buildReducers = () => {
  const reducers = {}
  map(reducerNames, (reducerName) => {
    // customize handlers for each reducer
    const handlers = {
      [`setData_${reducerName}`]: setData
    }
    // add reducer to reducers
    reducers[reducerName] = (state = { data: {} }, action) => (
      get(handlers, action.type, state => state)(state, action)
    )
  })
  return reducers
}

const createdReducers = buildReducers()
const allReducers = combineReducers(createdReducers)

export default allReducers
