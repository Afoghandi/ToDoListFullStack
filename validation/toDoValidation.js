const Validator = require('validator');

const isEmpty = require('./isEmpty');

const validateToDoInput = (data) => {
	let errors = {};

	// check content field
	if (isEmpty(data.content)) {
		errors.content = 'Content field cannot be Empty';
	} else if (!Validator.isLength(data.content, { min: 1, max: 300 })) {
		errors.content = 'Content field must be between 1 and 3';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};

module.exports = validateToDoInput;
