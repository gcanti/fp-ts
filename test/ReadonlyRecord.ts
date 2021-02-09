import * as assert from 'assert'
import { left, right } from '../src/Either'
import { identity, pipe } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyRecord'
import { getFirstSemigroup, getLastSemigroup } from '../src/Semigroup'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('ReadonlyRecord', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(double)), { k1: 2, k2: 4 })
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(double)), { a: 2, b: 4 })
      U.deepStrictEqual(_.Functor.map({ a: 1, b: 2 }, double), { a: 2, b: 4 })
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(S.Monoid)(identity)), 'ab')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight('', f)), 'ba')
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate({ foo: left(123), bar: right(123) }), separated({ foo: 123 }, { bar: 123 }))
    })

    it('filter', () => {
      const d = { a: 1, b: 3 }
      U.deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const y: _.ReadonlyRecord<string, string | number> = { a: 1, b: 'foo' }
      const actual = pipe(y, _.filter(isNumber))
      U.deepStrictEqual(actual, { a: 1 })
      U.deepStrictEqual(
        pipe(
          y,
          _.filter((_) => true)
        ),
        y
      )

      const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
      U.deepStrictEqual(pipe(x, _.filter(isNumber)), { a: 1 })
      U.deepStrictEqual(pipe(noPrototype, _.filter(isNumber)), noPrototype)
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe({}, _.filterMap(f)), {})
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.filterMap(f)), { b: 4 })
    })

    it('partition', () => {
      U.deepStrictEqual(pipe({}, _.partition(p)), separated({}, {}))
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), separated({ a: 1 }, { b: 3 }))
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      U.deepStrictEqual(pipe({}, _.partitionMap(f)), separated({}, {}))
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), separated({ a: 0 }, { b: 4 }))
    })

    it('reduceWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.foldMapWithIndex(S.Monoid)((k, a) => k + a)
        ),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceRightWithIndex('', (k, a, b) => b + k + a)
        ),
        'k2bk1a'
      )
    })

    it('partitionMapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.partitionMapWithIndex((k, a: number) => (a > 1 ? right(a) : left(k)))
        ),
        separated({ a: 'a' }, { b: 2 })
      )
    })

    it('partitionWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.partitionWithIndex((_, a: number) => a > 1)
        ),
        separated({ a: 1 }, { b: 2 })
      )
    })

    it('filterMapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
        ),
        { b: 2 }
      )
    })

    it('filterWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterWithIndex((_, a: number) => a > 1)
        ),
        { b: 2 }
      )
    })

    it('traverse', () => {
      U.deepStrictEqual(
        _.traverse(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.some({ a: 1, b: 2 })
      )
      U.deepStrictEqual(_.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }), O.none)
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence({ a: O.some(1), b: O.some(2) }), O.some({ a: 1, b: 2 }))
      U.deepStrictEqual(sequence({ a: O.none, b: O.some(2) }), O.none)
    })

    it('traverseWithIndex', () => {
      const traverseWithIndex = _.traverseWithIndex(O.Applicative)(
        (k, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      )
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
      U.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(p(n) ? O.some(n + 1) : O.none))
      U.deepStrictEqual(await pipe({}, wither)(), {})
      U.deepStrictEqual(await pipe({ a: 1, b: 3 }, wither)(), { b: 4 })
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? right(n + 1) : left(n - 1)))
      U.deepStrictEqual(await pipe({}, wilt)(), separated({}, {}))
      U.deepStrictEqual(await pipe({ a: 1, b: 3 }, wilt)(), separated({ a: 0 }, { b: 4 }))
    })
  })

  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(N.SemigroupSum)
    U.deepStrictEqual(M.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
    U.deepStrictEqual(M.concat(d1, M.empty), d1)
    U.deepStrictEqual(M.concat(M.empty, d2), d2)
    U.deepStrictEqual(M.concat(d1, {}), d1)
  })

  it('getEq', () => {
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 }, { a: 1 }), true)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 }, { a: 2 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 }, { b: 1 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals(noPrototype, { b: 1 }), false)
  })

  it('lookup', () => {
    U.deepStrictEqual(_.lookup('a', { a: 1 }), O.some(1))
    U.deepStrictEqual(_.lookup('b', { a: 1 }), O.none)
    U.deepStrictEqual(_.lookup('b', noPrototype), O.none)

    U.deepStrictEqual(_.lookup('a')({ a: 1 }), O.some(1))
    U.deepStrictEqual(_.lookup('b')({ a: 1 }), O.none)
    U.deepStrictEqual(_.lookup('b')(noPrototype), O.none)
  })

  it('fromFoldable', () => {
    const First = getFirstSemigroup<number>()
    U.deepStrictEqual(_.fromFoldable(First, RA.Foldable)([['a', 1]]), { a: 1 })
    U.deepStrictEqual(
      _.fromFoldable(
        First,
        RA.Foldable
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 1
      }
    )
    const Last = getLastSemigroup<number>()
    U.deepStrictEqual(
      _.fromFoldable(
        Last,
        RA.Foldable
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
    U.deepStrictEqual(_.toReadonlyArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    U.deepStrictEqual(_.toReadonlyArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    U.deepStrictEqual(_.toUnfoldable(RA.Unfoldable)({ a: 1 }), [['a', 1]])
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
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('size', () => {
    U.deepStrictEqual(_.size({}), 0)
    U.deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    U.deepStrictEqual(_.isEmpty({}), true)
    U.deepStrictEqual(_.isEmpty({ a: 1 }), false)
  })

  it('insertAt', () => {
    U.deepStrictEqual(_.insertAt('a', 1)({}), { a: 1 })
    U.deepStrictEqual(_.insertAt('c', 3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
    U.deepStrictEqual(_.insertAt('a', 1)(x), x)
  })

  it('deleteAt', () => {
    U.deepStrictEqual(_.deleteAt('a')({ a: 1, b: 2 }), { b: 2 })
    // should return the same reference if the key is missing
    const x = { a: 1 }
    U.deepStrictEqual(_.deleteAt('b')(x), x)
    U.deepStrictEqual(_.deleteAt('b')(noPrototype), noPrototype)
  })

  it('pop', () => {
    assert.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }]))
    U.deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('every', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    U.deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.some((n: number) => n <= 1)(x), true)
    U.deepStrictEqual(_.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    U.deepStrictEqual(_.elem(N.Eq)(1, { a: 1, b: 2 }), true)
    U.deepStrictEqual(_.elem(N.Eq)(3, { a: 1, b: 2 }), false)

    U.deepStrictEqual(_.elem(N.Eq)(1)({ a: 1, b: 2 }), true)
    U.deepStrictEqual(_.elem(N.Eq)(3)({ a: 1, b: 2 }), false)
  })

  it('fromFoldableMap', () => {
    const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): _.ReadonlyRecord<K, A> =>
      _.fromFoldableMap(getLastSemigroup<A>(), RA.Foldable)(RA.zip(keys, values), identity)

    U.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    const users: ReadonlyArray<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    U.deepStrictEqual(
      _.fromFoldableMap(getLastSemigroup<User>(), RA.Foldable)(users, (user) => [user.id, user]),
      {
        id1: { id: 'id1', name: 'name3' },
        id2: { id: 'id2', name: 'name2' }
      }
    )
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show({}), `{}`)
    U.deepStrictEqual(Sh.show({ a: 'a' }), `{ "a": "a" }`)
    U.deepStrictEqual(Sh.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    U.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('hasOwnProperty', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.hasOwnProperty('a', x), true)
    U.deepStrictEqual(_.hasOwnProperty('b', x), false)
    // TODO: remove in v3
    // #1249
    const hasOwnProperty: any = _.hasOwnProperty
    U.deepStrictEqual(hasOwnProperty.call(x, 'a'), true)
    U.deepStrictEqual(hasOwnProperty.call(x, 'b'), false)
  })

  it('updateAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.updateAt('b', 2)(x), O.none)
    U.deepStrictEqual(_.updateAt('a', 2)(x), O.some({ a: 2 }))
    const r = _.updateAt('a', 1)(x)
    if (O.isSome(r)) {
      U.deepStrictEqual(r.value, x)
    } else {
      assert.fail()
    }
  })

  it('modifyAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    U.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
  })

  it('fromRecord', () => {
    const as = { a: 1, b: 2 }
    const bs = _.fromRecord(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toRecord', () => {
    const as: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const bs = _.toRecord(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })
})
