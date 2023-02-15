import { Plan, Signup, User } from "../../models/index.js"

class SignupSeeder {
  static async seed() {

    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "KimKardashian"})
    const user3 = await User.query().findOne({ username: "SarahConnor" })
    const user4 = await User.query().findOne({ username: "BradPitt" })
    const user5 = await User.query().findOne({ username: "JohnDoe" })

    const plan1 = await Plan.query().findOne({ name: "Play Monopoly with a first-timer!"})
    const plan2 = await Plan.query().findOne({ name: "Learn Stratego Secrets!"})
    const plan3 = await Plan.query().findOne({ name: "Help me learn Wingspan!" })
    const plan4 = await Plan.query().findOne({ name: "Join the Settlers of Catan!"})
    const plan5 = await Plan.query().findOne({ name: "Get ready for Carcassonne!" })

    await Signup.query().insert({ userId: user1.id, planId: plan1.id})
    await Signup.query().insert({ userId: user3.id, planId: plan2.id})
    await Signup.query().insert({ userId: user2.id, planId: plan3.id})
    await Signup.query().insert({ userId: user1.id, planId: plan4.id})
    await Signup.query().insert({ userId: user2.id, planId: plan5.id})
    await Signup.query().insert({ userId: user2.id, planId: plan1.id})
    await Signup.query().insert({ userId: user2.id, planId: plan2.id})
    await Signup.query().insert({ userId: user3.id, planId: plan3.id})
    await Signup.query().insert({ userId: user1.id, planId: plan5.id})
    await Signup.query().insert({ userId: user3.id, planId: plan5.id})
    await Signup.query().insert({ userId: user3.id, planId: plan4.id})
    await Signup.query().insert({ userId: user4.id, planId: plan3.id})
    await Signup.query().insert({ userId: user5.id, planId: plan1.id})

  }
}

export default SignupSeeder