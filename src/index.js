import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import allReducers from './reducers'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import Login from './components/forms/login'
import {reduxBatch} from '@manaflair/redux-batch'

// initialize store, activate Redux devtools
export const store = createStore(
  allReducers,
  compose(
    reduxBatch,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
  )
)

// store.dispatch(  {
//   type: `add_city_data`,
//   payload: {
//     "name": "cairo",
//     "id": "81c393d6-911d-46f2-a406-ffe3c5f938ee"
//   }
// })

// connect React app with Redux and render

ReactDOM.render(
  <Provider store={store}> <App /> </Provider>,
  document.getElementById('app')
)
