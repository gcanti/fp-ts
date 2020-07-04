import * as assert from 'assert'
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

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('ReadonlyRecord', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(double)), { k1: 2, k2: 4 })
      assert.deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(double)), { a: 2, b: 4 })
      assert.deepStrictEqual(_.Functor.map({ a: 1, b: 2 }, double), { a: 2, b: 4 })
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      assert.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(monoidString)(identity)), 'ab')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight('', f)), 'ba')
    })

    it('compact', () => {
      assert.deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
    })

    it('separate', () => {
      assert.deepStrictEqual(_.separate({ foo: left(123), bar: right(123) }), {
        left: { foo: 123 },
        right: { bar: 123 }
      })
    })

    it('filter', () => {
      const d = { a: 1, b: 3 }
      assert.deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const y: _.ReadonlyRecord<string, string | number> = { a: 1, b: 'foo' }
      const actual = pipe(y, _.filter(isNumber))
      assert.deepStrictEqual(actual, { a: 1 })
      assert.deepStrictEqual(
        pipe(
          y,
          _.filter((_) => true)
        ),
        y
      )

      const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
      assert.deepStrictEqual(pipe(x, _.filter(isNumber)), { a: 1 })
      assert.deepStrictEqual(pipe(noPrototype, _.filter(isNumber)), noPrototype)
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      assert.deepStrictEqual(pipe({}, _.filterMap(f)), {})
      assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.filterMap(f)), { b: 4 })
    })

    it('partition', () => {
      assert.deepStrictEqual(pipe({}, _.partition(p)), { left: {}, right: {} })
      assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), {
        left: { a: 1 },
        right: { b: 3 }
      })
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(pipe({}, _.partitionMap(f)), { left: {}, right: {} })
      assert.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), {
        left: { a: 0 },
        right: { b: 4 }
      })
    })

    it('reduceWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      assert.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.foldMapWithIndex(monoidString)((k, a) => k + a)
        ),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      assert.deepStrictEqual(
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
        {
          left: { a: 'a' },
          right: { b: 2 }
        }
      )
    })

    it('partitionWithIndex', () => {
      assert.deepStrictEqual(
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
      assert.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
        ),
        { b: 2 }
      )
    })

    it('filterWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterWithIndex((_, a: number) => a > 1)
        ),
        { b: 2 }
      )
    })

    it('traverse', () => {
      assert.deepStrictEqual(
        _.traverse(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.some({ a: 1, b: 2 })
      )
      assert.deepStrictEqual(
        _.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      assert.deepStrictEqual(sequence({ a: O.some(1), b: O.some(2) }), O.some({ a: 1, b: 2 }))
      assert.deepStrictEqual(sequence({ a: O.none, b: O.some(2) }), O.none)
    })

    it('traverseWithIndex', () => {
      const traverseWithIndex = _.traverseWithIndex(O.Applicative)(
        (k, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      )
      assert.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
      assert.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(p(n) ? O.some(n + 1) : O.none))
      assert.deepStrictEqual(await pipe({}, wither)(), {})
      assert.deepStrictEqual(await pipe({ a: 1, b: 3 }, wither)(), { b: 4 })
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? right(n + 1) : left(n - 1)))
      assert.deepStrictEqual(await pipe({}, wilt)(), { left: {}, right: {} })
      assert.deepStrictEqual(await pipe({ a: 1, b: 3 }, wilt)(), { left: { a: 0 }, right: { b: 4 } })
    })
  })

  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(semigroupSum)
    assert.deepStrictEqual(M.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
    assert.deepStrictEqual(M.concat(d1, M.empty), d1)
    assert.deepStrictEqual(M.concat(M.empty, d2), d2)
    assert.deepStrictEqual(M.concat(d1, {}), d1)
  })

  it('getEq', () => {
    assert.deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 }, { a: 1 }), true)
    assert.deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 }, { a: 2 }), false)
    assert.deepStrictEqual(_.getEq(eqNumber).equals({ a: 1 }, { b: 1 }), false)
    assert.deepStrictEqual(_.getEq(eqNumber).equals(noPrototype, { b: 1 }), false)
  })

  it('lookup', () => {
    assert.deepStrictEqual(_.lookup('a', { a: 1 }), O.some(1))
    assert.deepStrictEqual(_.lookup('b', { a: 1 }), O.none)
    assert.deepStrictEqual(_.lookup('b', noPrototype), O.none)

    assert.deepStrictEqual(_.lookup('a')({ a: 1 }), O.some(1))
    assert.deepStrictEqual(_.lookup('b')({ a: 1 }), O.none)
    assert.deepStrictEqual(_.lookup('b')(noPrototype), O.none)
  })

  it('fromFoldable', () => {
    const First = getFirstSemigroup<number>()
    assert.deepStrictEqual(_.fromFoldable(First, A.Foldable)([['a', 1]]), { a: 1 })
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(_.toReadonlyArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    assert.deepStrictEqual(_.toReadonlyArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    assert.deepStrictEqual(_.toUnfoldable(A.Unfoldable)({ a: 1 }), [['a', 1]])
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
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('size', () => {
    assert.deepStrictEqual(_.size({}), 0)
    assert.deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    assert.deepStrictEqual(_.isEmpty({}), true)
    assert.deepStrictEqual(_.isEmpty({ a: 1 }), false)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(_.insertAt('a', 1)({}), { a: 1 })
    assert.deepStrictEqual(_.insertAt('c', 3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
    assert.deepStrictEqual(_.insertAt('a', 1)(x), x)
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(_.deleteAt('a')({ a: 1, b: 2 }), { b: 2 })
    // should return the same reference if the key is missing
    const x = { a: 1 }
    assert.deepStrictEqual(_.deleteAt('b')(x), x)
    assert.deepStrictEqual(_.deleteAt('b')(noPrototype), noPrototype)
  })

  it('pop', () => {
    assert.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }]))
    assert.deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('every', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    assert.deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    assert.deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    assert.deepStrictEqual(_.some((n: number) => n <= 1)(x), true)
    assert.deepStrictEqual(_.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    assert.deepStrictEqual(_.elem(eqNumber)(1, { a: 1, b: 2 }), true)
    assert.deepStrictEqual(_.elem(eqNumber)(3, { a: 1, b: 2 }), false)

    assert.deepStrictEqual(_.elem(eqNumber)(1)({ a: 1, b: 2 }), true)
    assert.deepStrictEqual(_.elem(eqNumber)(3)({ a: 1, b: 2 }), false)
  })

  it('fromFoldableMap', () => {
    const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): _.ReadonlyRecord<K, A> =>
      _.fromFoldableMap(getLastSemigroup<A>(), A.Foldable)(A.zip(keys, values), identity)

    assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    const users: ReadonlyArray<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    assert.deepStrictEqual(
      _.fromFoldableMap(getLastSemigroup<User>(), A.Foldable)(users, (user) => [user.id, user]),
      {
        id1: { id: 'id1', name: 'name3' },
        id2: { id: 'id2', name: 'name2' }
      }
    )
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    assert.deepStrictEqual(S.show({}), `{}`)
    assert.deepStrictEqual(S.show({ a: 'a' }), `{ "a": "a" }`)
    assert.deepStrictEqual(S.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    assert.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('hasOwnProperty', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    assert.deepStrictEqual(_.hasOwnProperty('a', x), true)
    assert.deepStrictEqual(_.hasOwnProperty('b', x), false)
    // TODO: remove in v3
    // #1249
    const hasOwnProperty: any = _.hasOwnProperty
    assert.deepStrictEqual(hasOwnProperty.call(x, 'a'), true)
    assert.deepStrictEqual(hasOwnProperty.call(x, 'b'), false)
  })

  it('updateAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    assert.deepStrictEqual(_.updateAt('b', 2)(x), O.none)
    assert.deepStrictEqual(_.updateAt('a', 2)(x), O.some({ a: 2 }))
    const r = _.updateAt('a', 1)(x)
    if (O.isSome(r)) {
      assert.deepStrictEqual(r.value, x)
    } else {
      assert.fail()
    }
  })

  it('modifyAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    assert.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    assert.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
  })

  it('fromRecord', () => {
    const as = { a: 1, b: 2 }
    const bs = _.fromRecord(as)
    assert.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toRecord', () => {
    const as: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const bs = _.toRecord(as)
    assert.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })
})
