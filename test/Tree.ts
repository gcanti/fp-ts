import * as Eq from '../src/Eq'
import { flow, identity, pipe } from '../src/function'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as _ from '../src/Tree'
import * as U from './util'
import * as N from '../src/number'
import * as T from '../src/Task'

describe('Tree', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('traverse', () => {
    const fa = _.tree('a', [_.tree('b'), _.tree('c')])
    U.deepStrictEqual(pipe(fa, _.traverse(O.Applicative)(O.some)), O.some(fa))
  })

  it('map', () => {
    const fa = _.tree(1, [_.tree(2), _.tree(3)])
    const expected = _.tree(2, [_.tree(4), _.tree(6)])
    U.deepStrictEqual(pipe(fa, _.map(U.double)), expected)
  })

  it('ap', () => {
    const fab = _.of(U.double)
    const fa = _.tree(1, [_.tree(2), _.tree(3)])
    const expected = _.tree(2, [_.tree(4), _.tree(6)])
    U.deepStrictEqual(pipe(fab, _.ap(fa)), expected)
  })

  it('apFirst', () => {
    U.deepStrictEqual(pipe(_.tree('a'), _.apFirst(_.tree('b'))), _.tree('a'))
  })

  it('apSecond', () => {
    U.deepStrictEqual(pipe(_.tree('a'), _.apSecond(_.tree('b'))), _.tree('b'))
  })

  it('chain', () => {
    const f = flow(U.double, _.of)
    const fa = _.tree(1, [_.tree(2), _.tree(3)])
    const expected = _.tree(2, [_.tree(4), _.tree(6)])
    U.deepStrictEqual(pipe(fa, _.chain(f)), expected)
  })

  it('chainFirst', () => {
    const f = flow(U.double, _.of)
    const fa = _.tree(1, [_.tree(2), _.tree(3)])
    U.deepStrictEqual(pipe(fa, _.chainFirst(f)), fa)
  })

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.tree(_.tree('a')), _.flatten), _.tree('a'))
  })

  it('duplicate', () => {
    U.deepStrictEqual(pipe(_.tree('a'), _.duplicate), _.tree(_.tree('a')))
  })

  it('extract', () => {
    const fa = _.tree(1, [_.tree(2), _.tree(3)])
    U.deepStrictEqual(pipe(fa, _.extract), 1)
  })

  it('extend', () => {
    const fa = _.tree('a', [_.tree('foo'), _.tree('b')])
    const f = (fa: _.Tree<string>) => fa.value.length + fa.forest.length
    const expected = _.tree(3, [_.tree(3), _.tree(1)])
    U.deepStrictEqual(pipe(fa, _.extend(f)), expected)
  })

  it('reduce', () => {
    const fa = _.tree('a', [_.tree('b'), _.tree('c')])
    U.deepStrictEqual(
      pipe(
        fa,
        _.reduce('', (b, a) => b + a)
      ),
      'abc'
    )
  })

  it('foldMap', () => {
    const x = _.tree('a', [_.tree('b'), _.tree('c')])
    U.deepStrictEqual(pipe(x, _.foldMap(S.Monoid)(identity)), 'abc')
  })

  it('reduceRight', () => {
    const x = _.tree('a', [_.tree('b'), _.tree('c')])
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(x, _.reduceRight('', f)), 'cba')
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('unfoldTree', () => {
    U.deepStrictEqual(
      pipe(
        1,
        _.unfoldTree((b) => [String(b), b < 3 ? [b + 1, b + 2] : []])
      ),
      _.tree('1', [_.tree('2', [_.tree('3'), _.tree('4')]), _.tree('3')])
    )
  })

  it('unfoldTreeM', async () => {
    U.deepStrictEqual(
      pipe(
        1,
        _.unfoldTreeM({ ...O.Monad, ...O.Applicative })((b) => O.some([b, b < 3 ? [b + 1, b + 2] : []]))
      ),
      O.some(_.tree(1, [_.tree(2, [_.tree(3), _.tree(4)]), _.tree(3)]))
    )
    U.deepStrictEqual(
      pipe(
        1,
        _.unfoldTreeM({ ...O.Monad, ...O.Applicative })((b) => (b < 3 ? O.some([b, [b + 1, b + 2]]) : O.none))
      ),
      O.none
    )
    U.deepStrictEqual(
      await pipe(
        1,
        _.unfoldTreeM({ ...T.Monad, ...T.ApplicativePar })((b) => T.of([b, b < 3 ? [b + 1, b + 2] : []]))
      )(),
      _.tree(1, [_.tree(2, [_.tree(3), _.tree(4)]), _.tree(3)])
    )
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getEq', () => {
    const E = _.getEq(N.Eq)
    const x = _.tree(1, [_.tree(2)])
    const y = _.tree(2, [_.tree(2)])
    const z = _.tree(1, [_.tree(1)])
    U.deepStrictEqual(E.equals(x)(x), true)
    U.deepStrictEqual(E.equals(x)(y), false)
    U.deepStrictEqual(E.equals(x)(z), false)
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    const t1 = _.tree('a')
    U.deepStrictEqual(Sh.show(t1), `tree("a")`)
    const t2 = _.tree('a', [_.tree('b'), _.tree('c')])
    U.deepStrictEqual(Sh.show(t2), `tree("a", [tree("b"), tree("c")])`)
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    const t = _.tree(1, [_.tree(2), _.tree(3)])
    U.deepStrictEqual(
      _.fold((a: number, bs: ReadonlyArray<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t),
      3
    )
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('drawTree', () => {
    const tree = _.tree('a')
    U.deepStrictEqual(_.drawTree(tree), 'a')

    const tree1 = _.tree('a', [_.tree('b'), _.tree('c'), _.tree('d', [_.tree('e'), _.tree('f')]), _.tree('g')])
    U.deepStrictEqual(
      _.drawTree(tree1),
      `a
├─ b
├─ c
├─ d
│  ├─ e
│  └─ f
└─ g`
    )

    const tree2 = _.tree('a', [_.tree('b', [_.tree('c')])])
    U.deepStrictEqual(
      _.drawTree(tree2),
      `a
└─ b
   └─ c`
    )

    const tree3 = _.tree('a', [_.tree('b', [_.tree('c')]), _.tree('d', [_.tree('e')])])
    U.deepStrictEqual(
      _.drawTree(tree3),
      `a
├─ b
│  └─ c
└─ d
   └─ e`
    )

    const tree4 = _.tree('a', [_.tree('b', [_.tree('c', [_.tree('d')]), _.tree('e', [_.tree('f')])]), _.tree('e')])
    U.deepStrictEqual(
      _.drawTree(tree4),
      `a
├─ b
│  ├─ c
│  │  └─ d
│  └─ e
│     └─ f
└─ e`
    )
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      _.tree({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), _.tree({ a: 1, b: 'b' }))
  })

  it('apT', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b'))), _.tree([1, 'b'] as const))
  })

  it('elem', () => {
    interface User {
      readonly id: number
    }
    const S: Eq.Eq<User> = pipe(
      N.Eq,
      Eq.contramap((user: User) => user.id)
    )
    const users = _.tree({ id: 1 }, [_.tree({ id: 1 }, [_.tree({ id: 3 }), _.tree({ id: 4 })]), _.tree({ id: 2 })])
    U.deepStrictEqual(pipe(users, _.elem(S)({ id: 1 })), true)
    U.deepStrictEqual(pipe(users, _.elem(S)({ id: 4 })), true)
    U.deepStrictEqual(pipe(users, _.elem(S)({ id: 5 })), false)
  })

  it('exists', () => {
    interface User {
      readonly id: number
    }
    const users = _.tree({ id: 1 }, [_.tree({ id: 1 }, [_.tree({ id: 3 }), _.tree({ id: 4 })]), _.tree({ id: 2 })])
    U.deepStrictEqual(_.exists((user: User) => user.id === 1)(users), true)
    U.deepStrictEqual(_.exists((user: User) => user.id === 4)(users), true)
    U.deepStrictEqual(_.exists((user: User) => user.id === 5)(users), false)
  })
})
