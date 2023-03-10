class PlanClient {
  static async fetchTwoPlans(index) {
    const url = `api/v1/plans/find/?index=${index}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.error(error)
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