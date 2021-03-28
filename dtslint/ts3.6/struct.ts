import { pipe, identity } from '../../src/function'
import * as _ from '../../src/struct'
import * as O from '../../src/Option'
import * as N from '../../src/number'
import * as S from '../../src/string'
import * as E from '../../src/Either'
import * as Tr from '../../src/Tree'

declare const r1: { a: number, b: string }

//
// mapS
//

pipe(r1, _.mapS({ a: n => n > 2, b: n => n.length })) // $ExpectType { a: boolean; b: number; }

//
// reduceS
//

pipe(r1, _.reduceS(S.Ord)('', { a: (acc, cur) => acc + cur.toString(), b: (acc, cur) => acc + cur })) // $ExpectType string

pipe(r1, _.foldMapS(S.Ord)(S.Monoid)({ a: k => k.toString(), b: identity })) // $ExpectType string

pipe(r1, _.filterS({ a: (k): k is 1 => k === 1, b: () => false })) // $ExpectType { a?: 1 | undefined; b?: string | undefined; }

pipe(r1, _.filterMapS({ a: (n) => (n === 1 ? O.some(n + 1) : O.none), b: () => O.none })) // $ExpectType { a?: number | undefined; b?: undefined; }

pipe(r1, _.partitionS({ a: (k): k is 1 => k === 1, b: () => false })) // $ExpectType Separated<Partial<{ a: number; b: string; }>, { a?: 1 | undefined; b?: string | undefined; }>

const a = pipe(
  r1,
  _.partitionMapS({
    a: (n): E.Either<number, number> => n === 1 ? E.right(n + 1) : E.left(n - 1),
    b: () => E.left('fail')
  })
)
a // $ExpectType Separated<{ a?: number | undefined; b?: string | undefined; }, { a?: number | undefined; b?: unknown; }>

_.compactS({ a: O.some(1), b: O.some('a') }) // $ExpectType Partial<{ a: number; b: string; }>

_.unCompact({ a: 1, b: undefined }) // $ExpectType { a: Option<number>; b: Option<never>; }

const b = _.separateS({
  foo: E.right(123), bar: E.left('fail'), baz: E.right('abc')
})
b // $ExpectType Separated<{ foo?: unknown; bar?: string | undefined; baz?: unknown; }, { foo?: number | undefined; bar?: unknown; baz?: string | undefined; }>

pipe(r1, _.traverseS(S.Ord)(O.Apply)({ a: (n) => O.some(n), b: (n) => O.some(n)})) // $ExpectType Option<{ a: number; b: string; }>

const c = pipe(
  r1,
  _.witherS(S.Ord)(Tr.Apply)({
    a: (n) => Tr.of(n === 1 ? O.some(n.toString()) : O.none),
    b: (n) => Tr.of(n === 'a' ? O.some(n.length) : O.none)
  })
)
c // $ExpectType Tree<{ a?: string | undefined; b?: number | undefined; }>

const d = pipe(
  r1,
  _.wiltS(S.Ord)(Tr.Apply)({
    a: (n) => Tr.of<E.Either<number, string>>(n === 1 ? E.right(n.toString()) : E.left(n - 1)),
    b: (n) => Tr.of<E.Either<string, number>>(n === 'a' ? E.right(n.length) : E.left('fail'))
  })
)
d // $ExpectType Tree<Separated<{ a?: number | undefined; b?: string | undefined; }, { a?: string | undefined; b?: number | undefined; }>>

_.traverseS_(S.Ord)(O.Apply)(r1, { a: (n: number) => O.some(n), b: (n: string) => O.some(n)}) // $ExpectType Option<{ a: number; b: string; }>

_.getShow({ key1: N.Show, key2: S.Show }) // $ExpectType Show<{ readonly key1: number; readonly key2: string; }>

_.getEq({ key1: N.Eq, key2: S.Eq }) // $ExpectType Eq<{ readonly key1: number; readonly key2: string; }>

_.getSemigroup({ key1: N.SemigroupSum, key2: S.Semigroup }) // $ExpectType Semigroup<{ readonly key1: number; readonly key2: string; }>

_.getMonoid({ key1: N.MonoidSum, key2: S.Monoid }) // $ExpectType Monoid<{ readonly key1: number; readonly key2: string; }>
