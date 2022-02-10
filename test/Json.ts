import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as _ from '../src/Json'
import * as U from './util'

describe('Json', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Show', () => {
    U.deepStrictEqual(_.Show.show({ a: 1 }), '{"a":1}')
    const circular: any = { ref: null }
    circular.ref = circular
    U.deepStrictEqual(_.Show.show(circular), '{"ref":"[Circular]"}')
    type Person = {
      readonly name: string
      readonly age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    U.deepStrictEqual(_.Show.show(person), '{"age":45,"name":"Giulio"}')
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('parse', () => {
    U.deepStrictEqual(pipe('{"a":1}', _.parse), E.right({ a: 1 }))
    U.deepStrictEqual(pipe('{"a":}', _.parse), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

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
})
