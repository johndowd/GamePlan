import { Game } from "../../models/index.js"
import fetchGameFromApi from "../../services/apiClientBGA/fetchGameFromApi.js"

class GameSeeder {
  static async seed() {

    const apiGameData1 = await fetchGameFromApi("root")
    const apiGameData2 = await fetchGameFromApi("wingspan")
    const apiGameData3 = await fetchGameFromApi("monopoly")
    const apiGameData4 = await fetchGameFromApi("Stratego")
    const apiGameData5 = await fetchGameFromApi("catan")
    const apiGameData6 = await fetchGameFromApi("carcassonne")

    const gameData = [apiGameData1, apiGameData2, apiGameData3, apiGameData4, apiGameData5, apiGameData6]

    for (const game of gameData) {
      const currentGame = await Game.query().findOne({ name: game.name })
      if (!currentGame) {
        await Game.query().insert(game)
      }
    }
  }
}

export default GameSeeder