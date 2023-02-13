import express from "express"
import { Plan } from "../../../models/index.js"

const plansRouter = new express.Router()

plansRouter.get("/", async (req, res) => {
  try {
    const plans = await Plan.query()
    res.status(200).json({ plans })
  } catch (error) {
    console.error(error)
  }
})

export default plansRouter