import { eachDayOfInterval, format, add, getDate } from "date-fns"

class PlanSummary {
  static formatString = 'yyyy-MM-dd'

  static getSummary(plans) {
    const dates = PlanSummary.getDates()
    for (let plan of plans) {
      const date = dates.find(d => {
        if (d.day === format(plan.date, PlanSummary.formatString)) {
          return d
        }
      })
      if (date) {
        date.value++
      }
    }
    return dates
  }

  static getDates() {
    const endDate = add(new Date(), { days: 45 })
    const dates = eachDayOfInterval({
      start: new Date(),
      end: endDate
    })
    const dataArray = dates.map(date => {
      return {
        value: 0,
        day: format(date, PlanSummary.formatString)
      }
    })
    return dataArray
  }
}

export default PlanSummary