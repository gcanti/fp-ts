import { log } from '../src/Console'
import { Kind, URIS } from '../src/HKT'
import * as O from '../src/Option'
import { randomInt } from '../src/Random'
import * as T from '../src/Task'
import { createInterface } from 'readline'
import { State, state } from '../src/State'
import { Monad1 } from '../src/Monad'
import { flow } from '../src/function'
import { pipe, pipeable } from '../src/pipeable'
import { sequenceS } from '../src/Apply'

//
// type classes
//

interface Program<F extends URIS> extends Monad1<F> {
  finish: <A>(a: A) => Kind<F, A>
}

interface Console<F extends URIS> {
  putStrLn: (message: string) => Kind<F, void>
  getStrLn: Kind<F, string>
}

interface Random<F extends URIS> {
  nextInt: (upper: number) => Kind<F, number>
}

interface Main<F extends URIS> extends Program<F>, Console<F>, Random<F> {}

//
// instances
//

const programTask: Program<T.URI> = {
  ...T.task,
  finish: T.of
}

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

const consoleTask: Console<T.URI> = {
  putStrLn,
  getStrLn
}

const randomTask: Random<T.URI> = {
  nextInt: (upper) => T.fromIO(randomInt(1, upper))
}

//
// game
//

// parse a string to an integer
function parse(s: string): O.Option<number> {
  const i = +s
  return isNaN(i) || i % 1 !== 0 ? O.none : O.some(i)
}

function main<F extends URIS>(F: Main<F>): Kind<F, void> {
  // run `n` tasks in parallel
  const ado = sequenceS(F)

  const { chain, chainFirst } = pipeable(F)

  // ask something and get the answer
  const ask = (question: string): Kind<F, string> =>
    pipe(
      F.putStrLn(question),
      chain(() => F.getStrLn)
    )

  const shouldContinue = (name: string): Kind<F, boolean> => {
    return pipe(
      ask(`Do you want to continue, ${name} (y/n)?`),
      chain((answer) => {
        switch (answer.toLowerCase()) {
          case 'y':
            return F.of<boolean>(true)
          case 'n':
            return F.of<boolean>(false)
          default:
            return shouldContinue(name)
        }
      })
    )
  }

  const gameLoop = (name: string): Kind<F, void> => {
    return pipe(
      ado({
        secret: F.nextInt(5),
        guess: ask(`Dear ${name}, please guess a number from 1 to 5`)
      }),
      chain(({ secret, guess }) =>
        pipe(
          parse(guess),
          O.fold(
            () => F.putStrLn('You did not enter an integer!'),
            (x) =>
              x === secret
                ? F.putStrLn(`You guessed right, ${name}!`)
                : F.putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`)
          )
        )
      ),
      chain(() => shouldContinue(name)),
      chain((b) => (b ? gameLoop(name) : F.of<void>(undefined)))
    )
  }

  return pipe(
    ask('What is your name?'),
    chainFirst((name) => F.putStrLn(`Hello, ${name} welcome to the game!`)),
    chain(gameLoop)
  )
}

export const mainTask = main({
  ...programTask,
  ...consoleTask,
  ...randomTask
})

// tslint:disable-next-line: no-floating-promises
// mainTask.run()

//
// tests
//

import { dropLeft, snoc } from '../src/Array'

class TestData {
  constructor(readonly input: Array<string>, readonly output: Array<string>, readonly nums: Array<number>) {}
  putStrLn(message: string): [void, TestData] {
    return [undefined, new TestData(this.input, snoc(this.output, message), this.nums)]
  }
  getStrLn(): [string, TestData] {
    return [this.input[0], new TestData(dropLeft(1)(this.input), this.output, this.nums)]
  }
  nextInt(_upper: number): [number, TestData] {
    return [this.nums[0], new TestData(this.input, this.output, dropLeft(1)(this.nums))]
  }
}

const URI = 'Test'

type URI = typeof URI

declare module '../src/HKT' {
  interface URItoKind<A> {
    Test: Test<A>
  }
}

interface Test<A> extends State<TestData, A> {}

const of = <A>(a: A): Test<A> => (data) => [a, data]

const programTest: Program<URI> = {
  URI,
  map: state.map,
  of: state.of,
  ap: state.ap,
  chain: state.chain,
  finish: of
}

const consoleTest: Console<URI> = {
  putStrLn: (message) => (data) => data.putStrLn(message),
  getStrLn: (data) => data.getStrLn()
}

const randomTest: Random<URI> = {
  nextInt: (upper) => (data) => {
    return data.nextInt(upper)
  }
}

const mainTestTask = main({
  ...programTest,
  ...consoleTest,
  ...randomTest
})

const testExample = new TestData(['Giulio', '1', 'n'], [], [1])

import * as assert from 'assert'

assert.deepStrictEqual(mainTestTask(testExample), [
  undefined,
  new TestData(
    [],
    [
      'What is your name?',
      'Hello, Giulio welcome to the game!',
      'Dear Giulio, please guess a number from 1 to 5',
      'You guessed right, Giulio!',
      'Do you want to continue, Giulio (y/n)?'
    ],
    []
  )
])
