import { Plan, User } from "../../models/index.js"

class PlanSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "KimKardashian"})
    const user3 = await User.query().findOne({ username: "SarahConnor" })


    const planData = [{ name: "Play Monopoly with a first-timer!", game: "Monopoly", genre: "Economics", playerCount: 4, location: "301", date: "feb 13 2023", ownerUserId: user1.id  },
    { name: "Learn Stratego Secrets!", game: "Stratego", genre: "War", playerCount: 4, location: "301", date: "feb 15 2023", ownerUserId: user3.id },
    { name: "Help me learn Wingspan!", game: "Wingspan", genre: "Birds", playerCount: 2, location: "Swissbakers", date: "feb 18 2023", ownerUserId: user2.id },
    { name: "Join the Settlers of Catan!", game: "Settlers of Catan", genre: "Civilization Building", playerCount: 3, location: "Starbucks", date: "feb 20 2023", ownerUserId: user1.id },
    { name: "Dare to play Betrayal at Baldur's Gate!", game: "Betrayal at Baldur's Gate", genre: "Horror", playerCount: 5, location: "301", date: "feb 22 2023", ownerUserId: user2.id },
    { name: "Glory awaits in Risk!", game: "Risk", genre: "War", playerCount: 6, location: "Friend's House", date: "feb 25 2023", ownerUserId: user3.id },
    { name: "Get ready for Carcassonne!", game: "Carcassonne", genre: "Medieval", playerCount: 4, location: "Panera Bread", date: "feb 28 2023", ownerUserId: user2.id }]

    for (const plan of planData) {
      await Plan.query().insert(plan)
    }
  }
}

export default PlanSeeder