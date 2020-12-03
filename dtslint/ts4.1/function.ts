import * as _ from '../../src/function'
import * as A from '../../src/ReadonlyArray'

//
// flip
//

// should handle generics
_.flip(A.snoc) // $ExpectType <A>(b: A, a: readonly A[]) => ReadonlyNonEmptyArray<A>

//
// tuple
//

_.tuple() // $ExpectType []
_.tuple(1) // $ExpectType [number]
_.tuple(1, 'a') // $ExpectType [number, string]
_.tuple(1, 'a', true) // $ExpectType [number, string, boolean]

// $ExpectType <A>(init: readonly A[], end: A) => Option<A>
_.flow(A.snoc, A.head)

//
// tupled
//

_.tupled(A.insertAt)([0, 'a']) // $ExpectType (as: readonly string[]) => Option<readonly string[]>

//
// untupled
//

_.untupled(_.tupled(A.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: readonly A[]) => Option<readonly A[]>
