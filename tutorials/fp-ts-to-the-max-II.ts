import { log } from '../src/Console'
import { Type, URIS } from '../src/HKT'
import { none, Option, some, fold } from '../src/Option'
import { randomInt } from '../src/Random'
import * as T from '../src/Task'
import { createInterface } from 'readline'
import { State, state } from '../src/State'
import { Monad1 } from '../src/Monad'

//
// helpers
//

const getStrLn: T.Task<string> = () =>
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

const putStrLn = (message: string): T.Task<void> => T.task.fromIO(log(message))

const parse = (s: string): Option<number> => {
  const i = +s
  return isNaN(i) || i % 1 !== 0 ? none : some(i)
}

//
// type classes
//

interface Program<F extends URIS> extends Monad1<F> {
  finish: <A>(a: A) => Type<F, A>
}

interface Console<F extends URIS> {
  putStrLn: (message: string) => Type<F, void>
  getStrLn: Type<F, string>
}

interface Random<F extends URIS> {
  nextInt: (upper: number) => Type<F, number>
}

interface Main<F extends URIS> extends Program<F>, Console<F>, Random<F> {}

//
// instances
//

const programTask: Program<T.URI> = {
  ...T.task,
  finish: T.task.of
}

const consoleTask: Console<T.URI> = {
  putStrLn,
  getStrLn
}

const randomTask: Random<T.URI> = {
  nextInt: upper => T.task.fromIO(randomInt(1, upper))
}

//
// game
//

const checkContinue = <F extends URIS>(F: Program<F> & Console<F>) => (name: string): Type<F, boolean> => {
  const put = F.putStrLn(`Do you want to continue, ${name}?`)
  const get = F.chain(put, () => F.getStrLn)
  const answer = F.chain(get, answer => {
    switch (answer.toLowerCase()) {
      case 'y':
        return F.of(true)
      case 'n':
        return F.of(false)
      default:
        return checkContinue(F)(name)
    }
  })
  return answer
}

const gameLoop = <F extends URIS>(F: Main<F>) => (name: string): Type<F, void> => {
  const parseFailureMessage = F.putStrLn('You did not enter an integer!')

  return F.chain(F.nextInt(5), secret => {
    const game = F.chain(F.putStrLn(`Dear ${name}, please guess a number from 1 to 5`), () =>
      F.chain(F.getStrLn, guess =>
        fold(parse(guess), parseFailureMessage, x =>
          x === secret
            ? F.putStrLn(`You guessed right, ${name}!`)
            : F.putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`)
        )
      )
    )
    const doContinue = F.chain(game, () => checkContinue(F)(name))
    return F.chain(doContinue, shouldContinue => (shouldContinue ? gameLoop(F)(name) : F.of(undefined)))
  })
}

const main = <F extends URIS>(F: Main<F>): Type<F, void> => {
  const nameMessage = F.putStrLn('What is your name?')
  const askName = F.chain(nameMessage, () => F.getStrLn)
  return F.chain(askName, name => F.chain(F.putStrLn(`Hello, ${name} welcome to the game!`), () => gameLoop(F)(name)))
}

export const mainTask = main({ ...programTask, ...consoleTask, ...randomTask })

// tslint:disable-next-line: no-floating-promises
// mainTask.run()

//
// tests
//

import { drop, snoc } from '../src/Array'

class TestData {
  constructor(readonly input: Array<string>, readonly output: Array<string>, readonly nums: Array<number>) {}
  putStrLn(message: string): [void, TestData] {
    return [undefined, new TestData(this.input, snoc(this.output, message), this.nums)]
  }
  getStrLn(): [string, TestData] {
    return [this.input[0], new TestData(drop(1, this.input), this.output, this.nums)]
  }
  nextInt(_upper: number): [number, TestData] {
    return [this.nums[0], new TestData(this.input, this.output, drop(1, this.nums))]
  }
}

const URI = 'Test'

type URI = typeof URI

declare module '../src/HKT' {
  interface URI2HKT<A> {
    Test: Test<A>
  }
}

interface Test<A> extends State<TestData, A> {}

const of = <A>(a: A): Test<A> => data => [a, data]

const programTest: Program<URI> = {
  URI,
  map: state.map,
  of: state.of,
  ap: state.ap,
  chain: state.chain,
  finish: of
}

const consoleTest: Console<URI> = {
  putStrLn: message => data => data.putStrLn(message),
  getStrLn: data => data.getStrLn()
}

const randomTest: Random<URI> = {
  nextInt: upper => data => {
    return data.nextInt(upper)
  }
}

const mainTestTask = main({ ...programTest, ...consoleTest, ...randomTest })
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
      'Do you want to continue, Giulio?'
    ],
    []
  )
])
