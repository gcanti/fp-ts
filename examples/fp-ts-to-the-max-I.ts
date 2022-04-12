import { createInterface } from 'readline'
import { log } from '../src/Console'
import { flow, pipe } from '../src/function'
import * as O from '../src/Option'
import { randomInt } from '../src/Random'
import * as T from '../src/Task'

//
// helpers
//

// read from standard input
const getStrLn: T.Task<string> = () =>
  new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('> ', (answer) => {
      rl.close()
      resolve(answer)
    })
  })

// write to standard output
const putStrLn = flow(log, T.fromIO)

// ask something and get the answer
function ask(question: string): T.Task<string> {
  return pipe(
    putStrLn(question),
    T.chain(() => getStrLn)
  )
}

// get a random int between 1 and 5
const random = T.fromIO(randomInt(1, 5))

// parse a string to an integer
function parse(s: string): O.Option<number> {
  const i = +s
  return isNaN(i) || i % 1 !== 0 ? O.none : O.some(i)
}

//
// game
//

function shouldContinue(name: string): T.Task<boolean> {
  return pipe(
    ask(`Do you want to continue, ${name} (y/n)?`),
    T.chain((answer) => {
      switch (answer.toLowerCase()) {
        case 'y':
          return T.of(true)
        case 'n':
          return T.of(false)
        default:
          return shouldContinue(name)
      }
    })
  )
}

function gameLoop(name: string): T.Task<void> {
  return pipe(
    T.Do,
    T.apS('secret', random),
    T.apS('guess', ask(`Dear ${name}, please guess a number from 1 to 5`)),
    T.chain(({ secret, guess }) =>
      pipe(
        parse(guess),
        O.fold(
          () => putStrLn('You did not enter an integer!'),
          (x) =>
            x === secret
              ? putStrLn(`You guessed right, ${name}!`)
              : putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`)
        )
      )
    ),
    T.chain(() => shouldContinue(name)),
    T.chain((b) => (b ? gameLoop(name) : T.of(undefined)))
  )
}

const main: T.Task<void> = pipe(
  ask('What is your name?'),
  T.chainFirst((name) => putStrLn(`Hello, ${name} welcome to the game!`)),
  T.chain(gameLoop)
)

// tslint:disable-next-line: no-floating-promises
main()
