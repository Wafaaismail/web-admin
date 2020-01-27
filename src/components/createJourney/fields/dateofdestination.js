import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'

export default function DateofDestination(props) {
    // The first commit of Material-UI
    const [selectedDestinationDate, setSelectedDestinationDate] = React.useState(new Date());



    const handleDestinationDateChange = date => {
        console.log(props.id)
        setSelectedDestinationDate(date);
        let { field } = props
        field && field.onChange({
            target: {
                name: field.name,
                value: moment(date).format("MM-DD-YYYY")
            }
        })
        props.journeyGraphHandler(field.name, moment(date).format("MM-DD-YYYY"), props.id)
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>


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