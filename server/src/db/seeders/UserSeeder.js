import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {

    const usersData = [
      { email: "jaredDudley@gmail.com", password: "password", username: "JaredDudley", image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/jareddudleypfp.webp" },
      { email: "kimKardashian@gmail.com", password: "kim123", username: "KimKardashian", image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/kimkardashainpfp.webp" },
      { email: "johnDoe@yahoo.com", password: "secret1234", username: "JohnDoe", image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/braddpittpfp.webp" },
      { email: "jenniferLawrence@hotmail.com", password: "jlawrocks", username: "JenniferLawrence", image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/jenniferlawrencepfp.webp" },
      { email: "bradPitt@gmail.com", password: "fightclub1", username: "BradPitt", image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/johndoepfp.webp" },
      { email: "sarahConnor@yahoo.com", password: "terminator2", username: "SarahConnor", image_url: "https://gameplan-jd-development.s3.us-east-2.amazonaws.com/sarahconnorpfp.webp" },
    ]

    for (const user of usersData) {
      const currentUser = await User.query().findOne({ username: user.username })
      if (!currentUser) {
        await User.query().insert(user)
      }
    }
  }
}

export default UserSeeder