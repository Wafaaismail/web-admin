import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function Text(props) {
  const classes = useStyles();
//   console.log(props)
  const {field}=props;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>       
        <TextField
          id={props.fieldSettings.id}
          label={props.fieldSettings.placeholder}
          type={props.fieldSettings.filedtype}
          autoComplete="current-password"
          variant="filled"
          onChange={field.onChange}
        />
       
      </div>
    </form>
  );
}
