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
  delete: (reducer, nodeId) =>
    dispatch({
      type: `delete_${reducer}`,
      nodeId
    })
});
