import * as _ from '../../src/TaskOption'
import * as TE from '../../src/TaskEither'
import { pipe } from '../../src/function'

declare const tesn: TE.TaskEither<string, number>

//
// fromTaskEither
//

pipe(tesn, _.fromTaskEither) // $ExpectType TaskOption<number>
