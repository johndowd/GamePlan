import got from "got"

const fetchGameFromBGAApi = async gameName => {
  try {
    const body = await got(`https://api.boardgameatlas.com/api/search?name=${gameName}&client_id=VVQr9UTrTD`).json()
    const gameData = body.games[0]
    const game = {
      name: gameData.name,
      image_url: gameData.image_url,
      max_players: gameData.max_players,
      description: gameData.description_preview,
      BGAAPiId: gameData.id
    }
    return game
  } catch (error) {
    console.error(error)
  }
}

export default fetchGameFromBGAApi