import { omit } from "lodash";

export const operations = {
  add: (state, action) => {
    // Create node and return new State
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  },
  update: (state, action) => {
    //Update props for existing node and return new state
    return {
      ...state,
      [action.nodeId]: {
        ...state[action.nodeId],
        ...action.payload
      }
    };
  },
  erase: (state, action) => {
    console.log("delete");
    //Delete Existing node and return new state
    return omit(state, action.nodeId);
  }
};
