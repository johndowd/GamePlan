import UserSerializer from "./UserSerializer.js"

class PlanSerializer {
  static async getDetails(plan) {
    const allowedAttributes = ["id","name", "genre", "playerCount", "location", "createdAt", "updatedAt", "date"]
    const serializedPlan = {}

    for (const attr of allowedAttributes) {
      serializedPlan[attr] = plan[attr]
    }

    const relatedUsers = await plan.$relatedQuery("users")

    serializedPlan.players = relatedUsers.map(user => { 
      return UserSerializer.getUsername(user)
    })
    serializedPlan.owner = await plan.$relatedQuery("owner")
    return serializedPlan
  }
}

export default PlanSerializer