import { Configuration, OpenAIApi } from "openai";
import { uploadB64 } from "../../AWS/uploadB64.js";

class OpenAIClient {
  constructor() {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAi = new OpenAIApi(config);
  }

  async generateUsername() {
    const response = await this.openAi.createCompletion({
      "model": "text-davinci-003",
      "n": 1,
      "prompt": "come up with a username that is less than 25 characters"
    })
    const { choices } = response.data
    const username = choices[0].text
    return username
  }

  async generateProfileImage(prompt) {
    const response = await this.openAi.createImage({
      prompt: `create a profile picture for ${prompt}`,
      response_format: 'b64_json'
    })

    const { data } = response.data
    const loc = await uploadB64(data[0]?.b64_json)
    return loc
  }

  async generatePlanInfo(owner, game) {
    const today = new Date()
    const laterDate = new Date()
    laterDate.setDate(laterDate.getDate() + 30)
    const prompt = `You are role playing as ${owner.username}, a witty user on a website that users create plans to play boardgames on. Create a name for a plan to play the game ${game.name}, along with specifying a place to play it in Boston, MA. Additionally, send back a date between ${today.toISOString()} and ${laterDate.toISOString()} but the time only in 30m intervals. Send the data back as a javascript object with no additional text.
  '{
    "name": (name),
    "location": (tom),
    "address": (address of location),
    "date": (date 30min intervals only)
  }'`

    const response = await this.openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        'role': 'user',
        'content': prompt
      }]
    })
    const { choices } = response.data
    const { content } = choices[0].message
    const aiObject = JSON.parse(content)
    return aiObject
  }
}

export default OpenAIClient