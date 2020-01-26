import { map } from 'lodash'

export const normalizedMapDispatchToProps = dispatch => ({
  multiDispatchQueryResults: (results) => {
    const listOfActions = []
    map(results, (reducerData, reducerName) => {
      map(reducerData, dataObj => {
        listOfActions.push({
          type: `add_${reducerName}`,
          payload: dataObj
        })
      })
    })
    dispatch(listOfActions)
  },  
  // Add action dispatcher
  add: (reducer, data) =>
    dispatch({
      type: `add_${reducer}`,
      payload: data
    }),
  // Update action dispatcher
  update: (reducer, nodeId, data) =>
    dispatch({
      type: `update_${reducer}`,
      nodeId,
      payload: data
    }),
  // Delete action dispatcher
  erase: (reducer, nodeId) =>
    dispatch({
      type: `erase_${reducer}`,
      nodeId
    })
});
