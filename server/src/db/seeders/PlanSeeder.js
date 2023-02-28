import { Game, Plan, User } from "../../models/index.js"

class PlanSeeder {
  static async seed() {
    const users = await User.query()
    const games = await Game.query()

    const planData = [
      {
        name: "Play Root with a first-timer!",
        gameId: games[0].id,
        date: new Date(2023, 2, 28, 19),
        ownerUserId: users[0].id,
        location: "Boston Public Market",
        address: '100 Hanover St, Boston, MA 02108'
      },
      {
        name: "Learn Stratego Secrets!",
        gameId: games[3].id,
        location: "Tavern of Tales",
        address: '1478 Tremont St, Boston, MA 02120',
        date: new Date(2023, 4, 20, 19, 30),
        ownerUserId: users[4].id
      },
      {
        name: "Help me learn Wingspan!",
        gameId: games[1].id,
        location: "swissbakers",
        address: '168 Western Ave, Boston, MA 02134',
        date: new Date(2023, 3, 28, 20, 30),
        ownerUserId: users[1].id
      },
      {
        name: "Join the Settlers of Catan!",
        gameId: games[4].id,
        location: "Paventment by my house",
        address: "415 Western Ave, Brighton, MA 02135",
        date: new Date(2023, 4, 20, 19),
        ownerUserId: users[0].id
      },
      {
        name: "Get ready for Carcassonne!",
        gameId: games[5].id,
        location: "Tavern of Tales",
        address: "1478 Tremont St, Boston, MA 02120",
        date: new Date(2023, 3, 30, 18),
        ownerUserId: users[3].id
      },
      {
        name: "Lets create a bustling economy in a british city!",
        gameId: games[2].id,
        location: "Launch Academy",
        address: "77 Summer Street , Boston, MA 02111",
        date: new Date(2023, 4, 20, 19),
        ownerUserId: users[5].id
      },
      {
        name: "I want to change mars!",
        gameId: games[6].id,
        location: "Honan-allston Library",
        address: "300 North Harvard St, Boston MA 02134",
        date: new Date(2023, 3, 29, 18),
        ownerUserId: users[6].id
      },
      {
        name: "Make some wine with me!",
        gameId: games[9].id,
        location: "Eureka",
        address: "1355 Beacon St Brookline, MA 02446",
        date: new Date(2023, 4, 15, 19),
        ownerUserId: users[7].id
      },
      {
        name: "Lets make some Cow friends!",
        gameId: games[7].id,
        location: "Lulus",
        address: "421 Cambridge St, Allston, MA 02134",
        date: new Date(2023, 3, 28, 18),
        ownerUserId: users[8].id
      },
      {
        name: "Lets make some tiles!",
        gameId: games[8].id,
        location: "Notch Brewery & Tap Room - Brighton",
        address: "525 Western Ave, Brighton, MA 02135",
        date: new Date(2023, 4, 30, 18),
        ownerUserId: users[2].id
      }
    ]

    for (const plan of planData) {
      await Plan.query().insert(plan)
    }
  }
}

export default PlanSeeder