class SignupClient {
  static async addSignup(planId) {
    try {
      const response = await fetch(`/api/v1/signups`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ planId })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          throw new Error(body.error)
        }
      }
      return body
    } catch (error) {
      console.error(error)
    }
  }

  static async deleteSignup(planId) {
    try {
      const response = await fetch(`/api/v1/signups/${planId}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        throw new Error(response.message)
      }
      return true
    } catch (error) {
      console.error(error)
    }
  }
}

export default SignupClient