import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const user1 = { email: "jack1@gmail.com", password: "password", username: "jackjack1" }

    const usersData = [user1]

    for (const user of usersData ){
      const currentUser = await User.query().findOne({username: user.username})
      if(!currentUser) {
        await User.query().insert(user)
      }
    }

  }


}

export default UserSeeder