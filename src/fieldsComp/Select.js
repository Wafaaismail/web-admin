import React, { Component } from 'react'
import { Formik, Field, Form } from "formik";
import { connect } from 'react-redux'
import { map } from 'lodash'
class SelectComponent extends Component {

    handleChange = (value) => {
        const { field } = this.props
        // console.log(field.name, value.target.value)
        field.onChange({
            target: {
                name: field.name,
                value: value.target.value
            }
        })
    }
    render() {


        const { stations, field } = this.props
       
        return (
            <div className="select">
                <label style={{ width: "100 px" }}>{this.props.label}</label>
                <select
                    value={field.value}
                    onChange={(val) => this.handleChange(val)}
                    name={this.props.name}
                >
                    {map(station, (val, key) => {
                        return <option key={key} title={val.title}
                            value={key}>{val.title}  </option>
                    })}
                </select>
            </div>


        )
    }
}
const mapStateToProps = (state)=>({
    station: state.station.data
})
export const Select =  connect(mapStateToProps)(SelectComponent)