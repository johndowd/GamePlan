import { User } from "../../models/index.js"
import OpenAIClient from "../../services/apiClient/openAI/openAIClient.js"

class UserSeeder {
  static async seed() {

    const usersData = [
      {
        email: "JaredDudley@gmail.com",
        password: "123",
        username: "JaredDudley",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/jareddudleypfp.avif"
      },
      {
        email: "CoolDude98@gmail.com",
        password: "password",
        username: "CoolDude98",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/pfp4.avif"
      },
      {
        email: "SoccerKing22@gmail.com",
        password: "123456",
        username: "SoccerKing22",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/soccerkingpfp.webp"
      },
      {
        email: "johnDoe@yahoo.com",
        password: "secret1234",
        username: "JohnDoe",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/pfp2.avif"
      },
      {
        email: "jenniferLawrence@hotmail.com",
        password: "jlawrocks",
        username: "JenniferLawrence",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/jenniferlawrencepfp.webp"
      },
      {
        email: "bradPitt@gmail.com",
        password: "fightclub1",
        username: "bestPerson12",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/pfp3.avif"
      },
      {
        email: "sarahConnor@yahoo.com",
        password: "terminator2",
        username: "SarahConnor",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/sarahconnorpfp.webp"
      },
      {
        email: "NatureLover27@hotmail.com",
        password: "password123",
        username: "NatureLover27",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/natureloverpfp.webp"
      },
      {
        email: "FitnessFanatic99@hotmail.com",
        password: "strongpassword",
        username: "FitnessFanatic99",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/fitnessfanaticpfp.webp"
      },
      {
        email: "FoodieGuru55@gmail.com",
        password: "ilovefood",
        username: "FoodieGuru55",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/foodgurupfp.webp"
      },
      {
        email: "knickfan99@notreal.com",
        password: "123456",
        username: "KnickFan99",
        image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ezgif-2-8ef70d6e27.jpeg"
      }
    ]

    for (const user of usersData) {
      const currentUser = await User.query().findOne({ username: user.username })
      if (!currentUser) {
        await User.query().insert(user)
      }
    }
  }

  static async generateUser() {
    const ai = new OpenAIClient()

    const generatedUsername = await ai.generateUsername()
    const username = generatedUsername.substring(2)
    const email = username + "@fake-email.com"
    const password = username
    const image_url = await ai.generateProfileImage(username)

    const user = { username, email, password, image_url }
    console.log({ ...user });
    await User.query().insert({ ...user })
  }
}

export default UserSeeder