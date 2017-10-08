//
// Code for http://www.tomharding.me/2017/06/19/fantas-eel-and-specification-17/
//

import { NonEmptyArray } from '../../src/NonEmptyArray'

console.log(new NonEmptyArray(1, [2, 3, 4]).extract())
// => 1

import { Store } from '../../src/Store'
import { Tuple } from '../../src/Tuple'
import { Option, some, none } from '../../src/Option'
import { between, ordNumber } from '../../src/Ord'

export type Board = Array<Array<boolean>>

export const inBounds = (i: number, j: number): boolean => between(ordNumber)(0)(3)(i) && between(ordNumber)(0)(3)(j)

export const getBoardValue = (board: Board, i: number, j: number): Option<boolean> =>
  inBounds(i, j) ? some(board[i][j]) : none

export const showBoard = (board: Board): string => board.map(row => row.map(b => (b ? 'X' : 'O')).join(' ')).join('\n')

type Game = Store<Tuple<number, number>, boolean>

export const neighbours = (game: Game): number => {
  const [x, y] = game.pos.value
  return [
    new Tuple([x - 1, y - 1]), // NW
    new Tuple([x, y - 1]), // N
    new Tuple([x + 1, y - 1]), // NE

    new Tuple([x - 1, y]), // W
    new Tuple([x + 1, y]), // E

    new Tuple([x - 1, y + 1]), // SW
    new Tuple([x, y + 1]), // S
    new Tuple([x + 1, y + 1]) // SE
  ]
    .map(x => game.peek(x)) // Look up!
    .filter(x => x).length // Ignore false cells
}

export const isSurvivor = (game: Game): boolean => {
  const c = game.extract()
  const n = neighbours(game)
  return (!c && n === 3) || (c && (n === 2 || n === 3))
}

export const fromBoard = (board: Board): Game => {
  return new Store(pointer => {
    const [x, y] = pointer.value
    return getBoardValue(board, x, y).getOrElseValue(false)
  }, new Tuple([0, 0]))
}

export const toBoard = (game: Game): Board => {
  const board: Board = []
  for (let i = 0; i <= 3; i++) {
    board[i] = []
    for (let j = 0; j <= 3; j++) {
      board[i][j] = game.peek(new Tuple([i, j]))
    }
  }
  return board
}

import { IO } from '../../src/IO'

export const generateBoard = (): IO<Board> => {
  return new IO(() => {
    const board: Board = []
    for (let i = 0; i <= 3; i++) {
      board[i] = []
      for (let j = 0; j <= 3; j++) {
        board[i][j] = Math.random() > 0.5
      }
    }
    return board
  })
  // return new IO(() => {
  //   return [
  //     [true, true, false, false],
  //     [true, false, true, false],
  //     [true, false, false, true],
  //     [true, false, true, false]
  //   ]
  // })
}

export const drawBoard = (board: Board): IO<string> => {
  return new IO(() => {
    const s = showBoard(board)
    console.log('--------')
    console.log(s)
    return s
  })
}

export const step = (board: Board): Board => toBoard(fromBoard(board).extend(isSurvivor))

export const loop = (board: Board): IO<void> => {
  return drawBoard(board).chain(
    () =>
      new IO(() => {
        setTimeout(() => loop(step(board)).run(), 1000)
      })
  )
}

export const program = generateBoard().chain(loop)

program.run()
