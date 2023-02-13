import express from "express"
import { ValidationError } from "objection"
import { Plan } from "../../../models/index.js"

const plansRouter = new express.Router()

plansRouter.get("/", async (req, res) => {
  try {
    const plans = await Plan.query()
    res.status(200).json({ plans })
  } catch (errors) {
    res.status(500).json({ errors })
  }
})

plansRouter.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const plan = await Plan.query().insert(req.body)
    return res.status(201).json({ plan })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default plansRouter