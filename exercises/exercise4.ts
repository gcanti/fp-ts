/*

  Exercise 4

  Write a type safe head function.

*/
import { Option } from '../src/Option'

declare function head<A>(xs: Array<A>): Option<A>

/*

  Write a type safe elementAt function

*/
import { Either } from '../src/Either'

declare function elementAt<A>(xs: Array<A>, i: number): Either<string, A>
