import translateServerErrors from "../translateServerErrors"

class UserClient {
  static async fetchProfileByUsername(username) {
    try {
      const response = await fetch(`/api/v1/users/${username}`)
      const body = await response.json()
      return body.userProfile
    } catch (error) {
      console.error(error)
    }
  }

  static async fetchUsers() {
    try {
      const response = await fetch("/api/v1/users")
      const body = await response.json()
      return body.users
    } catch (error) {
      console.error(error)
    }
  }

  static async createUser(userPayload) {
    try {
      const response = await fetch("/api/v1/users", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return { errors: newErrors }
        }
        return true
      }
      const userData = await response.json();
      return userData
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  }
}

export default UserClient