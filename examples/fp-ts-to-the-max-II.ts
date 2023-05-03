import * as assert from 'assert'
import { createInterface } from 'readline'

import { apS as apS_ } from '../src/Apply'
import { chainFirst as chainFirst_ } from '../src/Chain'
import { log } from '../src/Console'
import { flow, pipe } from '../src/function'
import { Kind, URIS } from '../src/HKT'
import { Monad1 } from '../src/Monad'
import * as O from '../src/Option'
import { randomInt } from '../src/Random'
import { append, dropLeft } from '../src/ReadonlyArray'
import * as S from '../src/State'
import * as T from '../src/Task'

//
// type classes
//

interface Program<F extends URIS> extends Monad1<F> {
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
  const flatMap =
    <A, B>(f: (a: A) => Kind<F, B>) =>
    (ma: Kind<F, A>): Kind<F, B> =>
      F.chain(ma, f)
  const Do: Kind<F, {}> = F.of({})
  const apS = apS_(F)
  const tap = chainFirst_(F)

  // ask something and get the answer
  const ask = (question: string): Kind<F, string> =>
    pipe(
      F.putStrLn(question),
      flatMap(() => F.getStrLn)
    )

  const shouldContinue = (name: string): Kind<F, boolean> => {
    return pipe(
      ask(`Do you want to continue, ${name} (y/n)?`),
      flatMap((answer) => {
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
      Do,
      apS('secret', F.nextInt(5)),
      apS('guess', ask(`Dear ${name}, please guess a number from 1 to 5`)),
      flatMap(({ secret, guess }) =>
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
      flatMap(() => shouldContinue(name)),
      flatMap((b) => (b ? gameLoop(name) : F.of<void>(undefined)))
    )
  }

  return pipe(
    ask('What is your name?'),
    tap((name) => F.putStrLn(`Hello, ${name} welcome to the game!`)),
    flatMap(gameLoop)
  )
}

export const mainTask = main({
  ...programTask,
  ...consoleTask,
  ...randomTask
})

// tslint:disable-next-line: no-floating-promises
// mainTask()

//
// tests
//

class TestData {
  constructor(
    readonly input: ReadonlyArray<string>,
    readonly output: ReadonlyArray<string>,
    readonly nums: ReadonlyArray<number>
  ) {}
  putStrLn(message: string): [void, TestData] {
    return [undefined, new TestData(this.input, pipe(this.output, append(message)), this.nums)]
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
    readonly Test: Test<A>
  }
}

interface Test<A> extends S.State<TestData, A> {}

const of =
  <A>(a: A): Test<A> =>
  (data) =>
    [a, data]

const programTest: Program<URI> = {
  ...S.Monad,
  URI,
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
