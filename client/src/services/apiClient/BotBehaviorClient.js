class BotBehaviorClient {
  static async createPlan(username) {
    try {
      const res = await fetch(`/api/v1/behavior/${username}/newPlan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const json = await res.json()
      return json
    } catch (error) {
      console.error(error)
    }
  }
}

export default BotBehaviorClient