import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import * as FieldJSON from './fields'
// import * as Comp from './fieldsComp'
import { get, map, omit } from 'lodash'
import { Formik, Field, Form } from 'formik'
import { TextField,Button } from '@material-ui/core';



// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles(theme => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// export default function PopupStation() {
//     const classes = useStyles();
//     // getModalStyle is not a pure function, we roll the style only on the first render
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);
  
//     const handleOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//         setOpen(false);
//     };

// renderfield2 = () => {

//     return map(omit(FieldJSON.default, ["select"]), (value, key) => {
//         const Component = get(Comp, value.type, Comp.Text)

//         return (<Field name={value.name}>

//             {({ field, form, meta }) => (
//                 <div>
//                     <Component key={key} {...{ field }} {...value}  />


//                     <br /><br />
//                 </div>
//             )}

//         </Field>)


//     })

// }
// form = (props) => {

//     return <Form onSubmit={props.handleSubmit}>
//         {this.renderfield2()}
//         <Button key="submit" htmlType="submit" type="primary" >
//             Submit
//         </Button>
//     </Form>


// }

// // ***********************************************************************************************************************

// render(){
//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//           Add Station
//       </button>
//       <Modal
//         aria-labelledby="Add or Edit Station"
//         // aria-describedby="Add New or Edit Current Station"
//         open={open}
//         onClose={handleClose}
//       >
//         <div style={modalStyle} className={classes.paper}>
//           <h2 id="Add or Edit Station">Add New or Edit Current Station</h2>
//           {/* <p id="Add New or Edit Current Station">
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </p> */}
//           <PopupStation />
//         </div>

//         <Formik
//                         initialValues={{ select:" ",station: " "}}
                       
//                         render={this.form}


//                     ></Formik>

//       </Modal>
//     </div>
//   );
// }
// }}


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
  
  export default function SimpleModal() {
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
        <Button variant="contained" color="secondary" onClick={handleOpen}> Open Modal</Button>
         
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
               initialValues={{ addstation:" " }}><Form>
                    {/* <Field type="Text" name="addstation" placeholder="add"  /> */}
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <Button variant="contained" color="secondary">
                     Add
                    </Button>
                    {/* <button key="submit" htmlType="submit" type="primary" >
                Add
            </button> */}
                    </Form>
                   
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
  