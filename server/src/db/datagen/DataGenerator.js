import UserGenerator from "./UserGenerator.js";
import PlanGenerator from "./PlanGenerator.js";
import CommentGenerator from "./CommentGenerator.js";
import { Plan, Game, User, Signup } from "../../models/index.js";

class DataGenerator {
  static async generateUser() {
    const user = await UserGenerator.generate()
    const behaviors = await user.$relatedQuery('behaviors')
    console.log(`User '${user.username}' generated with a ${behaviors.map(b => b.trait).join(' & ')} personality. view at http://localhost:3000/users/${user.username}`);
    return user
  }

  static async generatePlan(owner = null) {
    if (!owner) {
      owner = await User.getRandomAiUser()
    }
    const game = await Game.getRandomGame()
    const plan = await PlanGenerator.generate(owner, game)
    console.log(`Plan '${plan.name}' has been generated by ${owner.username}. view at http://localhost:3000/plans/${plan.id}`)
    return plan
  }

  static async generateCommentAndJoin({ userData, planData }) {
    const user = userData || await User.getRandomAiUser()
    const plan = planData || await Plan.getRandomPlan()

    const users = await plan.$relatedQuery('users')
    const game = await plan.$relatedQuery('game')

    if (game.max_players <= users.length) {
      console.log(`Plan is full. Comment not generated. Please try again.`)
      return
    }
    if (users.includes(user)) {
      console.log(`User is already signed up. Comment not generated. Please try again.`)
      return
    }

    await CommentGenerator.generate(user, plan, game)
    await Signup.query().insert({
      userId: user.id,
      planId: plan.id
    })
    console.log(`Comment & join on plan '${plan.name}' has been generated by ${user.username}. view at http://localhost:3000/plans/${plan.id}`)
    return plan
  }
}

export default DataGenerator