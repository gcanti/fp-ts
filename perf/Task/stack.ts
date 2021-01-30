import * as A from '../../src/Array'
import * as _ from '../../src/Task'
import { pipe } from '../../src/function'

const as = A.range(0, 100000)

// tslint:disable-next-line: no-floating-promises
pipe(
  as,
  _.traverseSeqArrayWithIndex((_i, a) => _.of(a))
  // tslint:disable-next-line: no-console
)().then((as) => console.log(as.length))
