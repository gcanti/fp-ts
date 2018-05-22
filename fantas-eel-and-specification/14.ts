//
// Code for http://www.tomharding.me/2017/05/30/fantas-eel-and-specification-14/
//

import { getArrayMonoid } from '../src/Monoid'
import { Tuple, getMonad, getChainRec } from '../src/Tuple'

const monoidArrayNumber = getArrayMonoid<number>()
const monad = getMonad(monoidArrayNumber)

export const seq = (upper: number): Tuple<Array<number>, number> => {
  const seq_ = (init: number): Tuple<Array<number>, number> =>
    init >= upper ? new Tuple([init], upper) : monad.chain(new Tuple([init], init + 1), seq_)

  return seq_(1)
}

console.log(seq(5).fst)
// => [ 1, 2, 3, 4, 5 ]

// console.log(seq(10000).fst()) // => Maximum call stack size exceeded

import { left, right } from '../src/Either'

const { chainRec } = getChainRec(monoidArrayNumber)

const seqReq = (upper: number): Tuple<Array<number>, number> =>
  chainRec(1, init => new Tuple([init], init >= upper ? right(init) : left(init + 1)))

console.log(seqReq(10000).fst)
// => [1, 2, 3, ..., 10000]
