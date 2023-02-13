import express from "express"
import { ValidationError } from "objection"
import { Plan } from "../../../models/index.js"
import PlanSerializer from "../../../serializers/PlanSerializer.js"

const plansRouter = new express.Router()

plansRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const plan = await Plan.query().findById(id)
    const serializedPlan = await PlanSerializer.getDetails(plan)
    return res.status(200).json({ plan: serializedPlan })
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