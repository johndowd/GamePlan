/* eslint-disable no-console */
import { connection } from "../boot.js"
import PlanSeeder from "./seeders/PlanSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding plans")
    await PlanSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder