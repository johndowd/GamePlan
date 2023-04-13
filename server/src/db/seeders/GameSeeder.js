import { Game } from "../../models/index.js"
import fetchGameFromApi from "../../services/apiClient/fetchGameFromApi.js"

class GameSeeder {
  static async seed() {

    const apiGameData1 = await fetchGameFromApi("root")
    const apiGameData2 = await fetchGameFromApi("wingspan")
    const apiGameData3 = await fetchGameFromApi("brass: birmingham")
    const apiGameData4 = await fetchGameFromApi("Stratego")
    const apiGameData5 = await fetchGameFromApi("catan")
    const apiGameData6 = await fetchGameFromApi("carcassonne")
    const apiGameData7 = await fetchGameFromApi("terraforming mars")
    const apiGameData8 = await fetchGameFromApi("great western trail")
    const apiGameData9 = await fetchGameFromApi("azul")
    const apiGameData10 = await fetchGameFromApi("viticulture")
    const apiGameData11 = await fetchGameFromApi("Lost ruins of arnak")
    const apiGameData12 = await fetchGameFromApi("gloomhaven")

    const gameData = [apiGameData1, apiGameData2, apiGameData3, apiGameData4, apiGameData5, apiGameData6, apiGameData7, apiGameData8, apiGameData9, apiGameData10, apiGameData11, apiGameData12]

    for (const game of gameData) {
      const currentGame = await Game.query().findOne({ name: game.name })
      if (!currentGame) {
        await Game.query().insert(game)
      }
    }
  }

  static async getRandomGame() {
    const games = await Game.query()
    const rand = Math.floor(Math.random() * games.length)
    return games[rand]
  }
}

export default GameSeeder