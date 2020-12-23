import * as _ from '../../src/Show'

//
// getTupleShow
//

// $ExpectType Show<[string, number, boolean]>
_.getTupleShow(_.showString, _.showNumber, _.showBoolean)

//
// getStructShow
//

// $ExpectType Show<{ a: string; b: number; c: boolean; }>
_.getStructShow({ a: _.showString, b: _.showNumber, c: _.showBoolean })
