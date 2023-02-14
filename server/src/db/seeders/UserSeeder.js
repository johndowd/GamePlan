import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {

    const usersData = [
      { email: "jaredDudley@gmail.com", password: "password", username: "JaredDudley" },
      { email: "kimKardashian@gmail.com", password: "kim123", username: "KimKardashian" },
      { email: "johnDoe@yahoo.com", password: "secret1234", username: "JohnDoe" },
      { email: "jenniferLawrence@hotmail.com", password: "jlawrocks", username: "JenniferLawrence" },
      { email: "bradPitt@gmail.com", password: "fightclub1", username: "BradPitt" },
      { email: "sarahConnor@yahoo.com", password: "terminator2", username: "SarahConnor" },
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