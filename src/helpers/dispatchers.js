
export const normalizedMapDispatchToProps = (dispatch) => (
  {
    setData: (reducer, data) => (dispatch({
      type: `setData_${reducer}`,
      payload: data
    }))
  }
)
