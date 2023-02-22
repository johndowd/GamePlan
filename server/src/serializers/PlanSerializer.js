import CommentSerializer from "./CommentSerializer.js"
import UserSerializer from "./UserSerializer.js"

class PlanSerializer {
  static async getDetails(plan) {
    const allowedAttributes = ["id", "name", "location", "address", "createdAt", "updatedAt", "date"]
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

    const relatedComments = await plan.$relatedQuery("comments")
    serializedPlan.comments = await Promise.all(relatedComments.map(comment => {
      return CommentSerializer.getDetails(comment)
    }))

    return serializedPlan
  }
}

export default PlanSerializer