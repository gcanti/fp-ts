import * as _ from '../../src/Const'
import { pipe } from '../../src/Function'

//
// should handle undefined
//

// $ExpectType Const<undefined, never>
_.make(undefined)

//
// should handle null
//

// $ExpectType Const<null, never>
_.make(null)

//
// contramap
//

// $ExpectType Const<boolean, string>
pipe(
  _.make(true),
  _.contramap((s: string) => s.length)
)
