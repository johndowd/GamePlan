import got from "got"

const searchApi = async gameName => {
  const body = await got(`https://api.boardgameatlas.com/api/search?name=${gameName}&client_id=VVQr9UTrTD`).json()
  const games = body.games
  const serializedGames = []

  for (const game of games) {
    const serializedGame = {
      name: game.name,
      image_url: game.image_url,
      max_players: game.max_players,
      description: game.description_preview,
      BGAApiId: game.id
    }
    serializedGames.push(serializedGame)
  }
  return serializedGames
}

export default searchApi