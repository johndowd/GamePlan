import express from "express"
import { Game } from "../../../models/index.js"

const gamesRouter = new express.Router()

gamesRouter.get("/trending", async (req, res) => {
  try {
    const games = await Game.getTrending()
    return res.status(200).json({ games })
  } catch (error) {
    return res.status(500).json({ errors: error})
  }
})

export default gamesRouter