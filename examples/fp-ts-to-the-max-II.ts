import { log } from '../src/Console'
import { Kind, URIS } from '../src/HKT'
import * as O from '../src/Option'
import { randomInt } from '../src/Random'
import * as T from '../src/Task'
import { createInterface } from 'readline'
import * as S from '../src/State'
import { Monad1 } from '../src/Monad'
import { flow, pipe } from '../src/function'

//
// type classes
//

interface Program<F extends URIS> extends Monad1<F>, Applicative1<F> {
  readonly finish: <A>(a: A) => Kind<F, A>
}

interface Console<F extends URIS> {
  readonly putStrLn: (message: string) => Kind<F, void>
  readonly getStrLn: Kind<F, string>
}

interface Random<F extends URIS> {
  readonly nextInt: (upper: number) => Kind<F, number>
}

interface Main<F extends URIS> extends Program<F>, Console<F>, Random<F> {}

//
// instances
//

const programTask: Program<T.URI> = {
  ...T.Monad,
  ...T.ApplicativePar,
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
  // ask something and get the answer
  const ask = (question: string): Kind<F, string> => pipe(F.putStrLn(question), (x) => F.chain(x, () => F.getStrLn))

  const shouldContinue = (name: string): Kind<F, boolean> => {
    return pipe(ask(`Do you want to continue, ${name} (y/n)?`), (x) =>
      F.chain(x, (answer) => {
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
      F.nextInt(5),
      (x) =>
        F.chain(x, (secret) =>
          pipe(
            ask(`Dear ${name}, please guess a number from 1 to 5`),
            F.map((guess) => ({ secret, guess }))
          )
        ),
      (x) =>
        F.chain(x, ({ secret, guess }) =>
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
      (x) => F.chain(x, () => shouldContinue(name)),
      (x) => F.chain(x, (b) => (b ? gameLoop(name) : F.of<void>(undefined)))
    )
  }

  return pipe(
    ask('What is your name?'),
    (x) =>
      F.chain(x, (name) =>
        pipe(
          F.putStrLn(`Hello, ${name} welcome to the game!`),
          F.map(() => name)
        )
      ),
    (x) => F.chain(x, gameLoop)
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

import { dropLeft, snoc } from '../src/ReadonlyArray'

class TestData {
  constructor(
    readonly input: ReadonlyArray<string>,
    readonly output: ReadonlyArray<string>,
    readonly nums: ReadonlyArray<number>
  ) {}
  putStrLn(message: string): readonly [void, TestData] {
    return [undefined, new TestData(this.input, snoc(message)(this.output), this.nums)]
  }
  getStrLn(): readonly [string, TestData] {
    return [this.input[0], new TestData(dropLeft(1)(this.input), this.output, this.nums)]
  }
  nextInt(_upper: number): readonly [number, TestData] {
    return [this.nums[0], new TestData(this.input, this.output, dropLeft(1)(this.nums))]
  }
}

const URI = 'Test'

type URI = typeof URI

declare module '../src/HKT' {
  interface URItoKind<A> {
    readonly Test: Test<A>
  }
}

interface Test<A> extends S.State<TestData, A> {}

const of = <A>(a: A): Test<A> => (data) => [a, data]

const programTest: Program<URI> = {
  URI,
  map: S.map,
  of: S.of,
  ap: S.ap,
  chain: (ma, f) => pipe(ma, S.chain(f)),
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
import { Applicative1 } from '../src/Applicative'

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
