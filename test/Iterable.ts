import { pipe } from '../src/Function'
import * as _ from '../src/Iterable'
import * as string from '../src/string'
import * as O from '../src/Option'
import * as U from './util'
import * as internal from '../src/internal'

export interface Forest<A> extends ReadonlyArray<Tree<A>> {}

export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}

export const make = <A>(value: A, forest: Forest<A> = internal.emptyReadonlyArray): Tree<A> => ({
  value,
  forest
})

export const toIterable = <A>(self: Tree<A>): Iterable<A> => {
  return {
    *[Symbol.iterator](): Iterator<A> {
      yield self.value
      for (const t of self.forest) {
        yield* toIterable(t)
      }
    }
  }
}

export const head = <A>(self: Tree<A>) => _.head(toIterable(self))

describe('Iterable', () => {
  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.reduce('-', (b, [k, a]) => b + k + a)
      ),
      '-acbd'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.foldMap(string.Monoid)(([k, a]) => k + a)
      ),
      'acbd'
    )
  })

  it('reduceRight', () => {
    U.deepStrictEqual(
      pipe(
        new Map([
          ['a', 'c'],
          ['b', 'd']
        ]),
        _.reduceRight('-', ([k, a], b) => b + k + a)
      ),
      '-bdac'
    )
  })

  it('head', () => {
    U.deepStrictEqual(_.head([]), O.none)
    U.deepStrictEqual(_.head([1, 2, 3]), O.some(1))
    U.deepStrictEqual(head(make(1, [make(2), make(3)])), O.some(1))
  })
})
