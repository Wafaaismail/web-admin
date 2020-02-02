import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as FieldJSON from "../fieldsM";
import { map, omit } from "lodash";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import MiddleComponent from "./MiddleComponent";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function Popup(props) {
  let node = {
    node: {
      name: "station",
      props: {},
      relations: {
        1: { type: "EXISTS_IN", with: "" }
      }
    }
  };
  const handleChangingState = stationName => {
    node.node.props = { name: stationName };
    node.node.relations[1].with = props.id;
    props.handleChangingState("station", node, props.action, props.id, {
      name: stationName
    });
  };
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const open = props.handlePopUp;
  const handleClose = () => {
    props.toggle();
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Stations</h2>
          <Formik
            initialValues={{ addStation: "test" }}
            onSubmit={values => {
              handleChangingState(values.addStation);
            }}
          >
            {FormikProps => {
              return (
                <>
                  <Form>
                    {map(omit(FieldJSON.default, ["select"]), (value, key) => {
                      return <MiddleComponent key={key} value={{ ...value }} />;
                    })}
                    <Button variant="contained" color="secondary" type="submit">
                      {props.action}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      onClick={handleClose}
                    >
                      close
                    </Button>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
