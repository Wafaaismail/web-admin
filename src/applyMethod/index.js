import * as rendfunctions from './main'   
import {get} from 'lodash'
import {store} from '../index'


export const apply = (funcjsonPlan,data={},state=store.getState(),props={})=>{
    const returnedData = get(state,funcjsonPlan.path,data)
    let returnedFunction = get(rendfunctions,funcjsonPlan.key,(funcjsonPlan,data) => data) 
                                                                                    
    
    let result = returnedFunction(funcjsonPlan, returnedData, state, {...props, apply:apply})
   
    if (funcjsonPlan.then) {
        return apply (funcjsonPlan.then,result,state,props)     }
    return result 
}



