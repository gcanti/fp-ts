/*

  Exercise 2

  Implement isSorted, which checks whether an Array<A> is sorted according to a given Ord instance

*/

import { Ord } from '../src/Ord'

declare function isSorted<A>(xs: Array<A>, ord: Ord<A>): boolean
