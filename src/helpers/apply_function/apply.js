import * as myFunctions from './functions'
import { get } from 'lodash'
import { store } from '../../index'

export const apply = (jsonPlan, data = {}, state = store.getState(), props = {}) => {

  // get DATA to be processed
  const dataFromState = get(state, jsonPlan.pathInState, data)
  // console.log('APPLY DATA', dataFromState)
  
  // get the processor FUNCTION
  const chosenFunction = get(myFunctions, jsonPlan.funcName, (jsonPlan, data) => data)
  // console.log('APPLY FUNCTION', chosenFunction);
  
  // get result of running FUNCTION on DATA
  const result = chosenFunction(jsonPlan, dataFromState, state, { ...props, apply: apply })
  // console.log('APPLY RESULT', result);
  
  // recursively run apply on 'jsonPlan.then' - if any - as the new jsonPlan
  if (jsonPlan.then) {
    return apply(jsonPlan.then, result, state, props)
  }
  return result
}

/* NOTE: this is an example jsonPlan to send to the apply funciton:

{
  funcName: 'filtering',
  pathInState: 'subTasksReducer.data',
  params: { taskID: taskID },
  then: {
    funcName: 'counting',
  }
}

*/
