import { Plan } from "../../models/index.js"

class PlanSeeder {
  static async seed() {
    const planData = [{
      name: "Play Monopoly with a first-timer!",
      game: "Monopoly",
      genre: "Economics",
      playerCount: 4,
      location: "301",
      date: "feb 13 2023"
    },
    {
      name: "Learn Stratego Secrets!",
      game: "Stratego",
      genre: "War",
      playerCount: 4,
      location: "301",
      date: "feb 15 2023"
    },
    {
      name: "Help me learn Wingspan!",
      game: "Wingspan",
      genre: "Birds",
      playerCount: 2,
      location: "Swissbakers",
      date: "feb 18 2023"
    }]

    for (const plan of planData) {
      await Plan.query().insert(plan)
    }
  }
}

export default PlanSeeder