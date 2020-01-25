import { filter, size, map } from 'lodash'

export const filtering = (jsonPlan, data, state, props) => {
  return filter(data, jsonPlan.params)
}

export const counting = (jsonPlan, data, state, props) => {
  return size(data)
}
