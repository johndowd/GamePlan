class PlanClient {
  static async fetchThreePlans(index, params) {
    const search = params.length > 0 ? '&' + params.join('&') : ''
    const url = `/api/v1/plans?q=3&index=${index}${search}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.error('error in fetch')
      }
      const body = await response.json()
      return body.plans
    } catch (error) {
      console.error(error)
    }
  }

  static async fetchPlanById(id) {
    try {
      const response = await fetch(`/api/v1/plans/${id}`)
      const body = await response.json()
      return body.plan
    } catch (error) {
      console.error(error)
    }
  }
}

export default PlanClient