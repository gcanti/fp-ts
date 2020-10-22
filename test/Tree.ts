import * as assert from 'assert'
import * as Eq from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as I from '../src/Identity'
import * as O from '../src/Option'
import { monoidString } from '../src/Monoid'
import { showString } from '../src/Show'
import * as _ from '../src/Tree'

describe('Tree', () => {
  describe('pipeables', () => {
    it('traverse', () => {
      const fa = _.make('a', [_.make('b'), _.make('c')])
      assert.deepStrictEqual(pipe(fa, _.traverse(O.Applicative)(O.some)), O.some(fa))
    })

    it('sequence', () => {
      assert.deepStrictEqual(
        _.sequence(O.Applicative)(_.make(O.some('a'), [_.make(O.some('b')), _.make(O.some('c'))])),
        O.some(_.make('a', [_.make('b'), _.make('c')]))
      )
    })
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const fa = _.make(1, [_.make(2), _.make(3)])
    const expected = _.make(2, [_.make(4), _.make(6)])
    assert.deepStrictEqual(pipe(fa, _.map(double)), expected)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = _.of(double)
    const fa = _.make(1, [_.make(2), _.make(3)])
    const expected = _.make(2, [_.make(4), _.make(6)])
    assert.deepStrictEqual(pipe(fab, _.ap(fa)), expected)
  })

  it('apFirst', () => {
    assert.deepStrictEqual(pipe(_.make('a'), _.apFirst(_.make('b'))), _.make('a'))
  })

  it('apSecond', () => {
    assert.deepStrictEqual(pipe(_.make('a'), _.apSecond(_.make('b'))), _.make('b'))
  })

  it('chain', () => {
    const f = (n: number) => _.of(n * 2)
    const fa = _.make(1, [_.make(2), _.make(3)])
    const expected = _.make(2, [_.make(4), _.make(6)])
    assert.deepStrictEqual(pipe(fa, _.chain(f)), expected)
  })

  it('chainFirst', () => {
    const f = (n: number) => _.of(n * 2)
    const fa = _.make(1, [_.make(2), _.make(3)])
    assert.deepStrictEqual(pipe(fa, _.chainFirst(f)), fa)
  })

  it('flatten', () => {
    assert.deepStrictEqual(pipe(_.make(_.make('a')), _.flatten), _.make('a'))
  })

  it('duplicate', () => {
    assert.deepStrictEqual(pipe(_.make('a'), _.duplicate), _.make(_.make('a')))
  })

  it('extract', () => {
    const fa = _.make(1, [_.make(2), _.make(3)])
    assert.deepStrictEqual(pipe(fa, _.extract), 1)
  })

  it('extend', () => {
    const fa = _.make('a', [_.make('foo'), _.make('b')])
    const f = (fa: _.Tree<string>) => fa.value.length + fa.forest.length
    const expected = _.make(3, [_.make(3), _.make(1)])
    assert.deepStrictEqual(pipe(fa, _.extend(f)), expected)
  })

  it('reduce', () => {
    const fa = _.make('a', [_.make('b'), _.make('c')])
    assert.deepStrictEqual(
      pipe(
        fa,
        _.reduce('', (b, a) => b + a)
      ),
      'abc'
    )
  })

  it('foldMap', () => {
    const x = _.make('a', [_.make('b'), _.make('c')])
    assert.deepStrictEqual(pipe(x, _.foldMap(monoidString)(identity)), 'abc')
  })

  it('reduceRight', () => {
    const x = _.make('a', [_.make('b'), _.make('c')])
    const f = (a: string, acc: string) => acc + a
    assert.deepStrictEqual(pipe(x, _.reduceRight('', f)), 'cba')
  })

  it('drawTree', () => {
    const tree = _.make('a')
    assert.deepStrictEqual(_.drawTree(tree), 'a')

    const tree1 = _.make('a', [_.make('b'), _.make('c'), _.make('d', [_.make('e'), _.make('f')]), _.make('g')])
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
      _.drawTree(tree2),
      `a
└─ b
   └─ c`
    )

    const tree3 = _.make('a', [_.make('b', [_.make('c')]), _.make('d', [_.make('e')])])
    assert.deepStrictEqual(
      _.drawTree(tree3),
      `a
├─ b
│  └─ c
└─ d
   └─ e`
    )

    const tree4 = _.make('a', [_.make('b', [_.make('c', [_.make('d')]), _.make('e', [_.make('f')])]), _.make('e')])
    assert.deepStrictEqual(
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

  it('getEq', () => {
    const S = _.getEq(Eq.eqNumber)
    const x = _.make(1, [_.make(2)])
    const y = _.make(2, [_.make(2)])
    const z = _.make(1, [_.make(1)])
    assert.deepStrictEqual(S.equals(x, x), true)
    assert.deepStrictEqual(S.equals(x, y), false)
    assert.deepStrictEqual(S.equals(x, z), false)
  })

  it('unfoldTree', () => {
    const fa = _.unfoldTree(1, (b) => [b, b < 3 ? [b + 1, b + 2] : []])
    const expected = _.make(1, [_.make(2, [_.make(3), _.make(4)]), _.make(3)])
    assert.deepStrictEqual(fa, expected)
  })

  it('unfoldTreeM', () => {
    const fa = _.unfoldTreeM(I.Monad)(1, (b) => [b, b < 3 ? [b + 1, b + 2] : []])
    const expected = _.make(1, [_.make(2, [_.make(3), _.make(4)]), _.make(3)])
    assert.deepStrictEqual(fa, expected)
  })

  it('elem', () => {
    interface User {
      readonly id: number
    }
    const S: Eq.Eq<User> = pipe(
      Eq.eqNumber,
      Eq.contramap((user: User) => user.id)
    )
    const users = _.make({ id: 1 }, [_.make({ id: 1 }, [_.make({ id: 3 }), _.make({ id: 4 })]), _.make({ id: 2 })])
    assert.deepStrictEqual(_.elem(S)({ id: 1 }, users), true)
    assert.deepStrictEqual(_.elem(S)({ id: 4 }, users), true)
    assert.deepStrictEqual(_.elem(S)({ id: 5 }, users), false)
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    const t1 = _.make('a')
    assert.deepStrictEqual(S.show(t1), `make("a")`)
    const t2 = _.make('a', [_.make('b'), _.make('c')])
    assert.deepStrictEqual(S.show(t2), `make("a", [make("b"), make("c")])`)
  })

  it('fold', () => {
    const t = _.make(1, [_.make(2), _.make(3)])
    assert.deepStrictEqual(
      _.fold((a: number, bs: ReadonlyArray<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t),
      3
    )
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      ),
      _.make({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b'))), _.make({ a: 1, b: 'b' }))
  })
})
