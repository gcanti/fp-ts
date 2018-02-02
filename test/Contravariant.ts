import * as assert from 'assert'
import { Contravariant1, lift } from '../src/Contravariant'

const URI = 'Predicate'

type URI = typeof URI

declare module '../src/HKT' {
  interface URI2HKT<A> {
    Predicate: Predicate<A>
  }
}

class Predicate<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(public readonly run: (a: A) => boolean) {}
}

const contramap = <A, B>(fa: Predicate<A>, f: (b: B) => A): Predicate<B> => new Predicate(b => fa.run(f(b)))

const predicate: Contravariant1<URI> = {
  URI,
  contramap
}

describe('Contravariant', () => {
  it('lift', () => {
    const length = (s: string) => s.length
    const liftPredicate = lift(predicate)
    const f = liftPredicate(length)
    assert.deepEqual(f(new Predicate(n => n > 2)).run('fo'), false)
    assert.deepEqual(f(new Predicate(n => n > 2)).run('foo'), true)
  })
})
