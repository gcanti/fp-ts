import { createInterface } from 'readline'
import { log } from '../src/Console'
import { none, Option, some, fold } from '../src/Option'
import { randomInt } from '../src/Random'
import { Task, task } from '../src/Task'

//
// helpers
//

const getStrLn: Task<string> = () =>
  new Promise(resolve => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('> ', answer => {
      rl.close()
      resolve(answer)
    })
  })

const putStrLn = (message: string): Task<void> => task.fromIO(log(message))

const random = task.fromIO(randomInt(1, 5))

const parse = (s: string): Option<number> => {
  const i = +s
  return isNaN(i) || i % 1 !== 0 ? none : some(i)
}

//
// game
//

const checkContinue = (name: string): Task<boolean> => {
  const put = putStrLn(`Do you want to continue, ${name}?`)
  const get = task.chain(put, () => getStrLn)
  const answer = task.chain(get, answer => {
    switch (answer.toLowerCase()) {
      case 'y':
        return task.of(true)
      case 'n':
        return task.of(false)
      default:
        return checkContinue(name)
    }
  })
  return answer
}

const parseFailureMessage = putStrLn('You did not enter an integer!')

const gameLoop = (name: string): Task<void> =>
  task.chain(random, secret => {
    const game = task.chain(putStrLn(`Dear ${name}, please guess a number from 1 to 5`), () =>
      task.chain(getStrLn, guess =>
        fold(parse(guess), parseFailureMessage, x =>
          x === secret
            ? putStrLn(`You guessed right, ${name}!`)
            : putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`)
        )
      )
    )
    const doContinue = task.chain(game, () => checkContinue(name))
    return task.chain(doContinue, shouldContinue => (shouldContinue ? gameLoop(name) : task.of(undefined)))
  })

const nameMessage = putStrLn('What is your name?')

const askName = task.chain(nameMessage, () => getStrLn)

const main: Task<void> = task.chain(askName, name =>
  task.chain(putStrLn(`Hello, ${name} welcome to the game!`), () => gameLoop(name))
)

// tslint:disable-next-line: no-floating-promises
main()
