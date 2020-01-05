import {filter,size} from 'lodash'
import { funcjsonPlan } from './funcjson'

export const filtering = (funcjsonPlan,data,state,props)=>{  
    return filter(data, funcjsonPlan.params)
}

export const count =(funcjsonPlan,data,state,props) =>{        
    return size(data)  
}


