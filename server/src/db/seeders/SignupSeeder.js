import { Plan, Signup, User } from "../../models/index.js"

class SignupSeeder {
  static async seed() {

    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "NatureLover27" })
    const user3 = await User.query().findOne({ username: "SarahConnor" })
    const user4 = await User.query().findOne({ username: "bestPerson12" })
    const user5 = await User.query().findOne({ username: "FitnessFanatic99" })
    const user6 = await User.query().findOne({ username: "FoodieGuru55" })
    const user7 = await User.query().findOne({ username: "SoccerKing22" })
    const user8 = await User.query().findOne({ username: "CoolDude98" })
    const user9 = await User.query().findOne({ username: "JohnDoe" })
    const user10 = await User.query().findOne({ username: "JenniferLawrence" })

    const plan1 = await Plan.query().findOne({ name: "Play Root with a first-timer!" })
    const plan2 = await Plan.query().findOne({ name: "Learn Stratego Secrets!" })
    const plan3 = await Plan.query().findOne({ name: "Help me learn Wingspan!" })
    const plan4 = await Plan.query().findOne({ name: "Join the Settlers of Catan!" })
    const plan5 = await Plan.query().findOne({ name: "Get ready for Carcassonne!" })
    const plan6 = await Plan.query().findOne({ name: "Lets create a bustling economy in a british city!" })
    const plan7 = await Plan.query().findOne({ name: "I want to change mars!" })
    const plan8 = await Plan.query().findOne({ name: "Make some wine with me!" })
    const plan9 = await Plan.query().findOne({ name: "Lets make some Cow friends!" })
    const plan10 = await Plan.query().findOne({ name: "Lets make some tiles!" })

    await Signup.query().insert({ userId: user5.id, planId: plan9.id })
    await Signup.query().insert({ userId: user10.id, planId: plan4.id })
    await Signup.query().insert({ userId: user3.id, planId: plan7.id })
    await Signup.query().insert({ userId: user5.id, planId: plan10.id })

    await Signup.query().insert({ userId: user1.id, planId: plan1.id })
    await Signup.query().insert({ userId: user3.id, planId: plan2.id })
    await Signup.query().insert({ userId: user2.id, planId: plan8.id })
    await Signup.query().insert({ userId: user1.id, planId: plan4.id })
    await Signup.query().insert({ userId: user2.id, planId: plan5.id })
    await Signup.query().insert({ userId: user2.id, planId: plan1.id })
    await Signup.query().insert({ userId: user2.id, planId: plan7.id })
    await Signup.query().insert({ userId: user3.id, planId: plan3.id })
    await Signup.query().insert({ userId: user1.id, planId: plan5.id })
    await Signup.query().insert({ userId: user3.id, planId: plan5.id })
    await Signup.query().insert({ userId: user3.id, planId: plan4.id })
    await Signup.query().insert({ userId: user4.id, planId: plan6.id })
    await Signup.query().insert({ userId: user5.id, planId: plan1.id })

    await Signup.query().insert({ userId: user6.id, planId: plan3.id })
    await Signup.query().insert({ userId: user7.id, planId: plan5.id })
    await Signup.query().insert({ userId: user8.id, planId: plan5.id })
    await Signup.query().insert({ userId: user9.id, planId: plan4.id })
    await Signup.query().insert({ userId: user8.id, planId: plan3.id })
    await Signup.query().insert({ userId: user6.id, planId: plan1.id })

    await Signup.query().insert({ userId: user4.id, planId: plan10.id })
    await Signup.query().insert({ userId: user5.id, planId: plan8.id })
    await Signup.query().insert({ userId: user6.id, planId: plan9.id })



  }
}

export default SignupSeeder