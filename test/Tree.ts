import * as Eq from '../src/Eq'
import { flow, identity, pipe } from '../src/Function'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as _ from '../src/Tree'
import * as U from './util'
import * as N from '../src/number'
import * as T from '../src/Async'

describe('Tree', () => {
  it('Symbol.iterator', () => {
    U.deepStrictEqual(Array.from(_.make('a')), ['a'])
    U.deepStrictEqual(Array.from(_.make('a', [_.make('b'), _.make('c')])), ['a', 'b', 'c'])
  })

  it('reduce', () => {
    const fa = _.make('a', [_.make('b'), _.make('c')])
    U.deepStrictEqual(
      pipe(
        fa,
        _.reduce('', (b, a) => b + a)
      ),
      'abc'
    )
  })

  it('foldMap', () => {
    const x = _.make('a', [_.make('b'), _.make('c')])
    U.deepStrictEqual(pipe(x, _.foldMap(S.Monoid)(identity)), 'abc')
  })

  it('reduceRight', () => {
    const x = _.make('a', [_.make('b'), _.make('c')])
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(x, _.reduceRight('', f)), 'cba')
  })

  it('traverse', () => {
    const fa = _.make('a', [_.make('b'), _.make('c')])
    U.deepStrictEqual(pipe(fa, _.traverse(O.Applicative)(O.some)), O.some(fa))
  })

  it('sequence', () => {
    U.deepStrictEqual(
      _.sequence(O.Applicative)(_.make(O.some('a'), [_.make(O.some('b')), _.make(O.some('c'))])),
      O.some(_.make('a', [_.make('b'), _.make('c')]))
    )
  })

  it('map', () => {
    const fa = _.make(1, [_.make(2), _.make(3)])
    const expected = _.make(2, [_.make(4), _.make(6)])
    U.deepStrictEqual(pipe(fa, _.map(U.double)), expected)
  })

  it('ap', () => {
    const fab = _.of(U.double)
    const fa = _.make(1, [_.make(2), _.make(3)])
    const expected = _.make(2, [_.make(4), _.make(6)])
    U.deepStrictEqual(pipe(fab, _.ap(fa)), expected)
  })

  it('flatMap', () => {
    const f = flow(U.double, _.of)
    const fa = _.make(1, [_.make(2), _.make(3)])
    const expected = _.make(2, [_.make(4), _.make(6)])
    U.deepStrictEqual(pipe(fa, _.flatMap(f)), expected)
  })

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.make(_.make('a')), _.flatten), _.make('a'))
  })

  it('duplicate', () => {
    U.deepStrictEqual(pipe(_.make('a'), _.duplicate), _.make(_.make('a')))
  })

  it('extract', () => {
    const fa = _.make(1, [_.make(2), _.make(3)])
    U.deepStrictEqual(pipe(fa, _.extract), 1)
  })

  it('extend', () => {
    const fa = _.make('a', [_.make('foo'), _.make('b')])
    const f = (fa: _.Tree<string>) => fa.value.length + fa.forest.length
    const expected = _.make(3, [_.make(3), _.make(1)])
    U.deepStrictEqual(pipe(fa, _.extend(f)), expected)
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
      _.make('1', [_.make('2', [_.make('3'), _.make('4')]), _.make('3')])
    )
  })

  it('unfoldTreeKind', async () => {
    U.deepStrictEqual(
      pipe(
        1,
        _.unfoldTreeKind(O.Monad, O.Apply)((b) => O.some([b, b < 3 ? [b + 1, b + 2] : []]))
      ),
      O.some(_.make(1, [_.make(2, [_.make(3), _.make(4)]), _.make(3)]))
    )
    U.deepStrictEqual(
      pipe(
        1,
        _.unfoldTreeKind(O.Monad, O.Apply)((b) => (b < 3 ? O.some([b, [b + 1, b + 2]]) : O.none))
      ),
      O.none
    )
    U.deepStrictEqual(
      await pipe(
        1,
        _.unfoldTreeKind(T.Monad, T.ApplyPar)((b) => T.of([b, b < 3 ? [b + 1, b + 2] : []]))
      )(),
      _.make(1, [_.make(2, [_.make(3), _.make(4)]), _.make(3)])
    )
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getEq', () => {
    const E = _.getEq(N.Eq)
    const x = _.make(1, [_.make(2)])
    const y = _.make(2, [_.make(2)])
    const z = _.make(1, [_.make(1)])
    U.deepStrictEqual(E.equals(x)(x), true)
    U.deepStrictEqual(E.equals(x)(y), false)
    U.deepStrictEqual(E.equals(x)(z), false)
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    const t1 = _.make('a')
    U.deepStrictEqual(Sh.show(t1), `tree("a")`)
    const t2 = _.make('a', [_.make('b'), _.make('c')])
    U.deepStrictEqual(Sh.show(t2), `tree("a", [tree("b"), tree("c")])`)
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    const t = _.make(1, [_.make(2), _.make(3)])
    U.deepStrictEqual(
      _.fold((a: number, bs: ReadonlyArray<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t),
      3
    )
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('drawTree', () => {
    const tree = _.make('a')
    U.deepStrictEqual(_.drawTree(tree), 'a')

    const tree1 = _.make('a', [_.make('b'), _.make('c'), _.make('d', [_.make('e'), _.make('f')]), _.make('g')])
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

    const tree2 = _.make('a', [_.make('b', [_.make('c')])])
    U.deepStrictEqual(
      _.drawTree(tree2),
      `a
└─ b
   └─ c`
    )

    const tree3 = _.make('a', [_.make('b', [_.make('c')]), _.make('d', [_.make('e')])])
    U.deepStrictEqual(
      _.drawTree(tree3),
      `a
├─ b
│  └─ c
└─ d
   └─ e`
    )

    const tree4 = _.make('a', [_.make('b', [_.make('c', [_.make('d')]), _.make('e', [_.make('f')])]), _.make('e')])
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
      _.make({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b'))), _.make({ a: 1, b: 'b' }))
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b'))), _.make([1, 'b'] as const))
  })

  it('elem', () => {
    interface User {
      readonly id: number
    }
    const S: Eq.Eq<User> = pipe(
      N.Eq,
      Eq.contramap((user: User) => user.id)
    )
    const users = _.make({ id: 1 }, [_.make({ id: 1 }, [_.make({ id: 3 }), _.make({ id: 4 })]), _.make({ id: 2 })])
    U.deepStrictEqual(pipe(users, _.elem(S)({ id: 1 })), true)
    U.deepStrictEqual(pipe(users, _.elem(S)({ id: 4 })), true)
    U.deepStrictEqual(pipe(users, _.elem(S)({ id: 5 })), false)
  })

  it('exists', () => {
    interface User {
      readonly id: number
    }
    const users = _.make({ id: 1 }, [_.make({ id: 1 }, [_.make({ id: 3 }), _.make({ id: 4 })]), _.make({ id: 2 })])
    U.deepStrictEqual(_.exists((user: User) => user.id === 1)(users), true)
    U.deepStrictEqual(_.exists((user: User) => user.id === 4)(users), true)
    U.deepStrictEqual(_.exists((user: User) => user.id === 5)(users), false)
  })
})
