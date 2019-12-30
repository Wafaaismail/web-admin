import React, { Component } from 'react'
import { normalizedMapDispatchToProps } from '../helpers/dispatchers'
import { connect } from 'react-redux'

class App extends Component {
  constructor (props) {
    super(props)
    this.props.setData('test', { name: 'Amr' })
  }

  render () {
    return (
      <div>
        <h1>Welcome to My React App!!</h1>
      </div>
    )
  }
}

// get data from redux
const mapStateToProps = (state) => {
  return {
    testdata: state.test.data
  }
}

// pass data and dispatchers to this component
export default connect(
  mapStateToProps,
  normalizedMapDispatchToProps
)(App)
