import { User } from "../../models/index.js"

class FriendSeeder {
  static async seed() {

    const user1 = await User.query().findById(1)
    const user2 = await User.query().findById(2)
    const user3 = await User.query().findById(3)
    const user4 = await User.query().findById(4)

    try {
      await user1.addFriend(user2)
      await user3.addFriend(user4)
    } catch (error) {
      console.error(error)
    }
  }
}

export default FriendSeeder