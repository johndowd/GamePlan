const cleanUserInput = (input) => {
  const newObject = {}
  for (const attr in input) {
    if (input[attr] == "") {
      newObject[attr] = null
    } else {
      newObject[attr] = input[attr]
    }
  }
  return newObject
}

export default cleanUserInput;