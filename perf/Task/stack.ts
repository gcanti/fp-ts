import * as RNEA from '../../src/ReadonlyNonEmptyArray'
import * as _ from '../../src/Task'
import { pipe } from '../../src/function'

const as = RNEA.range(0, 100000)

// tslint:disable-next-line: no-floating-promises
pipe(
  as,
  // tslint:disable-next-line: deprecation
  _.traverseSeqArrayWithIndex((_i, a) => _.of(a))
  // tslint:disable-next-line: no-console
)().then((as) => console.log(as.length))
