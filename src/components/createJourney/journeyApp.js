import React, { Component } from 'react'
import JourneyMutation from './journeyMutation';
import { map } from 'lodash'
import Button from '@material-ui/core/Button';
import uuid from '../../helpers/uuid'


class JourneyApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trips: []
        }
    }
    AddTripOnClick = (event) => {
        let trips = this.state.trips
        this.setState({
            trips: trips.concat({ id: uuid() })
        });
    }
    DeleteTripOnClick = (tripId) => {

        if (window.confirm("Are you sure you want to delete this trip?")) {
            let trips = [...this.state.trips]

            let filteredTrips = this.state.trips.filter(trip => trip.id !== tripId);
            console.log('filteredTrips', filteredTrips)

            this.setState({ trips: filteredTrips })
        }

    }

    render() {
        console.log('trips', this.state.trips)
        return (
            <>
                <h1 style={{ textAlign: 'center', padding: "20px", color: 'white', backgroundColor: "lightblue", fontFamily: "Arial" }}>Add,Edit and Delete journey</h1>

                <div>
                    <Button onClick={this.AddTripOnClick} variant="contained" color="primary">Create New Trip</Button>
                    {map(this.state.trips, (trip, key) => {
                        console.log(trip)
                        return <JourneyMutation key={key} DeleteTripOnClick={this.DeleteTripOnClick} id={trip.id} />
                    })}

                </div>
            </>
        )
    }
}
export default JourneyApp;