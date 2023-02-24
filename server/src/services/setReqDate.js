const setReqDate = (body) => {
  const [year, month, day] = body.date.split("-")
  const [hours, minutes] = body.time.split(":")
  const date = new Date(year, month - 1, day, hours, minutes)
  body.date = date
  delete body.time
}

export default setReqDate