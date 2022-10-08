import * as E from '../src/Result'
import { pipe } from '../src/Function'
import * as _ from '../src/Json'
import * as U from './util'

describe('Json', () => {
  it('parse', () => {
    U.deepStrictEqual(pipe('{"a":1}', _.parse), E.of({ a: 1 }))
    U.deepStrictEqual(pipe('{"a":}', _.parse), E.fail(new SyntaxError('Unexpected token } in JSON at position 5')))
  })

  it('stringify', () => {
    U.deepStrictEqual(pipe({ a: 1 }, _.stringify), E.of('{"a":1}'))
    const circular: any = { ref: null }
    circular.ref = circular
    U.deepStrictEqual(
      pipe(
        circular,
        _.stringify,
        E.mapError((e) => (e as Error).message.includes('Converting circular structure to JSON'))
      ),
      E.fail(true)
    )
    type Person = {
      readonly name: string
      readonly age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    U.deepStrictEqual(pipe(person, _.stringify), E.of('{"name":"Giulio","age":45}'))

    U.deepStrictEqual(_.stringify(undefined as any), E.fail(new Error('Converting unsupported structure to JSON')))
  })
})
