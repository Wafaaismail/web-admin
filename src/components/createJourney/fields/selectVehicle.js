import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(4),
        },
    },
    input: {
        borderRadius: 5,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 13,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 5,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function VehicleSelects() {
    const classes = useStyles();
    const [vehicle, setVehicle] = React.useState('');
    const handleChange = event => {
        setVehicle(event.target.value);
    };
    return (
        <div>

            <FormControl className={classes.margin}>
                {/* <InputLabel htmlFor="demo-customized-select-native">Select Vehicle</InputLabel> */}
                <NativeSelect
                    // id="demo-customized-select-native"
                    value={vehicle}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <option >Select Vehicle</option>
                    <option value={'Train'}>Train</option>
                    <option value={'flight'}>Flight</option>
                    <option value={'ship'}>Ship</option>
                </NativeSelect>
            </FormControl>
        </div >
    );
}
