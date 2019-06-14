import * as assert from 'assert'
import { Contravariant1, lift } from '../src/Contravariant'

const URI = 'Predicate'

type URI = typeof URI

declare module '../src/HKT' {
  interface URItoKind<A> {
    Predicate: Predicate<A>
  }
}

class Predicate<A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
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
    // tslint:disable-next-line: deprecation
    const liftPredicate = lift(predicate)
    const f = liftPredicate(length)
    assert.deepStrictEqual(f(new Predicate(n => n > 2)).run('fo'), false)
    assert.deepStrictEqual(f(new Predicate(n => n > 2)).run('foo'), true)
  })
})
