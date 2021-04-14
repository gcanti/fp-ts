import { ixState as M } from '../src'
import { constVoid, pipe } from '../src/function'
import { deepStrictEqual, double } from './util'
import * as State from '../src/State'

describe('IxState', () => {
  it('map', () => {
    deepStrictEqual(pipe(M.of(4), M.map(double))(9), [8, 9])
  })

  it('put', () => {
    deepStrictEqual(M.put(9)(8), [constVoid(), 9])
  })

  it('ichainFirst', () => {
    deepStrictEqual(
      pipe(
        M.of<number, string>('answer'),
        M.ichainFirst(() => M.imodify(String))
      )(42),
      ['answer', '42']
    )
  })

  it('toState', () => {
    const state = M.of<number, number>(4)
    deepStrictEqual(pipe(state, M.toState)(42), state(42))
  })

  it('fromState', () => {
    const state = State.of<number, number>(4)
    deepStrictEqual(pipe(state, M.fromState)(42), state(42))
  })

  describe('do notation', () => {
    it('Do', () => {
      deepStrictEqual(M.iDo()(4), [{}, 4])
    })

    it('bind', () => {
      deepStrictEqual(
        pipe(
          M.iDo(),
          M.bind('answer', () => M.of(42))
        )(constVoid()),
        [{ answer: 42 }, constVoid()]
      )
    })
  })

  test('evaluate', () => {
    deepStrictEqual(pipe(M.of(42), M.evaluate(6)), 42)
  })

  test('execute', () => {
    deepStrictEqual(pipe(M.imodify(double), M.execute(42)), 84)
  })

  test('get', () => {
    deepStrictEqual(M.get<number>()(42), [42, 42])
  })

  test('gets', () => {
    deepStrictEqual(M.gets<number, string>(String)(42), ['42', 42])
  })

  test('imodify', () => {
    deepStrictEqual(M.imodify(String)(42), [constVoid(), '42'])
  })

  test('ichain', () => {
    deepStrictEqual(
      pipe(
        M.of<number, void>(constVoid()),
        M.ichain(() => M.imodify<number, string>(String)),
        M.ichain(() => M.imodify<string, Array<string>>((a) => a.split('')))
      )(42),
      [constVoid(), ['4', '2']]
    )
  })

  test('of', () => {
    deepStrictEqual(M.of<number, string>('The Answer')(42), ['The Answer', 42])
  })

  test('iap', () => {
    deepStrictEqual(
      pipe(
        M.of<string, (a: number) => number>(double),
        M.iap(
          pipe(
            M.of<string, number>(42),
            M.ichainFirst(() => M.imodify((a) => a.split(', ')))
          )
        )
      )('Hello, World!'),
      [84, ['Hello', 'World!']]
    )
  })

  test('iapFirst', () => {
    deepStrictEqual(
      pipe(
        M.of<number, number>(4),
        M.iapFirst(
          pipe(
            M.of<number, number>(2),
            M.ichainFirst(() => M.imodify<number, string>(String))
          )
        )
      )(42),
      [4, '42']
    )
  })

  test('iapSecond', () => {
    deepStrictEqual(
      pipe(
        M.of<number, number>(4),
        M.iapSecond(
          pipe(
            M.of<number, number>(2),
            M.ichainFirst(() => M.imodify<number, string>(String))
          )
        )
      )(42),
      [2, '42']
    )
  })

  test('local', () => {
    deepStrictEqual(
      pipe(
        M.of<number, void>(constVoid()),
        M.local<number, string>(Number),
        M.ichain(() => M.imodify(double))
      )('42'),
      [constVoid(), 84]
    )
  })
})
