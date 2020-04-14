import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Label } from 'reactstrap';

export default function InputBox(props) {
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

InputBox.defaultProps = {
	isReq: false,
	isDisabled: false
}

InputBox.propTypes = {
	type: PropTypes.string.isRequired,                                                                                                    //when we declare any props which is Required then must be defined their "its default value".
	name: PropTypes.string.isRequired,
	value: PropTypes.node,
	label: PropTypes.string,
	isReq: PropTypes.bool,
	placeholder: PropTypes.node,
	error: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	className: PropTypes.string,
	id: PropTypes.string,
	onFocus: PropTypes.func,
	onClick: PropTypes.func,
}