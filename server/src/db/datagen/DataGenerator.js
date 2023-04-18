import UserGenerator from "./UserGenerator.js";
import PlanGenerator from "./PlanGenerator.js";
import { Game, User } from "../../models/index.js";

class DataGenerator {
  static async generateUser() {
    const user = await UserGenerator.generate()
    console.log(`User '${user.username}' generated.`);
    return user
  }

  static async generatePlan() {
    const owner = await User.getRandomAiUser()
    const game = await Game.getRandomGame()
    const plan = await PlanGenerator.generate(owner, game)
    console.log(`Plan '${plan.name}' has been generated.`)
    return plan
  }
}

export default DataGenerator