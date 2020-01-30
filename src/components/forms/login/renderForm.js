import React, { Component } from "react";
import * as fieldsJSON from "./fields.json";
import { Formik, Form } from "formik";
import _ from "lodash";
import MiddleComponent from "./MiddleComponent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import axios from 'axios'

// design for button
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default class RenderForm extends Component {
  handlelogin = values => {
    console.log(values);
    // axios.post('',values)
    // .then(res=>console.log(res))
    // .catch(err=>console.log(err))
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          onChange={this.onFormSubmit}
        >
          {/* Form rendering function */}
          {FormikProps => {
            return (
              <Form>
                {//map fields component dynamically from json file using middle component
                _.map(fieldsJSON.default, (fieldSettings, keyName) => {
                  return (
                    <MiddleComponent
                      key={keyName}
                      fieldSettings={{ ...fieldSettings }}
                      options={this.props.users}
                    />
                  );
                })}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.handlelogin(FormikProps.values)}
                >
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
//call back function ()=>esmelfunction
//bind(this,paramters)
