import PlanSerializer from "./PlanSerializer.js"

class UserSerializer {
  static getSummary({ id, username, image_url }) {
    return { id, username, image_url }
  }

  static async getDetails(user) {
    const allowedAttributes = ["id", "username", "image_url", "isAi", "isAdmin"]
    const serializedUser = {}

    for (const attr of allowedAttributes) {
      serializedUser[attr] = user[attr]
    }

    const relatedPlansOwned = await user.$relatedQuery("plansOwned")
    const serializedPlans = await Promise.all(relatedPlansOwned.map(async plan => {
      return await PlanSerializer.getDetails(plan)
    }))
    serializedUser.plansCreated = serializedPlans

    const relatedFriends = await user.getFriends()
    serializedUser.friends = relatedFriends

    return serializedUser
  }
}

export default UserSerializer