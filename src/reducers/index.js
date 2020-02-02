import { combineReducers } from "redux";
import { omit, get, reduce, map } from "lodash";
import { gun } from "../components/subscription/initGun";
import { operations } from "./operations";

// reducers names
const reducerNames = [
  "station",
  "journey",
  "trip",
  "city_data",
  "station_data",
  "country_data",
  "relations_data",
  "trip_data",
  "journey_data"
];

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
      result[reducerName] = (state = getData(reducerName), action) => {
        return get(handlers, action.type, d => d)(state, action);
      };
      return result;
    },
    {}
  );
  return reducers;
};

// build, combine and export reducers
const createdReducers = buildReducers();
const combinedReducers = combineReducers(createdReducers);
export default combinedReducers;
