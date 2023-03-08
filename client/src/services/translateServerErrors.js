import _ from 'lodash'

let translateServerErrors = (errors) => {
  let serializedErrors = {}

  Object.keys(errors).forEach((key) => {
    const messages = errors[key].map((error) => {
      const field = key //_.startCase(key)
      serializedErrors = {
        ...serializedErrors,
        [field]: error.message.replace(key, "")
      }
    })
  });
  return serializedErrors
};

export default translateServerErrors;
