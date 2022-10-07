import * as assert from 'assert'
import * as E from '../src/Result'
import { flow, identity, pipe, SK } from '../src/Function'
import * as IO from '../src/Sync'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyRecord'
import * as string from '../src/string'
import * as T from '../src/Async'
import * as U from './util'
import * as iterable from '../src/Iterable'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('ReadonlyRecord', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(U.double)), { k1: 2, k2: 4 })
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(U.double)), { a: 2, b: 4 })
    })

    describe('getFoldable', () => {
      const F = _.getFoldable(string.Ord)

      it('reduce', () => {
        const f = iterable.reduce('', (b, a) => b + a)
        U.deepStrictEqual(pipe({ k1: 'a', k2: 'b' }, F.toIterable, f), 'ab')
        U.deepStrictEqual(pipe({ k2: 'b', k1: 'a' }, F.toIterable, f), 'ab')
      })

      it('foldMap', () => {
        const f = iterable.foldMap(string.Monoid)
        U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, F.toIterable, f(identity)), 'ab')
      })

      it('reduceRight', () => {
        const f = iterable.reduceRight('', (a: string, acc: string) => acc + a)
        U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, F.toIterable, f), 'ba')
      })
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, O.Option<number>> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.compact), {})
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate({ foo: E.fail(123), bar: E.succeed(123) }), [{ foo: 123 }, { bar: 123 }])
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, E.Result<string, number>> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.separate), [{}, {}])
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
      U.deepStrictEqual(pipe({}, _.partition(p)), [{}, {}])
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), [{ a: 1 }, { b: 3 }])
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? E.succeed(n + 1) : E.fail(n - 1))
      U.deepStrictEqual(pipe({}, _.partitionMap(f)), [{}, {}])
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), [{ a: 0 }, { b: 4 }])
    })

    it('partitionMapWithIndex', () => {
      const f = _.partitionMapWithIndex((k, a: number) => (a > 1 ? E.succeed(a) : E.fail(k)))
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), [{ a: 'a' } as const, { b: 2 } as const])
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), [{}, {}])
    })

    it('partitionWithIndex', () => {
      const f = _.partitionWithIndex((_, a: number) => a > 1)
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), [{ a: 1 }, { b: 2 }])
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), [{}, {}])
    })

    it('filterMapWithIndex', () => {
      const f = _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), { b: 2 })
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), o)
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
        _.traverse(string.Ord)(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.some({ a: 1, b: 2 })
      )
      U.deepStrictEqual(
        _.traverse(string.Ord)(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(string.Ord)(O.Applicative)
      U.deepStrictEqual(sequence({ a: O.some(1), b: O.some(2) }), O.some({ a: 1, b: 2 }))
      U.deepStrictEqual(sequence({ a: O.none, b: O.some(2) }), O.none)
    })

    it('traverseWithIndex', () => {
      const T = _.getTraversableWithIndex(string.Ord)
      const traverseWithIndex = T.traverseWithIndex(O.Applicative)(
        (k, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      )
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
      U.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
    })

    describe('traverseWithIndex', () => {
      const T = _.getTraversableWithIndex(string.Ord)

      it('simple Traversal', () => {
        const f = (k: string, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
        const traverseWithIndex = T.traverseWithIndex(O.Applicative)(f)
        U.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
        U.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
      })

      it('should not modify arrays in place', () => {
        const result = pipe(
          { a: 2, b: 3 },
          T.traverseWithIndex(RA.Applicative)((_, n) =>
            pipe(
              n,
              RA.makeBy((i) => i * 4)
            )
          )
        )

        U.deepStrictEqual(result, [
          { a: 0, b: 0 },
          { a: 0, b: 4 },
          { a: 0, b: 8 },
          { a: 4, b: 0 },
          { a: 4, b: 4 },
          { a: 4, b: 8 }
        ])
      })
    })

    describe('getFilterableKind', () => {
      const W = _.getTraversableFilterable(string.Ord)

      it('filterMapKind', async () => {
        const filterMapKind = W.traverseFilterMap(T.ApplicativePar)((n: number) =>
          T.succeed(p(n) ? O.some(n + 1) : O.none)
        )
        U.deepStrictEqual(await pipe({}, filterMapKind)(), {})
        U.deepStrictEqual(await pipe({ a: 1, b: 3 }, filterMapKind)(), { b: 4 })
      })

      it('partitionMapKind', async () => {
        const partitionMapKind = W.traversePartitionMap(T.ApplicativePar)((n: number) =>
          T.succeed(p(n) ? E.succeed(n + 1) : E.fail(n - 1))
        )
        U.deepStrictEqual(await pipe({}, partitionMapKind)(), [{}, {}])
        U.deepStrictEqual(await pipe({ a: 1, b: 3 }, partitionMapKind)(), [{ a: 0 }, { b: 4 }])
      })
    })
  })

  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(N.SemigroupSum)
    U.deepStrictEqual(pipe(d1, M.combine(d2)), { k1: 1, k2: 5, k3: 4 })
    U.deepStrictEqual(pipe(d1, M.combine(M.empty)), d1)
    U.deepStrictEqual(pipe(M.empty, M.combine(d2)), d2)
    U.deepStrictEqual(pipe(d1, M.combine({})), d1)
    // should ignore non own properties
    const o = Object.create({ a: 1 })
    o.k2 = 2
    o.k3 = 4
    U.deepStrictEqual(pipe(d1, M.combine(o)), { k1: 1, k2: 5, k3: 4 })
  })

  it('getEq', () => {
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 })({ a: 1 }), true)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 })({ a: 2 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 })({ b: 1 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals(noPrototype)({ b: 1 }), false)
  })

  it('lookup', () => {
    U.deepStrictEqual(_.lookup('a')({ a: 1 }), O.some(1))
    U.deepStrictEqual(_.lookup('b')({ a: 1 }), O.none)
    U.deepStrictEqual(_.lookup('b')(noPrototype), O.none)
  })

  it('toUnfoldable', () => {
    U.deepStrictEqual(_.toUnfoldable(string.Ord)(RA.Unfoldable)({ a: 1 }), [['a', 1]])
  })

  it('traverseWithIndex should sort the keys', () => {
    const log: Array<string> = []
    const append =
      (message: string): IO.Sync<void> =>
      () => {
        log.push(message)
      }

    pipe(
      { b: append('b'), a: append('a') },
      _.traverseWithIndex(string.Ord)(IO.Applicative)((_, io) => io)
    )()
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('size', () => {
    U.deepStrictEqual(_.size({}), 0)
    U.deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    U.deepStrictEqual(_.isEmpty(_.empty), true)
    U.deepStrictEqual(_.isEmpty({}), true)
    U.deepStrictEqual(_.isEmpty({ a: 1 }), false)
    // should ignore non own properties
    U.deepStrictEqual(_.isEmpty(Object.create({ a: 1 })), true)
  })

  it('insertAt', () => {
    U.deepStrictEqual(pipe({}, _.insertAt('a', 1)), O.some({ a: 1 }))
    U.deepStrictEqual(pipe({ a: 1 }, _.insertAt('a', 1)), O.none)
    U.deepStrictEqual(pipe({ a: 2 }, _.insertAt('a', 1)), O.none)
  })

  it('upsertAt', () => {
    U.deepStrictEqual(pipe({}, _.upsertAt('a', 1)), { a: 1 })
    U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.upsertAt('c', 3)), { a: 1, b: 2, c: 3 })
    // should return the same reference when nothing changed
    const x = { a: 1 }
    U.strictEqual(pipe(x, _.upsertAt('a', 1)), x)
    // should create a new key when the value is `undefined`
    U.deepStrictEqual(pipe({}, _.upsertAt('a', undefined)), { a: undefined })
  })

  it('updateAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(pipe(x, _.updateAt('b', 2)), O.none)
    U.deepStrictEqual(pipe(x, _.updateAt('a', 2)), O.some({ a: 2 }))
    // should return the same reference when nothing changed
    U.deepStrictEqual(
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
    U.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    U.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
    // should return the same reference if nothing changed
    const input: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt('a', identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('deleteAt', () => {
    U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.deleteAt('a')), O.some({ b: 2 }))
    U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.deleteAt('c')), O.none)
  })

  it('pop', () => {
    U.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }] as const))
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
    U.deepStrictEqual(_.elem(N.Eq)(1)({ a: 1, b: 2 }), true)
    U.deepStrictEqual(_.elem(N.Eq)(3)({ a: 1, b: 2 }), false)
  })

  it('fromFoldable', () => {
    const f = _.fromIterable(N.SemigroupSum)((s: string) => [s, s.length])
    assert.deepStrictEqual(f(['a', 'bb', 'bb']), { a: 1, bb: 4 })
  })

  it('getShow', () => {
    const Sh = _.getShow(string.Ord)(string.Show)
    U.deepStrictEqual(Sh.show({}), `{}`)
    U.deepStrictEqual(Sh.show({ a: 'a' }), `{ "a": "a" }`)
    U.deepStrictEqual(Sh.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
    U.deepStrictEqual(Sh.show({ b: 'b', a: 'a' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    U.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('has', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.has('a', x), true)
    U.deepStrictEqual(_.has('b', x), false)
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(string.Semigroup)
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(pipe(x, M.combine(M.empty)), x)
    U.strictEqual(pipe(M.empty, M.combine(x)), x)
    U.strictEqual(pipe(x, M.combine({})), x)
    U.strictEqual(pipe({}, M.combine(x)), x)
    U.deepStrictEqual(pipe(x, M.combine(y)), {
      a: 'a1',
      b: 'b1b2',
      c: 'c1c2',
      d: 'd2'
    })
  })

  it('getIntersectionSemigroup', () => {
    const M = _.getIntersectionSemigroup(string.Semigroup)
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(pipe(x, M.combine(_.empty)), _.empty)
    U.strictEqual(pipe(_.empty, M.combine(x)), _.empty)
    U.strictEqual(pipe(x, M.combine({})), _.empty)
    U.strictEqual(pipe({}, M.combine(x)), _.empty)
    U.deepStrictEqual(pipe(x, M.combine(y)), {
      b: 'b1b2',
      c: 'c1c2'
    })
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma<string>()
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(pipe(x, M.combine(_.empty)), x)
    U.strictEqual(pipe(_.empty, M.combine(x)), x)
    U.strictEqual(pipe(x, M.combine({})), x)
    U.strictEqual(pipe({}, M.combine(x)), x)
    U.deepStrictEqual(pipe(x, M.combine(y)), {
      a: 'a1',
      d: 'd2'
    })
  })

  it('mapWithIndex', () => {
    // should ignore non own properties
    const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
    U.deepStrictEqual(pipe(o, _.mapWithIndex(flow(SK, U.double))), {})
  })

  it('toEntries', () => {
    U.deepStrictEqual(_.toEntries(string.Ord)({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('fromEntries', () => {
    U.deepStrictEqual(
      _.fromEntries([
        ['a', 1],
        ['b', 2],
        ['a', 3]
      ]),
      { b: 2, a: 3 }
    )
  })
})
