import React, { Component } from "react";
import JourneyMutation from "./journeyMutation";
import { set, map } from "lodash";
import Button from "@material-ui/core/Button";
import uuid from "../../helpers/uuid";
import { Icon } from "antd";

let journeyGraph = {
  node: {
    name: "journey",
    props: {},
    relations: []
  }
};
class JourneyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }
  AddTripOnClick = event => {
    let id = uuid();
    journeyGraph.node.relations = {
      ...journeyGraph.node.relations,
      [id]: {
        node: {
          name: "trip",
          props: { startDate: "24/3/2020", endDate: "28/3/2020" },
          relations: [
            { type: "FROM", with: "796df454-246d-40e5-90a2-11c9554a2185" },
            { type: "TO", with: "b4a43a4d-4b45-4a15-b5d4-d53d1babc252" },
            { type: "MAKES", with: "789" }
          ]
        },
        type: "HAS"
      }
    };
    let trips = this.state.trips;
    this.setState({
      trips: trips.concat({ id })
    });
  };
  DeleteTripOnClick = tripId => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      let trips = [...this.state.trips];

      let filteredTrips = this.state.trips.filter(trip => trip.id !== tripId);

      this.setState({ trips: filteredTrips });
    }
  };
  journeyGraphHandler = (fieldName, value, tripID) => {
    set(
      journeyGraph,
      `node.relations.${tripID}.node.props.${fieldName}`,
      value
    );
  };

  onClick = () => {
    this.props.handleRender();
  };

  render() {
    return (
      <>
        <Button onClick={this.onClick}>
          <Icon type="left"></Icon>
        </Button>
        <h1
          style={{
            textAlign: "center",
            padding: "20px",
            color: "white",
            backgroundColor: "lightblue",
            fontFamily: "Arial"
          }}
        >
          Add,Edit and Delete journey
        </h1>

        <div>
          <Button
            onClick={this.AddTripOnClick}
            variant="contained"
            color="primary"
          >
            Create New Trip
          </Button>
          {map(this.state.trips, (trip, key) => {
            return (
              <JourneyMutation
                key={key}
                DeleteTripOnClick={this.DeleteTripOnClick}
                id={trip.id}
                journeyGraphHandler={this.journeyGraphHandler}
              />
            );
          })}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            this.props.handleChangingState(
              "journey",
              journeyGraph,
              "add",
              "",
              {}
            )
          }
        >
          Save Journey
        </Button>
      </>
    );
  }
}
export default JourneyApp;
