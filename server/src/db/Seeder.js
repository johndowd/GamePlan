/* eslint-disable no-console */
import { connection } from "../boot.js"
import PlanSeeder from "./seeders/PlanSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import SignupSeeder from "./seeders/SignupSeeder.js"
import GameSeeder from "./seeders/GameSeeder.js"
import CommentSeeder from "./seeders/CommentSeeder.js"
import FriendSeeder from "./seeders/FriendSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding games")
    await GameSeeder.seed()

    console.log("Seeding users")
    await UserSeeder.seed()

    console.log("Seeding friendships")
    await FriendSeeder.seed()

    console.log("Seeding plans")
    await PlanSeeder.seed()

    console.log("Seeding signups")
    await SignupSeeder.seed()

    console.log("Seeding Comments");
    await CommentSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder