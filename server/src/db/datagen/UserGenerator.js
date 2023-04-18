import { Behavior, Personality, User } from '../../models/index.js'
import OpenAIClient from '../../services/apiClient/openAI/openAIClient.js'

class UserGenerator {
  static async generate() {
    const ai = new OpenAIClient()
    const behaviors = await Behavior.getTwoRandomBehaviors()

    const generatedUsername = await ai.generateUsername(behaviors)
    const username = generatedUsername.substring(2)
    const email = username + "@fake-email.com"
    const password = username
    const image_url = await ai.generateProfileImage(username, behaviors)
    const isAi = true

    const user = { username, email, password, image_url, isAi }
    const insertedUser = await User.query().insertAndFetch({ ...user })
    await Personality.query().insert([{
      userId: insertedUser.id,
      behaviorId: behaviors[0].id
    },
    {
      userId: insertedUser.id,
      behaviorId: behaviors[1].id
    }])
    return insertedUser
  }
}

export default UserGenerator