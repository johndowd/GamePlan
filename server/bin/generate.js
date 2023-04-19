import DataGenerator from "../src/db/datagen/DataGenerator.js";
import { connection } from "../src/boot.js"


let i = 0

if (process.argv.length === 2) {
  throw new Error('must include parameters')
}
while (i < process.argv.length) {
  let arg = process.argv[i]

  if (arg[0] === '-') {
    if (arg[1] === 'u') {
      console.log('generating user...');
      await DataGenerator.generateUser()
      i++
    }

    if (arg[1] === 'p') {
      console.log('generating plan...');
      await DataGenerator.generatePlan()
      i++
    }

    if (arg[1] === 'p' && 'c') {
      console.log('generating plan with comment...');
      await DataGenerator.generatePlan()
      i++
    }

    if (arg[1] === 'j' && arg[2] === 'c') {
      console.log('generating join with comment...');
      await DataGenerator.generateCommentAndJoin()
      i++
    }
  } else {
    i++
  }
}

await connection.destroy()


console.log('Generate complete');