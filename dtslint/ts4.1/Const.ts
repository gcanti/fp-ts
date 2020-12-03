import * as _ from '../../src/Const'

//
// contramap
//

_.const_.contramap(_.make<boolean>(true), (s: string) => s.length) // $ExpectType Const<boolean, string>
