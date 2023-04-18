import { Behavior } from "../../models/index.js";

class BehaviorSeeder {
  static async seed() {
    await Behavior.query().insert({ trait: "Nice" })
  }
}

export default BehaviorSeeder