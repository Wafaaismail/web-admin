import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function HandleDateTime() {
    // The first commit of Material-UI
    const [selectedSourceDate, setSelectedSourceDate] = React.useState(new Date());
    const [selectedDestinationDate, setSelectedDestinationDate] = React.useState(new Date());


    const handleSourceDateChange = date => {
        setSelectedSourceDate(date);
    };
    const handleDestinationDateChange = date => {
        setSelectedDestinationDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
                // margin="normal"
                id="date-picker-source"
                label="Date picker source"
                format="MM/dd/yyyy"
                value={selectedSourceDate}
                onChange={handleSourceDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <KeyboardDatePicker
                // margin="normal"
                id="date-picker-destination"
                label="Date picker destination"
                format="MM/dd/yyyy"
                value={selectedDestinationDate}
                onChange={handleDestinationDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />

        </MuiPickersUtilsProvider>
    );
}