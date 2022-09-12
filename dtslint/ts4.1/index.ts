import * as _ from '../../src/HKT'
import * as T from '../../src/Task'

// issue #536
function testIssue536<F extends _.HKT, G extends _.HKT, S, R, W, E, A>(
  x: _.Kind<F, S, R, W, E, A>
): _.Kind<G, S, R, W, E, A> {
  // $ExpectError
  return x
}

const testURI = <F extends _.HKT>(ma: T.Task<number>): _.Kind<F, unknown, unknown, never, never, number> => {
  // $ExpectError
  return ma
}

// $ExpectError
type HKT1 = _.Kind<'a', string>
