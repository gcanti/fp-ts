import { pipe } from '../../src/function'
import * as _ from '../../src/struct'
import * as O from '../../src/Option'

const l1 = { a: 1 }

declare const keyString: string

//
// pick
//

pipe({ a: 'a', b: 1 }, _.pick('a')) // $ExpectType { readonly a: string; }
_.pick('a')({ a: 'a', b: 1 }) // $ExpectType { readonly a: string; }

//
// omit
//

pipe({ a: 'a', b: 1 }, _.omit('b')) // $ExpectType { readonly a: string; }
_.omit('b')({ a: 'a', b: 1 }) // $ExpectType { readonly a: string; }

//
// insertAt
//
;
pipe({ a: 'a' }, _.insertAt('b', 1)) // $ExpectType { readonly a: string; readonly b: number; }
_.insertAt('b', 1)({ a: 'a' }) // $ExpectType { readonly a: string; readonly b: number; }

//
// renameAt
//

pipe({ a: 'a', z: 1 }, _.renameAt('z', 'b')) // $ExpectType { readonly a: string; readonly b: number; }
_.renameAt('z', 'b')({ a: 'a', z: 1 }) // $ExpectType { readonly a: string; readonly b: number; }

//
// mapAtE
//

// $ExpectType Option<{ readonly a: string; readonly b: string; }>
pipe(
  { a: 'a', b: true },
  _.mapAtE(O.Functor)('b', (b) => pipe('true', O.fromPredicate(() => b)))
)

//
// getAssignSemigroup
//
interface T {
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
pipe(foo, S.concat(bar)) // $ExpectType T

//
// mapAt
//

pipe({ a: 'a', b: true }, _.mapAt('b', (b) => b ? 'true' : 'false')) // $ExpectType { readonly a: string; readonly b: "true" | "false"; }
_.mapAt('b', (b) => b ? 'true' : 'false')({ a: 'a', b: true }) // $ExpectType { readonly a: string; readonly b: "true" | "false"; }

//
// modifyAt
//

pipe({ a: 'a', b: true }, _.modifyAt('b', (b) => !b)) // $ExpectType { a: string; b: boolean; }
_.modifyAt('b', (b) => !b)({ a: 'a', b: true }) // $ExpectType { a: string; b: true; }

//
// updateAt
//

pipe({ a: 'a', b: true }, _.updateAt('b', false)) // $ExpectType { a: string; b: boolean; }
_.updateAt('b', false)({ a: 'a', b: true }) // $ExpectType { a: string; b: true; }
