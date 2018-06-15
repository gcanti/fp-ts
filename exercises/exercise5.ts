/*

  Exercise 5

  Write a function getAllSomesOrNone, that combines a list of Somes into one Option containing
  a list of all the Some values in the original list. If the original list contains None
  even once, the result of the function should be None, otherwise the result should be
  Some with a list of all the values

*/
import { Option } from '../src/Option'

declare function getAllSomesOrNone<A>(xs: Array<Option<A>>): Option<Array<A>>
