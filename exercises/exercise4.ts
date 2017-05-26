/*

  Exercise 4

  Write a type safe head function.

*/
import { Option } from 'fp-ts/lib/Option'

declare function head<A>(xs: Array<A>): Option<A>

/*

  Write a type safe elementAt function

*/
import { Either } from 'fp-ts/lib/Either'

declare function elementAt<A>(xs: Array<A>, i: number): Either<string, A>
