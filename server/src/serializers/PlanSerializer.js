import UserSerializer from "./UserSerializer.js"

class PlanSerializer {
  static async getDetails(plan) {
    const allowedAttributes = ["id", "name", "location", "createdAt", "updatedAt", "date"]
    const serializedPlan = {}

    for (const attr of allowedAttributes) {
      serializedPlan[attr] = plan[attr]
    }

    const relatedGame = await plan.$relatedQuery("game")
    serializedPlan.game = relatedGame

    const relatedUsers = await plan.$relatedQuery("users")
    serializedPlan.players = relatedUsers.map(user => {
      return UserSerializer.getSummary(user)
    })

    serializedPlan.owner = await plan.$relatedQuery("owner")

    return serializedPlan
  }
}

export default PlanSerializer