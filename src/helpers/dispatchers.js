export const normalizedMapDispatchToProps = dispatch => ({
  //Add action dispatcher
  add: (reducer, data) =>
    dispatch({
      type: `add_${reducer}`,
      payload: data
    }),

  //Update action dispatcher
  update: (reducer, nodeId, data) =>
    dispatch({
      type: `update_${reducer}`,
      nodeId,
      payload: data
    }),

  //Delete action dispatcher
  erase: (reducer, nodeId) =>
    dispatch({
      type: `erase_${reducer}`,
      nodeId
    })
});
