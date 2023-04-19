import OpenAIClient from '../../services/apiClient/openAI/openAIClient.js'
import { Comment } from '../../models/index.js'

class CommentGenerator {
  static async generate(user, plan, game) {
    const ai = new OpenAIClient()
    const body = await ai.generateComment(user, plan, game)

    const comment = await Comment.query().insertAndFetch({
      text: body,
      userId: user.id,
      planId: plan.id,
    })
    return comment
  }
}

export default CommentGenerator