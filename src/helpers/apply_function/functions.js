import { filter, size, map, get } from 'lodash'

export const filterByExactProps = (jsonPlan, data, state, props) => {
  return filter(data, jsonPlan.params.exactProps)
}

export const filterByPartialProp = (jsonPlan, data, state, props) => {
  const propKey = Object.keys(jsonPlan.params.partialProp)[0]
  const propPartialValue = Object.values(jsonPlan.params.partialProp)[0]
  return filter(data, dataObj =>
    dataObj[propKey].toLowerCase().includes(propPartialValue.toLowerCase()))
}

export const filterByKeyExists = (jsonPlan, data, state, props) => {
  return filter(data, dataObj => get(dataObj, jsonPlan.params.key))
}

export const counting = (jsonPlan, data, state, props) => {
  return size(data)
}
