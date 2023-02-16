import express from "express"
import { ValidationError } from "objection"
import { Signup } from "../../../models/index.js"

const signupsRouter = new express.Router()

signupsRouter.post("/", async (req, res) => {
  const { body, user } = req
  try {
    const isSignup = await Signup.query().findOne({ ...body, userId: user.id })
    if (isSignup) {
      return res.status(422).json({ error: "You are already signed up for this game" })
    }
    const signup = await Signup.query().insert({ ...body, userId: user.id })
    return res.status(201).json({ signup })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

signupsRouter.delete("/:planId", async (req, res) => {
  const { user } = req
  const { planId } = req.params
  try {
    const signupToDelete = await Signup.query().findOne({ planId, userId: user.id })
    if (signupToDelete) {
      const num = await signupToDelete.$query().delete()
      return res.status(200).json({ success: num })
    }
    return res.status(402)
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default signupsRouter