import * as _ from '../../src/function'
import * as A from '../../src/Array'

//
// flip
//

// should handle generics
_.flip(A.cons) // $ExpectType <A>(b: A[], a: A) => NonEmptyArray<A>

//
// tuple
//

_.tuple() // $ExpectType []
_.tuple(1) // $ExpectType [number]
_.tuple(1, 'a') // $ExpectType [number, string]
_.tuple(1, 'a', true) // $ExpectType [number, string, boolean]

// $ExpectType <A>(head: A, tail: A[]) => Option<A>
_.flow(A.cons, A.head)

//
// tupled
//

_.tupled(A.insertAt) // $ExpectType <A>(a: [number, A]) => (as: A[]) => Option<A[]>

//
// untupled
//

_.untupled(_.tupled(A.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: A[]) => Option<A[]>
