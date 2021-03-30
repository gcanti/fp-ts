import * as E from '../src/Either'
import { flow, pipe } from '../src/function'
import * as O from '../src/Option'
import * as _ from '../src/struct'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'
import { reverse } from '../src/Ord'

const sp = (s: string): s is 'a' => s === 'a'
const np = (n: number): n is 1 => n === 1

const noPrototype = Object.create(null)

describe('struct', () => {
  describe('pipeables', () => {
    it('mapS', () => {
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: true, c: 'abc' },
          _.mapS({
            a: (s) => s.length,
            b: (b) => !b,
          })
        ),
        { a: 1, b: false, c: 'abc' }
      )
      // should ignore non own properties
      const x: Record<'b', number> = Object.create({ a: 1 })
      x.b = 1
      U.deepStrictEqual(pipe(x, _.mapS({ b: (b) => b > 0 })), { b: true })
    })

    it('reduceS', () => {
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: 'abc' },
          _.reduceS(S.Ord)('', {
            a: (acc, cur) => acc + cur,
            b: (acc, cur) => acc + cur.toString()
          })
        ),
        'a1'
      )
      U.deepStrictEqual(
        pipe(
          { b: 1, a: 'a', c: 'abc' },
          _.reduceS(S.Ord)('', {
            a: (acc, cur) => acc + cur,
            b: (acc, cur) => acc + cur.toString()
          })
        ),
        'a1'
      )
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: 'abc' },
          _.reduceS(reverse(S.Ord))('', {
            a: (acc, cur) => acc + cur,
            b: (acc, cur) => acc + cur.toString()
          })
        ),
        '1a'
      )
    })

    it('foldMapS', () => {
      U.deepStrictEqual(
        pipe({ a: 'a', b: 1 }, _.foldMapS(S.Ord)(S.Monoid)({ a: (a) => a, b: (b) => b.toString() })),
        'a1'
      )
    })

    it('filterS', () => {
      const d = { a: 'a', b: 1, c: 'abc' }
      U.deepStrictEqual(
        pipe(
          d,
          _.filterS({
            a: (a) => a === 'b',
            b: (b) => b === 1
          })
        ),
          { b: 1, c: 'abc' }
        )
      U.deepStrictEqual(pipe({ a: 1, b: 'foo' }, _.filterS({ a: np, b: sp })), { a: 1 })

      const pass = { a: 1, b: 'a' } as const
      U.deepStrictEqual(pipe(pass, _.filterS({ a: np, b: sp })), pass)

      const x: { readonly a: 1; readonly b: 'foo' } = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
      U.deepStrictEqual(pipe(x, _.filterS({ a: np, b: sp })), { a: 1 })
      U.deepStrictEqual(pipe(noPrototype, _.filterS({})), noPrototype)
    })

    it('filterMapS', () => {
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: 'abc' },
          _.filterMapS({
            a: () => O.none,
            b: (n) => (np(n) ? O.some(n + 1) : O.none)
          })
        ),
        { b: 2, c: 'abc' }
      )

      const x: { readonly a: number; readonly b: string } = Object.assign(Object.create({ c: true }), {
        a: 1,
        b: 'foo'
      })
      U.deepStrictEqual(pipe(x, _.filterMapS({ a: O.fromPredicate(np), b: O.fromPredicate(sp) })), { a: 1 })
    })

    it('partitionS', () => {
      U.deepStrictEqual(
        pipe({ a: 'b', b: 1, c: 'abc' }, _.partitionS({ a: sp, b: np })),
        separated({ a: 'b' }, { b: 1, c: 'abc' } as const)
      )

      const x: { readonly a: number; readonly b: string } = Object.assign(Object.create({ c: true }), {
        a: 1,
        b: 'foo'
      })
      U.deepStrictEqual(pipe(x, _.partitionS({ a: np, b: sp })), separated({ b: 'foo' }, { a: 1 } as const))
      U.deepStrictEqual(pipe(noPrototype, _.partitionS({})), separated({}, {}))
    })

    it('partitionMapS', () => {
      const f = (n: number) => (np(n) ? E.right(n + 1) : E.left(n - 1))
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: 'abc' },
          _.partitionMapS({
            a: () => E.left('fail'),
            b: f
          })
        ),
        separated({ a: 'fail' }, { b: 2, c: 'abc' })
      )

      const x: { readonly a: number; readonly b: string } = Object.assign(Object.create({ c: true }), {
        a: 1,
        b: 'foo',
      })
      U.deepStrictEqual(
        pipe(
          x,
          _.partitionMapS({
            a: flow(
              E.fromPredicate(np),
              E.mapLeft(() => 'fail')
            ),
            b: flow(
              E.fromPredicate(sp),
              E.mapLeft(() => 'fail')
            )
          })
        ),
        separated({ b: 'fail' }, { a: 1 } as const)
      )
      U.deepStrictEqual(pipe(noPrototype, _.partitionMapS({})), separated({}, {}))
    })

    it('compactS', () => {
      U.deepStrictEqual(
        _.compactS({
          foo: O.some(123),
          bar: O.none,
          baz: O.some('abc')
        }),
        { foo: 123, baz: 'abc' }
      )
      // should ignore non own properties
      const o: { readonly b: O.Option<number> } = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.compactS), {})
    })

    it('unCompactS', () => {
      U.deepStrictEqual(_.unCompact({ foo: 123, bar: undefined, baz: 'abc' }), {
        foo: O.some(123),
        bar: O.none,
        baz: O.some('abc')
      })
    })

    it('separateS', () => {
      U.deepStrictEqual(
        _.separateS({ foo: E.right(123), bar: E.left('fail'), baz: E.right('abc') }),
        separated({ bar: 'fail' }, { foo: 123, baz: 'abc' })
      )
      // should ignore non own properties
      const o: { readonly b: E.Either<string, number> } = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.separateS), separated({}, {}))
    })

    it('traverseS', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 'b', c: 'abc' },
          _.traverseS(S.Ord)(O.Apply)({
            a: (n) => (n <= 2 ? O.some(n.toString()) : O.none),
            b: (b) => (b.length <= 2 ? O.some(b.length) : O.none)
          })
        ),
        O.some({ a: '1', b: 1, c: 'abc' })
      )
      U.deepStrictEqual(
        pipe(
          { a: 1, b: '2' },
          _.traverseS(S.Ord)(O.Apply)({
            a: (n) => (n >= 2 ? O.some(n.toString()) : O.none),
            b: () => O.some(3)
          })
        ),
        O.none
      )
    })

    it('witherS', async () => {
      U.deepStrictEqual(
        await pipe(
          { a: 2, b: 'a' },
          _.witherS(S.Ord)(T.ApplyPar)({
            a: (n) => T.of(np(n) ? O.some(n.toString()) : O.none),
            b: (n) => T.of(sp(n) ? O.some(n.length) : O.none)
          })
        )(),
        { b: 1 }
      )
    })

    it('wiltS', async () => {
      U.deepStrictEqual(
        await pipe(
          { a: 2, b: 'a' },
          _.wiltS(S.Ord)(T.ApplyPar)({
            a: (n) => T.of(np(n) ? E.right(n.toString()) : E.left(n - 1)),
            b: (n) => T.of(sp(n) ? E.right(n.length) : E.left('fail'))
          })
        )(),
        separated({ a: 1 }, { b: 1 })
      )
    })
  })

  describe('Non-pipeables', () => {
    it('traverseS_', () => {
      const f = {
        a: (n: number) => (n <= 2 ? O.some(n.toString()) : O.none),
        b: (b: string) => (b.length <= 2 ? O.some(b.length) : O.none)
      }
      U.deepStrictEqual(_.traverseS_(S.Ord)(O.Apply)({ a: 1, b: 'b', c: 'abc' }, f), O.some({ a: '1', b: 1, c: 'abc' }))
      U.deepStrictEqual(_.traverseS_(S.Ord)(O.Apply)({ a: 3, b: '2' }, f), O.none)
    })
  })

  describe('instances', () => {
    it('getAssignSemigroup', () => {
      type T = {
        readonly foo?: number
        readonly bar: string
      }
      const foo: T = {
        foo: 123,
        bar: '456'
      }
      const bar: T = {
        bar: '123'
      }
      const S = _.getAssignSemigroup<T>()
      U.deepStrictEqual(pipe(foo, S.concat(bar)), Object.assign({}, foo, bar))
    })
  })
})