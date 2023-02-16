const translateDate = (date) => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dateObject = new Date(date)
  const tDay = weekdays[dateObject.getDay()]
  const tDate = dateObject.toLocaleDateString()
  const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const tTime = time.replace(/^\b0/g, '')


  return { tDay, tDate, tTime }
}

export default translateDate