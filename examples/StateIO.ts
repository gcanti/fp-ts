import * as stateT from 'fp-ts/lib/StateT'
import { io, IO } from 'fp-ts/lib/IO'
import { Monad } from 'fp-ts/lib/Monad'
import { Endomorphism, tuple } from 'fp-ts/lib/function'
import * as array from 'fp-ts/lib/Array'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    StateIO: StateIO<L, A>
  }
}

const stateTIO = stateT.getStateT(io)

export const URI = 'StateIO'

export type URI = typeof URI

export class StateIO<S, A> {
  readonly '-A': A
  readonly '-L': S
  readonly '-URI': URI
  constructor(readonly value: (s: S) => IO<[A, S]>) {}
  run(s: S): [A, S] {
    return this.value(s).run()
  }
  eval(s: S): A {
    return this.run(s)[0]
  }
  exec(s: S): S {
    return this.run(s)[1]
  }
  map<B>(f: (a: A) => B): StateIO<S, B> {
    return new StateIO(stateTIO.map(f, this.value))
  }
  ap<B>(fab: StateIO<S, (a: A) => B>): StateIO<S, B> {
    return new StateIO(stateTIO.ap(fab.value, this.value))
  }
  ap_<B, C>(this: StateIO<S, (b: B) => C>, fb: StateIO<S, B>): StateIO<S, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => StateIO<S, B>): StateIO<S, B> {
    return new StateIO(stateTIO.chain(a => f(a).value, this.value))
  }
}

export const map = <S, A, B>(fa: StateIO<S, A>, f: (a: A) => B): StateIO<S, B> => fa.map(f)

export const of = <S, A>(a: A): StateIO<S, A> => new StateIO(stateTIO.of(a))

export const ap = <S, A, B>(fab: StateIO<S, (a: A) => B>, fa: StateIO<S, A>): StateIO<S, B> => fa.ap(fab)

export const chain = <S, A, B>(f: (a: A) => StateIO<S, B>, fa: StateIO<S, A>): StateIO<S, B> => fa.chain(f)

export const get = <S>(): StateIO<S, S> => new StateIO(stateT.get(io)())

export const put = <S>(s: S): StateIO<S, void> => new StateIO(stateT.put(io)(s))

export const modify = <S>(f: Endomorphism<S>): StateIO<S, void> => new StateIO(stateT.modify(io)(f))

export const gets = <S, A>(f: (s: S) => A): StateIO<S, A> => new StateIO(stateT.gets(io)(f))

export const lift = <S, A>(fa: IO<A>): StateIO<S, A> => new StateIO(s => fa.map(a => tuple(a, s)))

export const stateIO: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}

//
// Usage (adapted from https://wiki.haskell.org/Simple_StateT_use)
//

// Example 1

import { log } from 'fp-ts/lib/Console'

/** pop the next unique off the stack */
const pop: StateIO<Array<number>, number> = get<Array<number>>().chain(ns =>
  array.fold(() => of(0), (h, t) => put(t).chain(() => of(h)), ns)
)

const program1: StateIO<Array<number>, void> = pop
  .chain(x => lift(log(x)))
  .chain(() => pop)
  .chain(y => lift(log(y)))
  .chain(() => of(undefined))

program1.run([1, 2, 3])
// => 1
// => 2

// Example 2: a guessing game

import { ordNumber } from 'fp-ts/lib/Ord'
import { randomInt } from 'fp-ts/lib/Random'

function readLine(s: string): IO<string> {
  return new IO(() => require('readline-sync').question(s))
}

function guessSession(answer: number): StateIO<number, void> {
  return lift<number, string>(readLine('')).chain(gs => {
    const g = parseInt(gs, 10)
    return modify<number>(s => s + 1).chain(() => {
      switch (ordNumber.compare(g)(answer)) {
        case -1:
          return lift<number, void>(log('Too low')).chain(() => guessSession(answer))
        case 1:
          return lift<number, void>(log('Too high')).chain(() => guessSession(answer))
        case 0:
          return lift<number, void>(log('Got it!'))
      }
    })
  })
}

const program2 = randomInt(1, 100).chain(answer =>
  log(`I'm thinking of a number between 1 and 100, can you guess it? `).chain(() => {
    const guesses = guessSession(answer).exec(0)
    return log(`Success in ${guesses} tries.`)
  })
)

program2.run()

// example 3: a global state

type Vars = {
  var1: number
  var2: number
}

type MyState<A> = StateIO<Vars, A>

type Selector<A> = [MyState<A>, (a: A) => MyState<void>]

const s1: Selector<number> = [gets(s => s.var1), var1 => modify(vars => ({ ...vars, var1 }))]

const s2: Selector<number> = [gets(s => s.var2), var2 => modify(vars => ({ ...vars, var2 }))]

function sel<A>(selector: Selector<A>): MyState<A> {
  return selector[0]
}

function mods<A>([gf, uf]: Selector<A>, mfun: Endomorphism<A>): MyState<void> {
  return gf.chain(st => uf(mfun(st)))
}

const program3 = sel(s1)
  .chain(a => mods(s2, n => n * a))
  .chain(() => sel(s2))
  .chain(b => lift(log(b)))

program3.run({ var1: 2, var2: 1.3 })
// => 2.6
