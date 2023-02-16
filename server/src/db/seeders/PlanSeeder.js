import { Game, Plan, User } from "../../models/index.js"

class PlanSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "KimKardashian" })
    const user3 = await User.query().findOne({ username: "SarahConnor" })

    const root = await Game.query().findOne({ name: "Root" })
    const wingspan = await Game.query().findOne({ name: "Wingspan" })
    const monopoly = await Game.query().findOne({ name: "Monopoly" })
    const stratego = await Game.query().findOne({ name: "Stratego" })
    const catan = await Game.query().findOne({ name: "Catan" })
    const carcassonne = await Game.query().findOne({ name: "Carcassonne" })

    const planData = [
      {
        name: "Play Monopoly with a first-timer!",
        gameId: monopoly.id,
        location: "301",
        date: new Date(2023, 2, 28, 19),
        ownerUserId: user1.id
      },
      {
        name: "Learn Stratego Secrets!",
        gameId: stratego.id,
        location: "301",
        date: new Date(2023, 4, 20, 19, 30),
        ownerUserId: user3.id
      },
      {
        name: "Help me learn Wingspan!",
        gameId: wingspan.id,
        location: "Swissbakers",
        date: new Date(2023, 3, 28, 20, 30),
        ownerUserId: user2.id
      },
      {
        name: "Join the Settlers of Catan!",
        gameId: catan.id,
        location: "Starbucks",
        date: new Date(2022, 4, 20, 19),
        ownerUserId: user1.id
      },
      {
        name: "Get ready for Carcassonne!",
        gameId: carcassonne.id,
        location: "Panera Bread",
        date: new Date(2023, 5, 30, 18),
        ownerUserId: user2.id
      }]

    for (const plan of planData) {
      await Plan.query().insert(plan)
    }
  }
}

export default PlanSeeder