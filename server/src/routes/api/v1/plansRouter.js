import express from "express"
import { format } from 'date-fns'
import { ValidationError } from "objection"
import { Plan } from "../../../models/index.js"

import PlanSerializer from "../../../serializers/PlanSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import setReqDate from "../../../services/setReqDate.js"
import PlanSummary from "../../../services/PlanSummary.js"

const plansRouter = new express.Router()

plansRouter.get("/frequency", async (req, res) => {
  try {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 45)
    const plans = await Plan.query()
      .where('date', '<', futureDate)
    const pairArray = PlanSummary.getSummary(plans)
    return res.status(200).json({
      frequencyPairs: pairArray,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(futureDate, 'yyyy-MM-dd')
    })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

plansRouter.get("/", async (req, res) => {
  const { q, index, d } = req.query
  const date = d ? new Date(d) : new Date()
  try {
    const planQuery = await Plan.query()
      .where('date', '>', date)
      .orderBy("date").limit(q)
      .offset(index)
    const serializedPlans = await Promise.all(planQuery.map(async plan => {
      return await PlanSerializer.getDetails(plan)
    }))
    return res.status(200).json({ plans: serializedPlans })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

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
  console.log(req.params);
  try {
    const plans = await Plan.query()
    const serializedPlans = await Promise.all(plans.map(async plan => {
      return await PlanSerializer.getDetails(plan)
    }))
    return res.status(200).json({ plans: serializedPlans })
  } catch (errors) {
    return res.status(500).json({ errors })
  }
})

plansRouter.patch("/:id", async (req, res) => {
  const { user, body, params } = req
  const { id } = params
  if (body?.date) {
    setReqDate(body)
  }
  const plan = cleanUserInput(body)
  try {
    const planToUpdate = await Plan.query()
      .findOne({ id, ownerUserId: user.id })
      .patchAndFetchById(id, plan)
    const updatedPlan = await PlanSerializer.getDetails(planToUpdate)
    return res.status(200).json({ plan: updatedPlan })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

plansRouter.post("/", async (req, res) => {
  const { user, body } = req
  if (body?.date) {
    setReqDate(body)
  }
  try {
    const plan = await Plan.query().insert({ ...body, ownerUserId: user.id })
    return res.status(201).json({ plan })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

plansRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  const { user } = req
  try {
    const plan = await Plan.query().findById(id)
    if (plan.ownerUserId !== parseInt(user.id)) {
      return res.status(403).json({ errors: "Unauthorized" })
    }
    await plan.$beforeDelete()
    const status = await Plan.query().deleteById(id)
    if (status) {
      return res.status(204).json({ status: true })
    } else {
      return res.status(404).json({ errors: "Plan not found" })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: error })
  }
})

export default plansRouter