import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import ReactSelect from 'react-select';

export const InputBox = (props) => {
	const {
		id, className, label, placeholder, isDisabled, type, name,
		isReq, value, onChange, onBlur, onFocus, onClick, error
	} = props;
	return (
		<FormGroup>
			<Label className="font-weight-bold">
				{label}
				{isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			<Input
				className={className}
				id={id}
				title={label}
				placeholder={placeholder}
				disabled={isDisabled}
				type={type}
				name={name}
				data-attribute={isReq}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				onClick={onClick}
			/>
			{error && <span style={{ color: "red" }}> {error} </span>}
		</FormGroup >
	);
}

export const DropDownBox = (props) => {
	const { isDisabled, list, label, name, isReq, value, onChange, onBlur, error } = props;
	return (
		<FormGroup>
			<Label className="font-weight-bold">
				{label}
				{isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			<ReactSelect
				name={name}
				title={label}
				isClearable={true}
				isDisabled={isDisabled}
				options={list}
				value={value}
				// value={list ? list.find(item => item.value === value) : null}
				onChange={(selectedOption) => {
					let e = {
						target: {
							'name': name,
							'value': selectedOption ? selectedOption : '',
						}
					}
					onChange(e);
				}}
			/>
			{error && <span style={{ color: "red" }}> {error} </span>}
		</FormGroup>
	);
}

InputBox.defaultProps = {
	isReq: false
}

// InputBox.propTypes = {
// 	type: PropTypes.string.isRequired,                                                                                                    //when we declare any props which is Required then must be defined their "its default value".
// 	name: PropTypes.string.isRequired,
// 	value: PropTypes.string.isRequired,
// 	label: PropTypes.string,
// 	placeholder: PropTypes.oneOf(
// 		['number', 'string']
// 	)
// }