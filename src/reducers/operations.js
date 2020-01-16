import { omit } from "lodash";

export const operations = {
  add: (state, action) => {
    // copy current state
    const newState = cloneDeep(state);

    // create uuid
    //modefied, id will be created from gun and sent to redux
    // const UUID = uuid()

    // add a new node (id: { ...props })
    newState.data[action.payload.id] = { ...action.payload };

    return newState;
  },
  update: (state, action) => {
    // copy current state
    const newState = cloneDeep(state);
    //Update props for existing node
    newState.data[action.nodeId] = {
      ...newState.data[action.nodeId],
      ...action.payload
    };
    return newState;
  },
  delete: (state, action) => {
    // copy current state
    const newState = cloneDeep(state);
    //Delete Existing node
    newState = omit(newState, action.nodeId);
    return newState;
  }
};
