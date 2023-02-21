import { User, Comment, Plan } from "../../models/index.js"

class CommentSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "KimKardashian" })
    const user3 = await User.query().findOne({ username: "SarahConnor" })
    const user4 = await User.query().findOne({ username: "BradPitt" })
    const user5 = await User.query().findOne({ username: "JohnDoe" })

    const plan1 = await Plan.query().findOne({ name: "Play Monopoly with a first-timer!" })
    const plan2 = await Plan.query().findOne({ name: "Learn Stratego Secrets!" })
    const plan3 = await Plan.query().findOne({ name: "Help me learn Wingspan!" })
    const plan4 = await Plan.query().findOne({ name: "Join the Settlers of Catan!" })
    const plan5 = await Plan.query().findOne({ name: "Get ready for Carcassonne!" })

    const comment1 = await Comment.query().insert({
      userId: user1.id, planId: plan1.id, text: "Monopoly is a type of market structure where there is only one seller, known as the monopolist, and many buyers. In this market, the monopolist has significant market power and can control the price and output of the good or service they provide."
    })
  }
}

export default CommentSeeder