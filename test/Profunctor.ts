import * as assert from 'assert'
import { rmap, lmap, Profunctor2 } from '../src/Profunctor'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    Fun: Fun<L, A>
  }
}

const URI = 'Fun'

type URI = typeof URI

class Fun<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly run: (l: L) => A) {}
}

const map = <L, A, B>(fa: Fun<L, A>, f: (a: A) => B): Fun<L, B> => {
  return new Fun(l => f(fa.run(l)))
}

const promap = <A, B, C, D>(fbc: Fun<B, C>, f: (a: A) => B, g: (c: C) => D): Fun<A, D> => {
  return new Fun(a => g(fbc.run(f(a))))
}

const profunctorFun: Profunctor2<URI> = {
  URI,
  map,
  promap
}

describe('Profunctor', () => {
  it('lmap', () => {
    const fbc = new Fun((s: string): number => s.length)
    const f = lmap(profunctorFun)
    const fac = f(fbc, (s: string) => s + '!')
    assert.strictEqual(fac.run('foo'), 4)
  })

  it('rmap', () => {
    const fbc = new Fun((s: string): number => s.length)
    const f = rmap(profunctorFun)
    const fac = f(fbc, n => n >= 0)
    assert.strictEqual(fac.run('foo'), true)
  })
})
