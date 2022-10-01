import * as _ from '../../src/Function'
import * as A from '../../src/ReadonlyArray'

//
// tupled
//

_.tupled(A.insertAt)([0, 'a']) // $ExpectType (as: readonly string[]) => Option<readonly [string, ...string[]]>

//
// untupled
//

_.untupled(_.tupled(A.insertAt)) // $ExpectType <A>(i: number, a: A) => (as: readonly A[]) => Option<readonly [A, ...A[]]>
