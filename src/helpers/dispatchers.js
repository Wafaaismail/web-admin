import { map } from 'lodash'

export const normalizedMapDispatchToProps = dispatch => ({
  // Add action dispatcher
  add: (reducer, data) =>
    dispatch({
      type: `add_${reducer}`,
      payload: data
    }),

  // add: (reducer, data) => {
  //   if (data instanceof Array) {
  //     const listOfActions = map(data, dataObj => ({
  //       type: `add_${reducer}`,
  //       payload: dataObj
  //     }))
  //     dispatch(listOfActions)
  //   } else {
  //     const oneAction = {
  //       type: `add_${reducer}`,
  //       payload: data
  //     }
  //     dispatch(oneAction)
  //   }
  // },

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
