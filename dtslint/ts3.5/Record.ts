import * as R from '../../src/Record'

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
