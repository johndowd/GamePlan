import PlanSerializer from "./PlanSerializer.js"

class UserSerializer {
  static getSummary({ id, username, image_url }) {
    return { id, username, image_url }
  }

  static async getDetails(user) {
    const allowedAttributes = ["id", "username", "image_url"]
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