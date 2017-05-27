/*

  Exercise 2

  Implement isSorted, which checks whether an Array<A> is sorted according to a given Ord instance

*/

import { StaticOrd } from 'fp-ts/lib/Ord'

declare function isSorted<A>(xs: Array<A>, ord: StaticOrd<A>): boolean
