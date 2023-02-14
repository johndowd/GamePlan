import express from "express"
import { ValidationError } from "objection"
import { Plan } from "../../../models/index.js"

const plansRouter = new express.Router()

plansRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const plan = await Plan.query().findById(id)
    return res.status(200).json({ plan })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

plansRouter.get("/", async (req, res) => {
  try {
    const plans = await Plan.query()
    res.status(200).json({ plans })
  } catch (errors) {
    res.status(500).json({ errors })
  }
})

plansRouter.post("/", async (req, res) => {
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

plansRouter.get("/search/:q", async (req, res) => {
  const { q } = req.params
  try {
    const plansData = await Plan.query()
    const plans = plansData.filter(plan => {
      return plan.name
      .toLowerCase()
      .includes(q.toLowerCase())
    })
    return res.status(200).json({ plans })
  } catch (error) {
    return res.status(500)
  }
})

export default plansRouter