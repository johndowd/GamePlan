import UserGenerator from "./UserGenerator.js";
import PlanGenerator from "./PlanGenerator.js";
import { Game, User } from "../../models/index.js";

class DataGenerator {
  static async generateUser() {
    const user = await UserGenerator.generate()
    console.log(`User '${user.username}' generated.`);
  }

  static async generatePlan() {
    const owner = await User.getRandomUser()
    const game = await Game.getRandomGame()
    const plan = await PlanGenerator.generate(owner, game)
    console.log(`Plan '${plan.name}' has been generated.`)
  }
}

export default DataGenerator