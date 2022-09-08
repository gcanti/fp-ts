import * as _ from '../../src/function'
import * as A from '../../src/ReadonlyArray'

//
// tupled
//

_.tupled(A.insertAt)([0, 'a']) // $ExpectType (as: readonly string[]) => Option<ReadonlyNonEmptyArray<string>>

//
// untupled
//

_.untupled(_.tupled(A.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: readonly A[]) => Option<ReadonlyNonEmptyArray<A>>
