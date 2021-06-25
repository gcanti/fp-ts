import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as _ from '../src/Json'
import * as U from './util'

describe('Json', () => {
  it('parse', () => {
    U.deepStrictEqual(pipe('{"a":1}', _.parse), E.right({ a: 1 }))
    U.deepStrictEqual(pipe('{"a":}', _.parse), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
  })

  it('stringify', () => {
    U.deepStrictEqual(pipe({ a: 1 }, _.stringify), E.right('{"a":1}'))
    const circular: any = { ref: null }
    circular.ref = circular
    U.deepStrictEqual(
      pipe(
        circular,
        _.stringify,
        E.mapLeft((e) => (e as Error).message.includes('Converting circular structure to JSON'))
      ),
      E.left(true)
    )
    type Person = {
      readonly name: string
      readonly age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    U.deepStrictEqual(pipe(person, _.stringify), E.right('{"name":"Giulio","age":45}'))

    U.deepStrictEqual(_.stringify(undefined as any), E.left(new Error('Converting unsupported structure to JSON')))
  })

  it('match', () => {
    const t = () => true
    const f = () => false
    U.strictEqual(_.match(t, f, f, f, f, f)(null), true)
    U.strictEqual(_.match(f, t, f, f, f, f)(true), true)
    U.strictEqual(_.match(f, f, t, f, f, f)(32.2), true)
    U.strictEqual(_.match(f, f, f, t, f, f)('dolphin'), true)
    U.strictEqual(_.match(f, f, f, f, t, f)(['zebra', 'tiger']), true)
    U.strictEqual(_.match(f, f, f, f, f, t)({ name: 'Toni', age: 35 }), true)
  })
})
