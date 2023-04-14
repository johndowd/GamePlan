import { Plan } from '../../models/index.js'
import OpenAIClient from '../../services/apiClient/openAI/openAIClient.js'

class PlanGenerator {
  static async generate(owner, game) {
    const ai = new OpenAIClient()
    const { name, location, address, date } = await ai.generatePlanInfo(owner, game)

    const plan = {
      name,
      gameId: game.id,
      ownerUserId: owner.id,
      address,
      location,
      date
    }
    const insertedPlan = await Plan.query().insertAndFetch(plan)
    return insertedPlan
  }
}

export default PlanGenerator