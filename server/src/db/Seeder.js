/* eslint-disable no-console */
import { connection } from "../boot.js"
import PlanSeeder from "./seeders/PlanSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import SignupSeeder from "./seeders/SignupSeeder.js"


class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding plans")
    await PlanSeeder.seed()

    console.log("Seeding users")
    await UserSeeder.seed()

    console.log("Seeding signups")
    await SignupSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder