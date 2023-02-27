import { User, Comment, Plan } from "../../models/index.js"

class CommentSeeder {
  static async seed() {
    const user1 = await User.query().findOne({ username: "JaredDudley" })
    const user2 = await User.query().findOne({ username: "NatureLover27" })
    const user3 = await User.query().findOne({ username: "SarahConnor" })
    const user4 = await User.query().findOne({ username: "bestPerson12" })
    const user5 = await User.query().findOne({ username: "FitnessFanatic99" })

    const plan1 = await Plan.query().first()
    const plan2 = await Plan.query().findOne({ name: "Learn Stratego Secrets!" })
    const plan3 = await Plan.query().findOne({ name: "Help me learn Wingspan!" })
    const plan4 = await Plan.query().findOne({ name: "Join the Settlers of Catan!" })
    const plan5 = await Plan.query().findOne({ name: "Get ready for Carcassonne!" })

    await Comment.query().insert({
      userId: user2.id, planId: plan1.id, text: "Root is a game with an undeniably high barrier to entry. Wehrle and Leder Games have done what they can to make it accessible, but it's no gateway game. However, the beautiful design of the asymmetric factions means there's more depth here than almost any game on my shelf."
    })
    await Comment.query().insert({
      userId: user3.id, planId: plan1.id, text: "Wow @Kim thats so true"
    })
    await Comment.query().insert({
      userId: user5.id, planId: plan1.id, text: "So excited to finally play with you guys!"
    })

    await Comment.query().insert({
      userId: user5.id, planId: plan2.id, text: "Protect your flag: Your flag is your most important piece, so make sure to place it in a well-defended position. Surround it with bombs and other strong pieces so that it's difficult for your opponent to reach."
    })

    await Comment.query().insert({
      userId: user3.id, planId: plan3.id, text: "The Northern Harrier is a popular bird due to its ability to collect food tokens, while the American Goldfinch and the House Sparrow are great for generating bonus points. Meanwhile, the Bald Eagle is highly sought after for its end-game scoring potential."
    })
    await Comment.query().insert({
      userId: user1.id, planId: plan3.id, text: "Interesting point sarah- will pay attention to those birds when we play!"
    })

    await Comment.query().insert({
      userId: user4.id, planId: plan4.id, text: `Why did the Settler of Catan refuse to trade sheep for wheat?
      Because they didn't want to feel sheepish about giving away their wool!`})
    await Comment.query().insert({
      userId: user2.id, planId: plan4.id, text: `Why did the robber in Settlers of Catan go to jail?
Because he couldn't settle for just one resource!`
    })

    await Comment.query().insert({
      userId: user5.id, planId: plan5.id, text: `Why did the settler refuse to trade with the sheep in Catan?
Because the sheep kept trying to pull the wool over his eyes!`
    })
  }
}

export default CommentSeeder