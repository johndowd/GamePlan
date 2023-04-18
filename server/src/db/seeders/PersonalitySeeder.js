import DataGenerator from "../datagen/DataGenerator.js";
import { Behavior, Personality } from "../../models/index.js";


export default class PersonalitySeeder {
  static async seed() {
    console.log('generating user')
    const user = await DataGenerator.generateUser()

    const behavior = await Behavior.query().findById(1)

    await Personality.query().insert({
      userId: user.id,
      behaviorId: behavior.id
    })
  }
}