import { User } from "../../models/index.js"

class FriendSeeder {
  static async seed() {

    const user1 = await User.query().findById(1)
    const user2 = await User.query().findById(2)
    const user3 = await User.query().findById(3)
    const user4 = await User.query().findById(4)

    await user1.addFriend(user2)
    await user1.addFriend(user3)
    await user2.addFriend(user4)
  }
}

export default FriendSeeder