import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as FieldJSON from "../fieldsM";
import * as Comp from "../fieldsComp";
import { get, map, omit } from 'lodash'
import { Formik, Field, Form } from 'formik'
import { TextField,Button } from '@material-ui/core';
import MiddleComponent from './MiddleComponent'

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
        {/* <button type="button" onClick={handleOpen}> */}
        <Button variant="contained" color="secondary" onClick={handleOpen}> Add New</Button>
         
        {/* </button> */}
       
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Stations</h2>
            <Formik 
            
               initialValues={{ addStation:"test" }}
              
               onSubmit={values =>{
                console.log(values)
                handleChangingState(values.addStation)}}
                
                >
                 {(FormikProps) => {
                    // console.log('FormikProps', FormikProps)
                    return (
                        <>
                          <Form >
                         
                         {
                  map(omit(FieldJSON.default, ["select"]), (value, key) => {
                  return <MiddleComponent key={key}  value={{ ...value }} /> 
                          })
                
                        }
                 <Button variant="contained" color="secondary" type="submit"   >
                 Add
                </Button>
                <Button variant="contained" color="secondary" type="submit" onClick={handleClose}>
                 close
                </Button>
  
                </Form> 

                 </>
                  )
                   

                  
                  {/* <Form>
                    <Field type="Text" id="addStation" name="addStation" placeholder="station name"  />
                    {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                    
                    {/* <button key="submit" htmlType="submit" type="primary" onClick={(values)=>{
                      console.log(values)
                      handleChangingState(values)}}>
                Add
            </button> */}
                    {/* </Form>  */}
          }}
                   
                    </Formik>
            {/* <Formik
      initialValues={{ addStation: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={(props: FormikProps<Values>) => ( */}
{/*      
            <SimpleModal /> */}
          </div>
        </Modal>
      </div>
    );
  }
  