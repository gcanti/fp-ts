import * as _ from '../../src/function'
import * as A from '../../src/Array'

//
// flip
//

// should handle generics
_.flip(A.snoc) // $ExpectType <A>(b: A, a: A[]) => NonEmptyArray<A>

//
// tuple
//

_.tuple() // $ExpectType []
_.tuple(1) // $ExpectType [number]
_.tuple(1, 'a') // $ExpectType [number, string]
_.tuple(1, 'a', true) // $ExpectType [number, string, boolean]

// $ExpectType <A>(init: A[], end: A) => Option<A>
_.flow(A.snoc, A.head)

//
// tupled
//

_.tupled(A.insertAt)([0, 'a']) // $ExpectType (as: string[]) => Option<string[]>

//
// untupled
//

_.untupled(_.tupled(A.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: A[]) => Option<A[]>
