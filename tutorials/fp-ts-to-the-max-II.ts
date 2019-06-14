import { log } from '../src/Console'
import { Type, URIS, Kind } from '../src/HKT'
import { none, Option, some } from '../src/Option'
import { randomInt } from '../src/Random'
import { fromIO, Task, task, URI as TaskURI } from '../src/Task'
import { createInterface } from 'readline'
import { State } from '../src/State'

//
// helpers
//

const getStrLn: Task<string> = new Task(
  () =>
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
)

const putStrLn = (message: string): Task<void> => fromIO(log(message))

const parse = (s: string): Option<number> => {
  const i = +s
  return isNaN(i) || i % 1 !== 0 ? none : some(i)
}

//
// type classes
//

interface ProgramSyntax<F extends URIS, A> {
  map: <B>(f: (a: A) => B) => _<F, B>
  chain: <B>(f: (a: A) => _<F, B>) => _<F, B>
}

type _<F extends URIS, A> = Kind<F, A> & ProgramSyntax<F, A>

interface Program<F extends URIS> {
  finish: <A>(a: A) => _<F, A>
}

interface Console<F extends URIS> {
  putStrLn: (message: string) => _<F, void>
  getStrLn: _<F, string>
}

interface Random<F extends URIS> {
  nextInt: (upper: number) => _<F, number>
}

interface Main<F extends URIS> extends Program<F>, Console<F>, Random<F> {}

//
// instances
//

const programTask: Program<TaskURI> = {
  finish: task.of
}

const consoleTask: Console<TaskURI> = {
  putStrLn,
  getStrLn
}

const randomTask: Random<TaskURI> = {
  nextInt: upper => fromIO(randomInt(1, upper))
}

//
// game
//

const checkContinue = <F extends URIS>(F: Program<F> & Console<F>) => (name: string): _<F, boolean> =>
  F.putStrLn(`Do you want to continue, ${name}?`)
    .chain(() => F.getStrLn)
    .chain(answer => {
      switch (answer.toLowerCase()) {
        case 'y':
          return F.finish(true)
        case 'n':
          return F.finish(false)
        default:
          return checkContinue(F)(name)
      }
    })

const gameLoop = <F extends URIS>(F: Main<F>) => (name: string): _<F, void> =>
  F.nextInt(5).chain(secret =>
    F.putStrLn(`Dear ${name}, please guess a number from 1 to 5`)
      .chain(() =>
        F.getStrLn.chain(guess =>
          parse(guess).fold(F.putStrLn('You did not enter an integer!'), x =>
            x === secret
              ? F.putStrLn(`You guessed right, ${name}!`)
              : F.putStrLn(`You guessed wrong, ${name}! The number was: ${secret}`)
          )
        )
      )
      .chain(() => checkContinue(F)(name))
      .chain(shouldContinue => (shouldContinue ? gameLoop(F)(name) : F.finish(undefined)))
  )

const main = <F extends URIS>(F: Main<F>): _<F, void> => {
  return F.putStrLn('What is your name?')
    .chain(() => F.getStrLn)
    .chain(name => F.putStrLn(`Hello, ${name} welcome to the game!`).chain(() => gameLoop(F)(name)))
}

export const mainTask = main({ ...programTask, ...consoleTask, ...randomTask })

// tslint:disable-next-line: no-floating-promises
// mainTask.run()

//
// tests
//

import { drop, snoc, dropLeft } from '../src/Array'

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

const TestTaskURI = 'TestTask'

type TestTaskURI = typeof TestTaskURI

declare module '../src/HKT' {
  interface URI2HKT<A> {
    TestTask: TestTask<A>
  }
}

class TestTask<A> extends State<TestData, A> {}

const of = <A>(a: A): TestTask<A> => new TestTask(data => [a, data])

const programTestTask: Program<TestTaskURI> = {
  finish: of
}

const consoleTestTask: Console<TestTaskURI> = {
  putStrLn: (message: string) => new TestTask(data => data.putStrLn(message)),
  getStrLn: new TestTask(data => data.getStrLn())
}

const randomTestTask: Random<TestTaskURI> = {
  nextInt: upper => new TestTask(data => data.nextInt(upper))
}

const mainTestTask = main({ ...programTestTask, ...consoleTestTask, ...randomTestTask })
const testExample = new TestData(['Giulio', '1', 'n'], [], [1])

import * as assert from 'assert'

assert.deepStrictEqual(mainTestTask.run(testExample), [
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
