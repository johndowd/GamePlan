import { Plan, Signup, User } from "../../models/index.js"

class SignupSeeder {
  static async seed() {

    const user1 = await User.query().findOne({ username: "jackjack1" })

    const plan1 = await Plan.query().findOne({name: "Help me learn Wingspan!"})
    await Signup.query().insert({userId: user1.id, planId: plan1.id})
  }
}

export default SignupSeeder