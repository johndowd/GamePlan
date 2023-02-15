import got from "got"
import { Game } from "../../models/index.js"
import fetchGameFromBGAApi from "../../services/fetchGameFromBGAApi.js"

class GameSeeder {
  static async seed() {

    const apiGameData1 = await fetchGameFromBGAApi("root")
    const apiGameData2 = await fetchGameFromBGAApi("wingspan")
    const apiGameData3 = await fetchGameFromBGAApi("monopoly")
    const apiGameData4 = await fetchGameFromBGAApi("Stratego")
    const apiGameData5 = await fetchGameFromBGAApi("catan")
    const apiGameData6 = await fetchGameFromBGAApi("carcassonne")

    const gameData = [apiGameData1, apiGameData2, apiGameData3, apiGameData4, apiGameData5, apiGameData6]

    for( const game of gameData){
      const currentGame = await Game.query().findOne({ name: game.name })
      if(!currentGame){
        await Game.query().insert(game)
      }
    }
  }
}

export default GameSeeder