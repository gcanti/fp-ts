import * as _ from '../../src/Date';
import { pipe } from '../../src/function';

declare const d: Date
declare const s: string

//
// isValid
//

// $ExpectType boolean
pipe(d, _.isValid)

//
// fromString
//

// $ExpectType Option<Date>
pipe(s, _.fromString)
