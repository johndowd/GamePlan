import express from 'express'
import { User } from '../../../models/index.js'
import DataGenerator from '../../../db/datagen/DataGenerator.js'

const behaviorRouter = new express.Router()

behaviorRouter.post("/:username/newPlan", async (req, res) => {
  const { username } = req.params
  try {
    const owner = await User.query().findOne({ username })
    const plan = await DataGenerator.generatePlan(owner)
    return res.status(201).json({ plan })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

behaviorRouter.post("/:username/join", async (req, res) => {
  const { username } = req.params
  try {
    const user = await User.query().findOne({ username })
    const plan = await DataGenerator.generateCommentAndJoin({ userData: user, planData: false })
    return res.status(201).json({ plan })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default behaviorRouter