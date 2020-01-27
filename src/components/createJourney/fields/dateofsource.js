import 'date-fns';
import React from 'react';
import { get } from 'lodash'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'
export default function DateofSource(props) {
    // The first commit of Material-UI
    const [selectedSourceDate, setSelectedSourceDate] = React.useState(new Date());


    const handleSourceDateChange = date => {
        setSelectedSourceDate(date);
        let { field } = props
        // console.log(date)
        field && field.onChange({
            target: {

                name: field.name,
                value: moment(date).format("MM-DD-YYYY")
            }
        })
        props.journeyGraphHandler(field.name, moment(date).format("MM-DD-YYYY"), props.id)
    };
    // console.log(props)
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

        </MuiPickersUtilsProvider>
    );
}