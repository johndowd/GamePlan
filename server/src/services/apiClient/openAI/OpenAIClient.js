import { Configuration, OpenAIApi } from "openai";

class OpenAIClient {
  constructor() {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(config);
  }

  async generateUsername() {
    const response = await this.openai.createCompletion({
      "model": "text-davinci-003",
      "n": 1,
      "prompt": "come up with a username"
    })
    const { choices } = response.data
    const username = choices[0].text
    return username
  }

  async generateProfileImage(prompt) {
    const response = await this.openai.createImage({
      prompt: `create a profile picture for ${prompt}`
    })

    const { data } = response.data
    const { url } = data[0]
    return url
  }
}

export default OpenAIClient