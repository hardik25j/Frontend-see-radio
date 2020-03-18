import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import ReactSelect from 'react-select';

export const InputBox = (props) => {
	return (
		<FormGroup>
			<Label className="font-weight-bold">
				{props.label}
				{props.isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			<Input
				id={props.id}
				title={props.label}
				placeholder={props.placeholder}
				type={props.type}
				name={props.name}
				data-attribute={props.isReq}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				onFocus={props.onFocus}
				onClick={props.onClick}
			/>
			{props.error && <span style={{ color: "red" }}> {props.error} </span>}
		</FormGroup >
	);
}

export const DropDownBox = (props) => {
	return (
		<FormGroup>
			<Label className="font-weight-bold">
				{props.label}
				{props.isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			<ReactSelect
				name={props.name}
				title={props.label}
				isClearable={true}
				isDisabled={props.isDisabled}
				options={props.list}
				value={props.list ? props.list.find(item => item.value === props.value) : null}
				onChange={(selected) => {
					let e = {
						target: {
							'name': props.name,
							'value': selected ? selected.value : '',
						}
					}
					props.onChange(e)
				}}
				onBlur={() => {
					let e = {
						target: {
							'name': props.name,
							'value': props.value,
						}
					}
					props.onBlur(e)
				}}
			/>
			{props.error && <span style={{ color: "red" }}> {props.error} </span>}
		</FormGroup>
	);
}

// InputBox.defaultProps = {
// 	isReq: false
// }

// InputBox.propTypes = {
// 	type: PropTypes.string.isRequired,                                                                                                    //when we declare any props which is Required then must be defined their "its default value".
// 	name: PropTypes.string.isRequired,
// 	value: PropTypes.string.isRequired,
// 	label: PropTypes.string,
// 	placeholder: PropTypes.oneOf(
// 		['number', 'string']
// 	)
// }