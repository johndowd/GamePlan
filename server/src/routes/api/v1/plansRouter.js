import express from "express"
import { ValidationError } from "objection"
import { Plan, Signup } from "../../../models/index.js"
import PlanSerializer from "../../../serializers/PlanSerializer.js"
import setReqDate from "../../../services/setReqDate.js"

const plansRouter = new express.Router()

plansRouter.get("/search/:q", async (req, res) => {
  const { q } = req.params
  try {
    const plansData = await Plan.query()
    const plans = plansData.filter(plan => {
      return plan.name
        .toLowerCase()
        .includes(q.toLowerCase())
    })
    const serializedPlans = await Promise.all(plans.map(plan => {
      return PlanSerializer.getDetails(plan)
    }))
    return res.status(200).json({ plans: serializedPlans })
  } catch (error) {
    return res.status(500)
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
  try {
    const plans = await Plan.query()
    const serializedPlans = await Promise.all(plans.map(async plan => {
      return await PlanSerializer.getDetails(plan)
    }))
    res.status(200).json({ plans: serializedPlans })
  } catch (errors) {
    res.status(500).json({ errors })
  }
})

plansRouter.patch("/:id", async (req, res) => {
  const { user, body, params } = req
  const { id } = params
  setReqDate(body)
  try {
    const planToUpdate = await Plan.query()
      .findOne({ id, ownerUserId: user.id })
      .patchAndFetchById(id, body)
    const updatedPlan = await PlanSerializer.getDetails(planToUpdate)
    return res.status(200).json({ plan: updatedPlan })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

plansRouter.post("/", async (req, res) => {
  const { user, body } = req
  setReqDate(body)
  try {
    const plan = await Plan.query().insert({ ...body, ownerUserId: user.id })
    await Signup.query().insert({ planId: plan.id, userId: user.id })
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
    const planToDelete = await Plan.query().findOne({ id, ownerUserId: user.id })
    if (planToDelete) {
      const deleted = await Signup.query().where("planId", id).delete()
      const success = await planToDelete.$query().delete()
      res.status(201).json({ success })
    } else {
      throw new Error()
    }
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default plansRouter