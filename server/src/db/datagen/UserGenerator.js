import { User } from '../../models/index.js'
import OpenAIClient from '../../services/apiClient/openAI/openAIClient.js'

class UserGenerator {
  static async generate() {
    const ai = new OpenAIClient()

    const generatedUsername = await ai.generateUsername()
    const username = generatedUsername.substring(2)
    const email = username + "@fake-email.com"
    const password = username
    const image_url = await ai.generateProfileImage(username)
    const isAi = true

    const user = { username, email, password, image_url, isAi }
    return await User.query().insertAndFetch({ ...user })
  }
}

export default UserGenerator