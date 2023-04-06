import express from "express"
import { ValidationError } from "objection"
import { Game } from "../../../models/index.js"
import PlanSerializer from "../../../serializers/PlanSerializer.js"
import searchApi from "../../../services/apiClient/searchApi.js"

const gamesRouter = new express.Router()

gamesRouter.post("/", async (req, res) => {
  const { body } = req
  try {
    const game = await Game.query().insertAndFetch(body)
    return res.status(201).json({ game })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

gamesRouter.get("/", async (req, res) => {
  try {
    const games = await Game.query()
    return res.status(200).json({ games })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const game = await Game.query().findById(id)
    return res.status(200).json({ game })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gamesRouter.get("/:gameId/plans", async (req, res) => {
  const { gameId } = req.params
  try {
    const game = await Game.query().findOne({ id: gameId })
    const plans = await game.$relatedQuery('plans')
    const serializedPlans = await Promise.all(plans.map(async plan => {
      return await PlanSerializer.getDetails(plan)
    }))
    return res.status(200).json({ plans: serializedPlans })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gamesRouter.get("/search/:query", async (req, res) => {
  const { query } = req.params
  try {
    const games = await Game.search(query)
    const apiGames = await searchApi(query)
    const gameNames = games.map(game => {
      return game.name
    })
    apiGames.forEach(apiGame => {
      if (!gameNames.includes(apiGame.name)) {
        games.push(apiGame)
      }
    })
    return res.status(200).json({ games: games })
  } catch (error) {
    res.status(401)
  }
})

export default gamesRouter