import * as _ from '../../src/function'
import * as RA from '../../src/ReadonlyArray'

//
// flip
//

// should handle generics
_.flip(RA.snoc) // $ExpectType <A>(b: A, a: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>

//
// tuple
//

_.tuple() // $ExpectType []
_.tuple(1) // $ExpectType [number]
_.tuple(1, 'a') // $ExpectType [number, string]
_.tuple(1, 'a', true) // $ExpectType [number, string, boolean]

// $ExpectType <A>(init: ReadonlyArray<A>, end: A) => Option<A>
_.flow(RA.snoc, RA.head)

//
// tupled
//

_.tupled(RA.insertAt)([0, 'a']) // $ExpectType (as: ReadonlyArray<string>) => Option<ReadonlyNonEmptyArray<string>>

//
// untupled
//

_.untupled(_.tupled(RA.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: ReadonlyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
