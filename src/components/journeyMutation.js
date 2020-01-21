import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import HandleDateTime from './dateComponent';
import VehicleSelects from './selectVehicle'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function JourneyMutation(props) {

    const [selectedSourceStation, setSelectedSourceStation] = React.useState("From_Station")
    const [selectedDestinationStation, setSelectedDestinationStation] = React.useState("To_Station")

    const classes = useStyles();

    const handleSourceStationChange = station => {
        setSelectedSourceStation(station);
    };
    const handleDestinationStationChange = station => {
        setSelectedDestinationStation(station);
    };
    console.log(props)

    return (
        <>
            <div className={classes.root}>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => handleSourceStationChange("Station1")}>{selectedSourceStation}</Button>
                    <Button onClick={() => handleDestinationStationChange("Station2")}>{selectedDestinationStation}</Button>
                </ButtonGroup>
                <HandleDateTime />
                <VehicleSelects />
                <Button variant="contained" color="secondary"
                    onClick={() => props.DeleteTripOnClick(props.id)}
                >
                    Delete
            </Button>

            </div>

        </>
    );
}
