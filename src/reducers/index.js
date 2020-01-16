import { combineReducers } from "redux";
import { map, cloneDeep, get } from "lodash";
import uuid from "../helpers/uuid";
import { gun } from "../components/subscription/initGun";
import operations from "./operations";

// reducers names
const reducerNames = ["station", "journey"];
// operation names
const operationNames = ["add", "update", "delete"];

const getData = name => {
  let state = {};
  gun
    .get(name)
    .map()
    .on(function(object, id) {
      state = { ...state, [id]: omit(object, "_") };
    });
  return state;
};

const buildReducers = () => {
  const reducers = {};
  map(reducerNames, reducerName => {
    // customize handlers for each reducer and for each operation
    const handlers = map(operationNames, operationName => {
      const temp = {
        [`${operationName}_${reducerName}`]: get(operations, operationName)
      };
      return temp;
    });
    // add reducer to reducers
    reducers[reducerName] = (state = getData(reducerName), action) =>
      get(handlers, action.type, state => state)(state, action);
  });
  return reducers;
};

const createdReducers = buildReducers();
const allReducers = combineReducers(createdReducers);

export default allReducers;
