import React, { Component } from 'react'
import JourneyMutation from './journeyMutation';
import {set, map } from 'lodash'
import Button from '@material-ui/core/Button';
import uuid from '../../helpers/uuid'


let journeyGraph = {
    node: {
        name: "journey",
        props: {},
        relations: []
    }
};
class JourneyApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trips: []
        }
    }
    AddTripOnClick = (event) => {
        let id = uuid()
        journeyGraph.node.relations = {
            ...journeyGraph.node.relations,
            [id]: {
                node: {
                    name: "trip",
                    props: {},
                    relations: [
                        { type: "FROM", with: "796df454-246d-40e5-90a2-11c9554a2185" },
                        { type: "TO", with: "b4a43a4d-4b45-4a15-b5d4-d53d1babc252" },
                        { type: "MAKES", with: "789" }
                    ]
                },
                type: "HAS"
            }

        }
        let trips = this.state.trips
        this.setState({
            trips: trips.concat({ id })
        });
    }
    DeleteTripOnClick = (tripId) => {

        if (window.confirm("Are you sure you want to delete this trip?")) {
            let trips = [...this.state.trips]

            let filteredTrips = this.state.trips.filter(trip => trip.id !== tripId);
            // console.log('filteredTrips', filteredTrips)

            this.setState({ trips: filteredTrips })
        }

    }
    journeyGraphHandler = (fieldName, value, tripID) => {
        // console.log(tripID)

        set(journeyGraph,`node.relations.${tripID}.node.props.${fieldName}`, value) 
        // console.log(journeyGraph)

    }

    render() {
        // console.log('trips', this.state.trips)
        return (
            <>
                <h1 style={{ textAlign: 'center', padding: "20px", color: 'white', backgroundColor: "lightblue", fontFamily: "Arial" }}>Add,Edit and Delete journey</h1>

                <div>
                    <Button onClick={this.AddTripOnClick} variant="contained" color="primary">Create New Trip</Button>
                    {map(this.state.trips, (trip, key) => {
                        // console.log(trip)
                        return <JourneyMutation key={key} DeleteTripOnClick={this.DeleteTripOnClick} id={trip.id} journeyGraphHandler={this.journeyGraphHandler} />
                    })}

                </div>
                <Button variant="contained" color="primary"
                    onClick={() => this.props.handleChangingState("journey", journeyGraph)}
                >
                    Save Journey
                                 </Button>

            </>
        )
    }
}
export default JourneyApp;