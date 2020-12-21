import * as _ from '../../src/Const'
import { pipe } from '../../src/function'

//
// contramap
//

// $ExpectType Const<boolean, string>
pipe(
  _.make<boolean, number>(true),
  _.contramap((s: string) => s.length)
)
