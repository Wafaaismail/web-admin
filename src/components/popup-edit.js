import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import * as FieldJSON from './fields'
// import * as Comp from './fieldsComp'
import { get, map, omit } from 'lodash'
import { Formik, Field, Form } from 'formik'
import { TextField,Button } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export default function SimpleModal(props) {
    let node = {
      node: {
        name: "station",
        props: {},
        relations: [{ type: "EXISTS_IN", with: "123" }]
      }
    };
    const handleChangingState = (stationName) => {
      node.node.props = {name: stationName}
      props.handleChangingState("station",node)
      // console.log(node)
    }
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={handleOpen}> Edit</Button>
         
       
       
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Stations</h2>
            <Formik 
               initialValues={{ EditStation:"" }}
               onSubmit={values =>{
                handleChangingState(values.editStation)}}
                ><Form>
                    <Field type="Text" id="editStation" name="editStation" placeholder="station name"  />
                    <Button variant="contained" color="secondary" type="submit">
                    Edit
                    </Button>
                    </Form>
                   
                   </Formik>
                   </div>
        </Modal>
      </div>
    );
  }
  