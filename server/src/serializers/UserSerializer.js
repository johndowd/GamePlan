class UserSerializer {
  static getUsername(user) {
    return { id: user.id, username: user.username }
  }
}

export default UserSerializer