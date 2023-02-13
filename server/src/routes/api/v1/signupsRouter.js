import express from "express"
import { ValidationError } from "objection"
import { Signup } from "../../../models/index.js"

const signupsRouter = new express.Router()

signupsRouter.post("/", async (req, res) => {
  const { body } = req
  try {
    const isSignup = await Signup.query().findOne(body)
    if (isSignup){
      return res.status(422).json({ error: "You are already signed up for this game" })
    }
    const signup = await Signup.query().insert(body)
    return res.status(201).json({ signup })
  } catch (error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

export default signupsRouter