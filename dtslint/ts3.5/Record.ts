import { pipe } from '../../src/pipeable'
import * as R from '../../src/Record'
import { identity } from '../../src/function'

declare const dictionaryString: { [key: string]: number }
declare const recordString: Record<string, number>
declare const recordStringEnum: Record<'a' | 'b', number>

declare const keyString: string

//
// hasOwnProperty
//

if (R.hasOwnProperty(keyString, dictionaryString)) {
  keyString // $ExpectType string
}
if (R.hasOwnProperty(keyString, recordString)) {
  keyString // $ExpectType string
}
if (R.hasOwnProperty(keyString, recordStringEnum)) {
  keyString // $ExpectType "a" | "b"
}

//
// updateAt
//

pipe(dictionaryString, R.updateAt('a', 3)) // $ExpectType Option<Record<string, number>>
pipe(recordString, R.updateAt('a', 3)) // $ExpectType Option<Record<string, number>>
pipe(recordStringEnum, R.updateAt('a', 3)) // $ExpectType Option<Record<"a" | "b", number>>

//
// modifyAt
//

pipe(dictionaryString, R.modifyAt('a', identity)) // $ExpectType Option<Record<string, number>>
pipe(recordString, R.modifyAt('a', identity)) // $ExpectType Option<Record<string, number>>
pipe(recordStringEnum, R.modifyAt('a', identity)) // $ExpectType Option<Record<"a" | "b", number>>
