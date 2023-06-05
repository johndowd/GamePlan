import { Configuration, OpenAIApi } from "openai";
import { User } from "../../../models/index.js";
import { uploadB64 } from "../../AWS/uploadB64.js";

class OpenAIClient {
  constructor() {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAi = new OpenAIApi(config);
  }

  async generateUsername(behaviors) {
    const traits = behaviors.map(b => { b.traits }).join(', ')

    const response = await this.openAi.createCompletion({
      "model": "text-davinci-003",
      "n": 1,
      "prompt": `come up with a username that is less than 25 characters for someone that is ${traits}`
    })
    const { choices } = response.data
    const username = choices[0].text
    return username
  }

  async generateProfileImage(username, behaviors) {
    const traits = behaviors.map(b => b.trait).join(' & ')
    const prompt = `create a portrait of a person with the username ${username}, a user that is ${traits}`
    const response = await this.openAi.createImage({
      prompt,
      response_format: 'b64_json'
    })

    const { data } = response.data
    const loc = await uploadB64(data[0]?.b64_json)
    return loc
  }

  async generatePlanInfo(owner, game) {
    const today = new Date()
    const laterDate = new Date()

    const behaviors = await owner.$relatedQuery('behaviors')
    const traits = behaviors.map(b => b.trait).join(', ')
    laterDate.setDate(laterDate.getDate() + 30)

    const prompt = `You are role playing as ${owner.username}, a user on a website that users create plans to play boardgames on. Your personality traits are ${traits}. Create a name for a plan to play the game ${game.name}, along with specifying a place to play it in Boston, MA. Additionally, send back a date between ${today.toISOString()} and ${laterDate.toISOString()} but the time only in 30m intervals. Send the data back as a javascript object with no additional text.
  '{
    "name": (name),
    "location": (location),
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

  async generateComment(user, plan, game, data = null) {
    const owner = await plan.$relatedQuery('owner')
    const behaviors = await user.$relatedQuery('behaviors')
    const traits = behaviors.map(b => b.trait).join(', ')

    const comments = await plan.$relatedQuery('comments')

    const readableComments = await Promise.all(comments.map(async c => {
      const commentUser = await User.query().findById(c.userId)
      return `'${commentUser.username}' said ${c.text}`
    }))

    let dataText = ''
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        dataText += `${key} : ${value}`
      }
    }
    const prompt = `You are role playing as ${user.username}, a user on a website that users create plans to play boardgames on. Your personality traits are ${traits}. Create a comment on the board game plan '${plan.name}' that ${owner.username} created, where the game ${game.name}is going to be played. You may also consider the following previous comments on the plan listed here : [${readableComments}]. just send back the comment without any additional text. Additionally, you may consider the following data that was sent to you: ${dataText}`

    const response = await this.openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        'role': 'user',
        'content': prompt
      }]
    })

    const { choices } = response.data
    const { content } = choices[0].message
    return content
  }
}

export default OpenAIClient