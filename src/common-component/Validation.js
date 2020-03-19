export const checkValidation = (errors, data, notReq) => {
  const finalErrors = {};
  Object.keys(data).map((key) => {
    if (!notReq.includes(key) && data[key] === '' || data[key] === {}) {
      finalErrors[key] = `Please enter ${key}.`
    }
  });
  Object.keys(errors).map((key) => {
    if (errors[key] !== "") {
      finalErrors[key] = errors[key]
    }
  });
  return finalErrors;
};

export const getRegExp = (name) => {

  switch (name) {
    case 'name':
    case 'firstName':
    case 'lastName':
    case 'firstNameSecondary':
    case 'lastNameSecondary':
      return (/^([A-Z]*[a-z]*){2,20}$/);
    case 'email':
    case 'emailSecondary':
      return (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/);
    case 'phone':
    case 'phoneSecondary':
      return (/^(?=.{16})/);
    case 'postal':
    case 'postalSecondary':
      return (/^[0-9]{5}$/);
    case 'password':
      return (/^(?=.*[0-9])(?=.{2,})/);
    default:
      break;
  }
}

export const phoneNumberValidation = (value) => {
  let input = value.replace(/\D/g, '');
  input = input.substring(0, 10);
  var size = input.length;
  if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = '(' + input;
  } else if (size < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
  }
  return input;
}