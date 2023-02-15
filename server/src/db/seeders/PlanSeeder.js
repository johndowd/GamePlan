import { Game, Plan, User } from "../../models/index.js"
import fetchGameFromBGAApi from "../../services/fetchGameFromBGAApi.js"

class PlanSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "KimKardashian" })
    const user3 = await User.query().findOne({ username: "SarahConnor" })

    const root = await Game.query().findOne({ name: "Root" })
    const wingspan = await Game.query().findOne({ name: "Wingspan" })
    const monopoly = await Game.query().findOne({ name: "Monopoly" })
    const stratego = await Game.query().findOne({ name: "Stratego" })
    const catan = await Game.query().findOne({ name: "Catan"})
    const carcassonne = await Game.query().findOne({ name: "Carcassonne" })



    const planData = [
      {
        name: "Play Monopoly with a first-timer!",
        gameId: monopoly.id,
        location: "301",
        date: "feb 13 2023",
        ownerUserId: user1.id
      },
      {
        name: "Learn Stratego Secrets!",
        gameId: stratego.id,
        location: "301",
        date: "feb 15 2023",
        ownerUserId: user3.id
      },
      {
        name: "Help me learn Wingspan!",
        gameId: wingspan.id,
        location: "Swissbakers",
        date: "feb 18 2023",
        ownerUserId: user2.id
      },
      {
        name: "Join the Settlers of Catan!",
        gameId: catan.id,
        location: "Starbucks",
        date: "feb 20 2023",
        ownerUserId: user1.id
      },
      {
        name: "Get ready for Carcassonne!",
        gameId: carcassonne.id,
        location: "Panera Bread",
        date: "feb 28 2023",
        ownerUserId: user2.id
      }]

    for (const plan of planData) {
      await Plan.query().insert(plan)
    }
  }
}

export default PlanSeeder