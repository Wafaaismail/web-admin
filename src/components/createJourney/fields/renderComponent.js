import React, { Component } from 'react';
import { get } from 'lodash';
import * as AllFieldComponents from './index';
import { Field } from 'formik';

class RenderComponent extends Component {
	render() {
		// fieldSettings={this.props.fieldSettings}

		return (
			<Field name={this.props.fieldSettings.name} placeholder={this.props.fieldSettings.placeholder}>
				{({ field, form, meta }) => {
					const FieldComponent = get(
						AllFieldComponents,
						this.props.fieldSettings.type,
						AllFieldComponents.VehicleSelects
					);

					return (
						<FieldComponent
							field={field}
							form={form}
							id={this.props.id}
							journeyGraphHandler={this.props.journeyGraphHandler}
						/>
					);
				}}
			</Field>
		);
	}
}
export default RenderComponent;
