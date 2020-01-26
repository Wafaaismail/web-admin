import { TextField, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { get, map, omit, pick } from "lodash";
import * as FieldJSON from "../fieldsM";
import * as Comp from "../fieldsComp";
// export default function MiddleComponent (props){

//         const renderfield = () => {

// return map(omit(FieldJSON.default, ["select"]), (value, key) => {

//    const Component = get(Comp, value.type, Comp.Text)

//    return (<Field name={value.name}>

//       {({ field, form, meta }) => (

//              <div>
//                 <Component key={key} {...{ field }} {...value}  />

//                 <br /><br />
//             </div>
//          )}

//     </Field>)

//  })

// }}
class MiddleComponent extends Component {
  render() {
    return (
      <Field
        name={this.props.value.name}
        placeholder={this.props.value.placeholder}
      >
        {({ field, form, meta }) => {
          const FieldComponent = get(Comp,this.props.value.type,Comp.Text);

          return <FieldComponent field={field} />;
        }}
      </Field>
    );
  }
}
export default MiddleComponent;
