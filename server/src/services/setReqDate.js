const setReqDate = (req) => {
  const [year, month, day] = req.date.split("-")
  const [hours, minutes] = req.time.split(":")
  const date = new Date(year, month, day, hours, minutes)
  req.date = date
  delete req.time
}

export default setReqDate