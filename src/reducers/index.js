import { combineReducers } from "redux";
import { omit, get, reduce } from "lodash";
import { gun } from "../components/subscription/initGun";
import { operations } from "./operations";

// reducers names
const reducerNames = ["station", "journey"];
// operation names
const operationNames = ["add", "update", "erase"];

const getData = name => {
  let state = {};

  //Getting nodes from gunDB and send them to redux state
  gun.get(name).map((obj, id) => (state = { ...state, [id]: omit(obj, "_") }));

  return state;
};

const buildReducers = () => {
  //Map on reducer name to create reducers for each one
  const reducers = reduce(
    reducerNames,
    (result, reducerName) => {
      //Map on operations name to create reducer for each action
      const handlers = reduce(
        operationNames,
        (result, operationName) => {
          result[`${operationName}_${reducerName}`] = get(
            operations,
            operationName
          );
          return result;
        },
        {}
      );
      console.log(handlers);
      result[reducerName] = (state = getData(reducerName), action) => {
        return get(handlers, action.type, d => d)(state, action);
      };
      return result;
    },
    {}
  );
  return reducers;
};

//Build reducers, combine them and send them to redux-store
const createdReducers = buildReducers();
const allReducers = combineReducers(createdReducers);

export default allReducers;
