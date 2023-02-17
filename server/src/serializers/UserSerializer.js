import PlanSerializer from "./PlanSerializer.js"

class UserSerializer {
  static getUsername(user) {
    return { id: user.id, username: user.username }
  }

  static async getDetails(user) {
    const allowedAttributes = ["id", "username",]
    const serializedUser = {}

    for (const attr of allowedAttributes) {
      serializedUser[attr] = user[attr]
    }

    const relatedPlansOwned = await user.$relatedQuery("plansOwned")
    const serializedPlans = await Promise.all(relatedPlansOwned.map(async plan => {
      return await PlanSerializer.getDetails(plan)
    }))
    serializedUser.plansCreated = serializedPlans

    return serializedUser
  }
}

export default UserSerializer