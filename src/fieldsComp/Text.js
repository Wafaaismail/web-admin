import React,{Component} from 'react'
export class Text extends Component{
    handleChange =(value)=>{
        const {field}=this.props
        field.onChange({
            target:{
                name: field.name,
                value: value.target.value

            }
        })

    }
    render() {

        const { field } = this.props
        return (
            <div className="textfield">
                <label style={{ width: "100 px" }}>{this.props.label}</label>

                <input name={this.props.name} type="Text"
                    onChange={(val) => this.handleChange(val)} />

            </div>


        )
    }
}