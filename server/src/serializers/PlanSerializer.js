class PlanSerializer {
  static async getDetails(plan) {
    const allowedAttributes = ["id","name", "genre", "playerCount", "location", "createdAt", "updatedAt"]
    const serializedPlan = {}

    for (const attr of allowedAttributes) {
      serializedPlan[attr] = plan[attr]
    }

    const relatedUsers = await plan.$relatedQuery("users")
    serializedPlan.players = relatedUsers
    return serializedPlan
  }
}

export default PlanSerializer