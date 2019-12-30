import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import allReducers from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// initialize store, activate Redux devtools
export const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// connect React app with Redux and render
ReactDOM.render(
  <Provider store={store}> <App /> </Provider>,
  document.getElementById('app')
)
