import * as assert from 'assert'
import { separated } from '../src/Compactable'
import { left, right } from '../src/Either'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as IO from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as A from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyRecord'
import { getFirstSemigroup, getLastSemigroup, semigroupSum } from '../src/Semigroup'
import { showString } from '../src/Show'
import * as T from '../src/Task'
import { deepStrictEqual } from './util'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('ReadonlyRecord', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(double)), { k1: 2, k2: 4 })
      deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(double)), { a: 2, b: 4 })
    })

    it('reduce', () => {
      deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(monoidString)(identity)), 'ab')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight('', f)), 'ba')
    })

    it('compact', () => {
      deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
    })

    it('separate', () => {
      deepStrictEqual(_.separate({ foo: left(123), bar: right(123) }), {
        left: { foo: 123 },
        right: { bar: 123 }
      })
    })

    it('filter', () => {
      const d = { a: 1, b: 3 }
      deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const y: _.ReadonlyRecord<string, string | number> = { a: 1, b: 'foo' }
      const actual = pipe(y, _.filter(isNumber))
      deepStrictEqual(actual, { a: 1 })
      deepStrictEqual(
        pipe(
          y,
          _.filter((_) => true)
        ),
        y
      )

      const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
      deepStrictEqual(pipe(x, _.filter(isNumber)), { a: 1 })
      deepStrictEqual(pipe(noPrototype, _.filter(isNumber)), noPrototype)
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      deepStrictEqual(pipe({}, _.filterMap(f)), {})
      deepStrictEqual(pipe({ a: 1, b: 3 }, _.filterMap(f)), { b: 4 })
    })

    it('partition', () => {
      deepStrictEqual(pipe({}, _.partition(p)), separated({}, {}))
      deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), {
        left: { a: 1 },
        right: { b: 3 }
      })
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      deepStrictEqual(pipe({}, _.partitionMap(f)), separated({}, {}))
      deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), {
        left: { a: 0 },
        right: { b: 4 }
      })
    })

    it('reduceWithIndex', () => {
      deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.foldMapWithIndex(monoidString)((k, a) => k + a)
        ),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceRightWithIndex('', (k, a, b) => b + k + a)
        ),
        'k2bk1a'
      )
    })

    it('partitionMapWithIndex', () => {
      deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.partitionMapWithIndex((k, a: number) => (a > 1 ? right(a) : left(k)))
        ),
        {
          left: { a: 'a' },
          right: { b: 2 }
        }
      )
    })

    it('partitionWithIndex', () => {
      deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.partitionWithIndex((_, a: number) => a > 1)
        ),
        {
          left: { a: 1 },
          right: { b: 2 }
        }
      )
    })

    it('filterMapWithIndex', () => {
      deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
        ),
        { b: 2 }
      )
    })

    it('filterWithIndex', () => {
      deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterWithIndex((_, a: number) => a > 1)
        ),
        { b: 2 }
      )
    })

    it('traverse', () => {
      deepStrictEqual(
        _.traverse(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.some({ a: 1, b: 2 })
      )
      deepStrictEqual(_.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }), O.none)
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      deepStrictEqual(sequence({ a: O.some(1), b: O.some(2) }), O.some({ a: 1, b: 2 }))
      deepStrictEqual(sequence({ a: O.none, b: O.some(2) }), O.none)
    })

    it('traverseWithIndex', () => {
      const traverseWithIndex = _.traverseWithIndex(O.Applicative)(
        (k, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      )
      deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
      deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(p(n) ? O.some(n + 1) : O.none))
      deepStrictEqual(await pipe({}, wither)(), {})
      deepStrictEqual(await pipe({ a: 1, b: 3 }, wither)(), { b: 4 })
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? right(n + 1) : left(n - 1)))
      deepStrictEqual(await pipe({}, wilt)(), separated({}, {}))
      deepStrictEqual(await pipe({ a: 1, b: 3 }, wilt)(), separated({ a: 0 }, { b: 4 }))
    })
  })

  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(semigroupSum)
    deepStrictEqual(pipe(d1, M.concat(d2)), { k1: 1, k2: 5, k3: 4 })
    deepStrictEqual(pipe(d1, M.concat(M.empty)), d1)
    deepStrictEqual(pipe(M.empty, M.concat(d2)), d2)
    deepStrictEqual(pipe(d1, M.concat({})), d1)
  })

  it('getEq', () => {
    deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 })({ a: 1 }), true)
    deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 })({ a: 2 }), false)
    deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 })({ b: 1 }), false)
    deepStrictEqual(_.getEq(eqNumber).equals(noPrototype)({ b: 1 }), false)
  })

  it('lookup', () => {
    deepStrictEqual(_.lookup('a')({ a: 1 }), O.some(1))
    deepStrictEqual(_.lookup('b')({ a: 1 }), O.none)
    deepStrictEqual(_.lookup('b')(noPrototype), O.none)
  })

  it('fromFoldable', () => {
    const First = getFirstSemigroup<number>()
    deepStrictEqual(_.fromFoldable(First, A.Foldable)([['a', 1]]), { a: 1 })
    deepStrictEqual(
      _.fromFoldable(
        First,
        A.Foldable
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 1
      }
    )
    const Last = getLastSemigroup<number>()
    deepStrictEqual(
      _.fromFoldable(
        Last,
        A.Foldable
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 2
      }
    )
  })

  it('toReadonlyArray', () => {
    deepStrictEqual(_.toReadonlyArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    deepStrictEqual(_.toReadonlyArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    deepStrictEqual(_.toUnfoldable(A.Unfoldable)({ a: 1 }), [['a', 1]])
  })

  it('traverseWithIndex should sort the keys', () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): IO.IO<void> => () => {
      log.push(message)
    }

    pipe(
      { b: append('b'), a: append('a') },
      _.traverseWithIndex(IO.Applicative)((_, io) => io)
    )()
    deepStrictEqual(log, ['a', 'b'])
  })

  it('size', () => {
    deepStrictEqual(_.size({}), 0)
    deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    deepStrictEqual(_.isEmpty({}), true)
    deepStrictEqual(_.isEmpty({ a: 1 }), false)
  })

  it('insertAt', () => {
    deepStrictEqual(pipe({}, _.insertAt('a', 1)), O.some({ a: 1 }))
    deepStrictEqual(pipe({ a: 1 }, _.insertAt('a', 1)), O.none)
    deepStrictEqual(pipe({ a: 2 }, _.insertAt('a', 1)), O.none)
  })

  it('upsertAt', () => {
    deepStrictEqual(pipe({}, _.upsertAt('a', 1)), { a: 1 })
    deepStrictEqual(pipe({ a: 1, b: 2 }, _.upsertAt('c', 3)), { a: 1, b: 2, c: 3 })
    // should return the same reference when nothing changed
    const x = { a: 1 }
    assert.strictEqual(pipe(x, _.upsertAt('a', 1)), x)
    // should create a new key when the value is `undefined`
    deepStrictEqual(pipe({}, _.upsertAt('a', undefined)), { a: undefined })
  })

  it('updateAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    deepStrictEqual(pipe(x, _.updateAt('b', 2)), O.none)
    deepStrictEqual(pipe(x, _.updateAt('a', 2)), O.some({ a: 2 }))
    // should return the same reference when nothing changed
    deepStrictEqual(
      pipe(
        x,
        _.updateAt('a', 1),
        O.map((y) => y === x)
      ),
      O.some(true)
    )
  })

  it('modifyAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    deepStrictEqual(
      pipe(
        x,
        _.modifyAt('b', (n) => n * 2)
      ),
      O.none
    )
    deepStrictEqual(
      pipe(
        x,
        _.modifyAt('a', (n) => n * 2)
      ),
      O.some({ a: 2 })
    )
    // should return the same reference when nothing changed
    deepStrictEqual(
      pipe(
        x,
        _.modifyAt('a', (n) => n),
        O.map((y) => y === x)
      ),
      O.some(true)
    )
  })

  it('deleteAt', () => {
    deepStrictEqual(pipe({ a: 1, b: 2 }, _.deleteAt('a')), { b: 2 })
    // should return the same reference when nothing changed
    const x = { a: 1 }
    assert.strictEqual(pipe(x, _.deleteAt('b')), x)
    assert.strictEqual(pipe(noPrototype, _.deleteAt('b')), noPrototype)
  })

  it('pop', () => {
    deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }] as const))
    deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('every', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    deepStrictEqual(_.some((n: number) => n <= 1)(x), true)
    deepStrictEqual(_.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    deepStrictEqual(_.elem(eqNumber)(1)({ a: 1, b: 2 }), true)
    deepStrictEqual(_.elem(eqNumber)(3)({ a: 1, b: 2 }), false)
  })

  it('fromFoldableMap', () => {
    const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): _.ReadonlyRecord<K, A> =>
      _.fromFoldableMap(getLastSemigroup<A>(), A.Foldable)(pipe(keys, A.zip(values)), identity)

    deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    const users: ReadonlyArray<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    deepStrictEqual(
      _.fromFoldableMap(getLastSemigroup<User>(), A.Foldable)(users, (user) => [user.id, user]),
      {
        id1: { id: 'id1', name: 'name3' },
        id2: { id: 'id2', name: 'name2' }
      }
    )
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    deepStrictEqual(S.show({}), `{}`)
    deepStrictEqual(S.show({ a: 'a' }), `{ "a": "a" }`)
    deepStrictEqual(S.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('has', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    deepStrictEqual(_.has('a', x), true)
    deepStrictEqual(_.has('b', x), false)
  })
})
