import { Configuration, OpenAIApi } from "openai";
import { uploadB64 } from "../../AWS/uploadB64.js";

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
      "prompt": "come up with a username that is less than 25 characters"
    })
    const { choices } = response.data
    const username = choices[0].text
    return username
  }

  async generateProfileImage(prompt) {
    const response = await this.openai.createImage({
      prompt: `create a profile picture for ${prompt}`,
      response_format: 'b64_json'
    })

    const { data } = response.data
    const loc = await uploadB64(data[0]?.b64_json)
    return loc
  }
}

export default OpenAIClient